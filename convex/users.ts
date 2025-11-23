import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const updateOrCreateUser = mutation({
  args: {
    externalId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", args.externalId))
      .unique();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        email: args.email,
      });
      return existingUser._id;
    }

    return await ctx.db.insert("users", {
      externalId: args.externalId,
      name: args.name,
      email: args.email,
      role: "pending",
    });
  },
});

export const getUser = query({
  args: { externalId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", args.externalId))
      .unique();
  },
});

export const updateUserRole = mutation({
  args: { userId: v.id("users"), role: v.union(v.literal("guest"), v.literal("owner"), v.literal("admin")) },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { role: args.role });
  },
});
