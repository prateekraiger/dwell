"use client";

import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreateRoomModal } from "@/components/create-room-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Users, DollarSign, IndianRupee } from "lucide-react";

export default function HotelsPage() {
  const { isAuthenticated } = useConvexAuth();
  // For dev: allow query to run even if client thinks it's not authenticated,
  // because backend has a fallback.
  const rooms = useQuery(api.rooms.getMyRooms);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">My Hotels</h2>
          <p className="text-muted-foreground">
            Manage your hotel properties and their details.
          </p>
        </div>
        <CreateRoomModal />
      </div>

      {rooms === undefined ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[300px] rounded-xl border bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <MapPin className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No rooms listed</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            You haven't listed any rooms yet. Create your first room to get
            started.
          </p>
          <CreateRoomModal />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Card key={room._id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden bg-muted">
                {room.photos && room.photos.length > 0 ? (
                  <img
                    src={room.photos[0]}
                    alt={room.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="line-clamp-1 text-xl">{room.title}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                    <MapPin className="h-3 w-3" />
                    {room.location}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {room.description}
                </p>
                {room.features && room.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {room.features.slice(0, 3).map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                    {room.features.length > 3 && (
                      <span className="text-xs text-muted-foreground self-center">
                        +{room.features.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  {room.maxGuests} Guests
                </div>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  {room.pricePerNight}/night
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
