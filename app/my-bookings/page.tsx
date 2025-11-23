"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin, Users, Loader2, CreditCard } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MyBookingsPage() {
  const { isLoaded } = useUser();
  const bookings = useQuery(api.bookings.getMyBookings);

  if (!isLoaded || bookings === undefined) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-6xl">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your upcoming and past stays.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/30">
          <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold">No bookings yet</h3>
          <p className="text-muted-foreground mb-6">
            You haven't made any bookings yet. Start exploring our rooms!
          </p>
          <Link href="/rooms">
            <Button>Explore Rooms</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Hotel</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => {
                const nights = differenceInDays(
                  new Date(booking.checkOut),
                  new Date(booking.checkIn)
                );
                const totalAmount = booking.room ? booking.room.pricePerNight * nights : 0;
                const serviceFee = Math.round(totalAmount * 0.12);
                const grandTotal = totalAmount + serviceFee;

                return (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-24 rounded-md overflow-hidden bg-muted shrink-0">
                          {booking.room?.photos?.[0] ? (
                            <img
                              src={booking.room.photos[0]}
                              alt={booking.room.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium line-clamp-1">
                            {booking.room?.title || "Unknown Room"}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {booking.room?.location || "Unknown Location"}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {booking.room?.maxGuests || 2} Guests
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">Check-in</span>
                          <span className="text-muted-foreground">
                            {format(new Date(booking.checkIn), "EEE MMM dd, yyyy")}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                          <span className="font-medium">Check-out</span>
                          <span className="text-muted-foreground">
                            {format(new Date(booking.checkOut), "EEE MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={booking.status === "confirmed" ? "default" : "secondary"}
                      >
                        {booking.status === "confirmed" ? "Confirmed" : booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{grandTotal.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {booking.status === "confirmed" ? (
                        <Button size="sm" className="gap-2">
                          <CreditCard className="h-4 w-4" />
                          Pay Now
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="rounded-full">
                          Pay now
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
