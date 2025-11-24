"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { RoleSelectionModal } from "./RoleSelectionModal";
import { useRouter } from "next/navigation";

export function RoleCheck() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const userData = useQuery(
    api.users.getUser,
    user ? { externalId: user.id } : "skip"
  );
  const updateUserRole = useMutation(api.users.updateUserRole);

  useEffect(() => {
    if (userData?.role === "pending") {
      setShowModal(true);
    }
  }, [userData]);

  const handleSelectRole = async (role: "guest" | "owner") => {
    if (userData) {
      await updateUserRole({ userId: userData._id, role });
      setShowModal(false);

      if (role === "guest") {
        router.push("/rooms");
      } else if (role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  };

  if (!showModal) return null;

  return <RoleSelectionModal onSelectRole={handleSelectRole} />;
}
