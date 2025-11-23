"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export function UserSync() {
  const { user } = useUser();
  const updateUser = useMutation(api.users.updateOrCreateUser);

  useEffect(() => {
    if (user) {
      updateUser({
        externalId: user.id,
        name: user.fullName || user.firstName || "User",
        email: user.emailAddresses[0]?.emailAddress ?? "",
        imageUrl: user.imageUrl,
      });
    }
  }, [user, updateUser]);

  return null;
}
