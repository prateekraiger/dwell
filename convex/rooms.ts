import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Helper to get authenticated user and check role
async function getUser(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();

  if (identity) {
    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q: any) => q.eq("externalId", identity.subject))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }
    return user;
  }

  // Fallback: Try to find a default owner if no auth (FOR DEV ONLY)
  const defaultOwner = await ctx.db
    .query("users")
    .filter((q: any) => q.eq(q.field("role"), "owner"))
    .first();

  if (defaultOwner) {
    console.log("Using default owner for unauthenticated request:", defaultOwner.name);
    return defaultOwner;
  }

  throw new ConvexError("Unauthorized");
}

// GUEST: Query available rooms with optional filters
export const get = query({
  args: {
    location: v.optional(v.string()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    minGuests: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Start with all rooms
    let rooms = await ctx.db.query("rooms").collect();

    // Filter by availability
    rooms = rooms.filter((room) => room.isAvailable);

    // Apply location filter (case-insensitive partial match)
    if (args.location) {
      const searchLocation = args.location.toLowerCase();
      rooms = rooms.filter((room) =>
        room.location.toLowerCase().includes(searchLocation)
      );
    }

    // Apply price filters
    if (args.minPrice !== undefined) {
      rooms = rooms.filter((room) => room.pricePerNight >= args.minPrice!);
    }
    if (args.maxPrice !== undefined) {
      rooms = rooms.filter((room) => room.pricePerNight <= args.maxPrice!);
    }

    // Apply guest capacity filter
    if (args.minGuests !== undefined) {
      rooms = rooms.filter((room) => room.maxGuests >= args.minGuests!);
    }

    return rooms;
  },
});

// OWNER: Get only rooms owned by the current user
export const getMyRooms = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);

    if (user.role !== "owner") {
      throw new ConvexError("Only owners can view their rooms");
    }

    return await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("ownerId"), user._id))
      .collect();
  },
});

// OWNER: Create a new room listing
export const create = mutation({
  args: {
    title: v.string(),
    location: v.string(),
    pricePerNight: v.number(),
    description: v.string(),
    photos: v.array(v.string()),
    maxGuests: v.number(),
    features: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (user.role !== "owner") {
      throw new ConvexError("Only owners can create rooms");
    }

    const roomId = await ctx.db.insert("rooms", {
      ...args,
      ownerId: user._id,
      isAvailable: true, // Default to available
    });

    return roomId;
  },
});

// OWNER: Update a room listing
export const update = mutation({
  args: {
    roomId: v.id("rooms"),
    title: v.optional(v.string()),
    location: v.optional(v.string()),
    pricePerNight: v.optional(v.number()),
    description: v.optional(v.string()),
    photos: v.optional(v.array(v.string())),
    maxGuests: v.optional(v.number()),
    isAvailable: v.optional(v.boolean()),
    features: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (user.role !== "owner") {
      throw new ConvexError("Only owners can update rooms");
    }

    const room = await ctx.db.get(args.roomId);
    if (!room) {
      throw new ConvexError("Room not found");
    }

    if (room.ownerId !== user._id) {
      throw new ConvexError("You can only update your own rooms");
    }

    const { roomId, ...updates } = args;
    await ctx.db.patch(roomId, updates);
  },
});

// OWNER: Delete a room listing
export const remove = mutation({
  args: {
    roomId: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (user.role !== "owner") {
      throw new ConvexError("Only owners can delete rooms");
    }

    const room = await ctx.db.get(args.roomId);
    if (!room) {
      throw new ConvexError("Room not found");
    }

    if (room.ownerId !== user._id) {
      throw new ConvexError("You can only delete your own rooms");
    }

    await ctx.db.delete(args.roomId);
  },
});
