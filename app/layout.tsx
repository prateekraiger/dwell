"use client";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { UserSync } from "@/components/auth/UserSync";
import { RoleCheck } from "@/components/auth/RoleCheck";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body className={poppins.className}>
          <div className="flex min-h-screen flex-col font-normal">
            <UserSync />
            <RoleCheck />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
