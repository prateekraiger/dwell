import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Helper to get authenticated user and check role
async function getUser(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("Please sign in to continue");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("byExternalId", (q: any) => q.eq("externalId", identity.subject))
    .unique();

  if (!user) {
    throw new ConvexError("User not found. Please complete your profile.");
  }

  return user;
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

export const getRoom = query({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.id);
    if (!room) {
      throw new ConvexError("Room not found");
    }
    return room;
  },
});

// OWNER: Get only rooms owned by the current user
export const getMyRooms = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);

    if (user.role !== "owner" && user.role !== "admin") {
      throw new ConvexError(
        "You need to be an owner to view your rooms. Please select the owner role from your profile"
      );
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
    highlights: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (user.role !== "owner" && user.role !== "admin") {
      throw new ConvexError(
        "You need to be an owner to create rooms. Please select the owner role from your profile"
      );
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
    highlights: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (user.role !== "owner" && user.role !== "admin") {
      throw new ConvexError("You need to be an owner to update rooms");
    }

    const room = await ctx.db.get(args.roomId);
    if (!room) {
      throw new ConvexError("Room not found");
    }

    if (room.ownerId !== user._id && user.role !== "admin") {
      throw new ConvexError("You can only update rooms that you own");
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

    if (user.role !== "owner" && user.role !== "admin") {
      throw new ConvexError("You need to be an owner to delete rooms");
    }

    const room = await ctx.db.get(args.roomId);
    if (!room) {
      throw new ConvexError("Room not found");
    }

    if (room.ownerId !== user._id && user.role !== "admin") {
      throw new ConvexError("You can only delete rooms that you own");
    }

    await ctx.db.delete(args.roomId);
  },
});
