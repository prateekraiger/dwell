"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import Stripe from "stripe";
import { ConvexError } from "convex/values";
import { api } from "./_generated/api";

export const createCheckoutSession = action({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args): Promise<{ sessionUrl: string | null }> => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20" as any, // Cast to any to avoid version mismatch errors if types are outdated
    });

    const domain = process.env.HOST_URL;
    if (!domain) {
      throw new Error("HOST_URL environment variable is not set in Convex.");
    }

    // Fetch booking details
    const booking = await ctx.runQuery(api.bookings.getBookingById, {
      bookingId: args.bookingId,
    });
    if (!booking) {
      throw new ConvexError("Booking not found");
    }

    const room = booking.room;
    if (!room) {
      throw new ConvexError("Room not found");
    }

    // Calculate total amount
    const numberOfNights = Math.ceil(
      (booking.checkOut - booking.checkIn) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = numberOfNights * room.pricePerNight;
    const serviceFee = Math.round(totalPrice * 0.12);
    const grandTotal = totalPrice + serviceFee;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: room.title,
              description: `Booking for ${numberOfNights} nights at ${room.location}`,
            },
            unit_amount: grandTotal * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${domain}/my-bookings?success=true&bookingId=${args.bookingId}`,
      cancel_url: `${domain}/my-bookings?canceled=true`,
      metadata: {
        bookingId: args.bookingId,
        roomId: room._id,
      },
    });

    return { sessionUrl: session.url };
  },
});
