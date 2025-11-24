import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Helper to get authenticated user
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

  // Fallback: Try to find a default user if no auth (FOR DEV ONLY)
  const defaultUser = await ctx.db
    .query("users")
    .first();

  if (defaultUser) {
    console.log("Using default user for unauthenticated request:", defaultUser.name);
    return defaultUser;
  }

  throw new ConvexError("Please sign in to continue");
}

// GUEST: Get user's bookings
export const getMyBookings = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);

    const bookings = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect();

    // Fetch room details for each booking
    const bookingsWithRooms = await Promise.all(
      bookings.map(async (booking) => {
        const room = await ctx.db.get(booking.roomId);
        return {
          ...booking,
          room,
        };
      })
    );

    return bookingsWithRooms;
  },
});

// OWNER: Get all bookings for owner's rooms
export const getBookingsForMyRooms = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);

    if (user.role !== "owner" && user.role !== "admin") {
      throw new ConvexError("You need to be an owner to view bookings for your rooms");
    }

    // Get all rooms owned by this user
    const myRooms = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("ownerId"), user._id))
      .collect();

    const myRoomIds = myRooms.map((room) => room._id);

    // Get all bookings for these rooms
    const allBookings = await ctx.db.query("bookings").collect();
    const bookingsForMyRooms = allBookings.filter((booking) =>
      myRoomIds.includes(booking.roomId)
    );

    // Fetch room and user details for each booking
    const bookingsWithDetails = await Promise.all(
      bookingsForMyRooms.map(async (booking) => {
        const room = await ctx.db.get(booking.roomId);
        const guest = await ctx.db.get(booking.userId);
        return {
          ...booking,
          room,
          guest,
        };
      })
    );

    return bookingsWithDetails;
  },
});

// Get all bookings for a specific room (to check availability)
export const getBookingsByRoom = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .collect();

    return bookings;
  },
});

// Create a new booking
export const create = mutation({
  args: {
    roomId: v.id("rooms"),
    checkIn: v.number(),
    checkOut: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    // Verify room exists
    const room = await ctx.db.get(args.roomId);
    if (!room) {
      throw new ConvexError("Room not found");
    }

    // Validate dates
    if (args.checkIn >= args.checkOut) {
      throw new ConvexError("Check-out date must be after check-in date");
    }

    // Check for overlapping bookings
    const existingBookings = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .collect();

    const hasOverlap = existingBookings.some((booking) => {
      return (
        (args.checkIn >= booking.checkIn && args.checkIn < booking.checkOut) ||
        (args.checkOut > booking.checkIn && args.checkOut <= booking.checkOut) ||
        (args.checkIn <= booking.checkIn && args.checkOut >= booking.checkOut)
      );
    });

    if (hasOverlap) {
      throw new ConvexError("This room is already booked for the selected dates. Please choose different dates");
    }

    const bookingId = await ctx.db.insert("bookings", {
      userId: user._id,
      roomId: args.roomId,
      checkIn: args.checkIn,
      checkOut: args.checkOut,
      status: "pending",
    });

    return bookingId;
  },
});

// Cancel a booking
export const cancel = mutation({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new ConvexError("Booking not found");
    }

    // Check if user is the guest who made the booking or the owner of the room
    const room = await ctx.db.get(booking.roomId);
    const isGuest = booking.userId === user._id;
    const isOwner = room && room.ownerId === user._id;

    if (!isGuest && !isOwner && user.role !== "admin") {
      throw new ConvexError("You can only cancel your own bookings or bookings for rooms that you own");
    }

    await ctx.db.patch(args.bookingId, {
      status: "cancelled",
    });
  },
});
