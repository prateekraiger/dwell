"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Rooms & Suites", href: "/rooms" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const userData = useQuery(api.users.getUser, user ? { externalId: user.id } : "skip");
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                DWELL
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 lg:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  isActive(link.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Auth & Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <SignedOut>
              <Link href="/sign-in" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up" className="hidden sm:block">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              {userData?.role === "owner" && (
                <Link href="/dashboard" className="hidden sm:block">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="hidden lg:inline">Dashboard</span>
                  </Button>
                </Link>
              )}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </SignedIn>

            {/* Mobile Menu Toggle */}
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2">
                <SignedOut>
                  <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </SignedOut>

                <SignedIn>
                  {userData?.role === "owner" && (
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
