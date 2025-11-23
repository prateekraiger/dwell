// React and Next.js imports
import Link from "next/link";

// UI component imports
import { Button } from "../ui/button";

// Icon imports
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

// Local component imports
import { Section, Container } from "../ui/craft";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Section>
        <Container className="grid gap-12 md:grid-cols-[1.5fr_0.5fr_0.5fr_0.5fr]">
          <div className="not-prose flex flex-col gap-6">
            <Link href="/">
              <h3 className="text-2xl font-bold">Dwell</h3>
            </Link>
            <p className="text-muted-foreground">
              Experience luxury redefined. At Dwell, we blend modern elegance with timeless comfort to create unforgettable stays.
            </p>

          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold">Explore</h5>
            <Link href="/rooms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Rooms</Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold">Services</h5>
            <Link href="/rooms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accommodations</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dining</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Spa & Wellness</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Events</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold">Legal</h5>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </Container>
        <Container className="not-prose flex flex-col justify-between gap-6 border-t pt-8 md:flex-row md:items-center md:gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-foreground transition-colors">Dwell</Link>.
            All rights reserved.
          </p>
        </Container>
      </Section>
    </footer>
  );
}
