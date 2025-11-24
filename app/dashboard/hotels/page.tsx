"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreateRoomModal } from "@/components/create-room-modal";
import { RoomCard } from "@/components/room-card";
import { MapPin } from "lucide-react";

export default function HotelsPage() {
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
            You haven&apos;t listed any rooms yet. Create your first room to get
            started.
          </p>
          <CreateRoomModal />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} showOwnerActions={true} />
          ))}
        </div>
      )}
    </div>
  );
}
