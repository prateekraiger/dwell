import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    externalId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("guest"), v.literal("owner"), v.literal("admin"), v.literal("pending")),
  }).index("byExternalId", ["externalId"]),

  rooms: defineTable({
    ownerId: v.id("users"),
    title: v.string(),
    location: v.string(),
    pricePerNight: v.number(),
    description: v.string(),
    photos: v.array(v.string()),
    maxGuests: v.number(),
    isAvailable: v.boolean(),
    highlights: v.array(v.string()),
  }),

  bookings: defineTable({
    userId: v.id("users"),
    roomId: v.id("rooms"),
    checkIn: v.number(),
    checkOut: v.number(),
    status: v.union(v.literal("confirmed"), v.literal("cancelled")),
  }),
});
