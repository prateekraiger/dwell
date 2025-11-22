"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-[calc(100vh-8rem)]">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-16 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Owner Dashboard</h1>
          </header>
          <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
