import { HeroSection } from "@/components/ui/dynamic-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        heading="Experience Luxury Like Never Before"
        tagline="Discover a sanctuary of peace and elegance in the heart of the city. Your perfect getaway awaits at Dwell."
        buttonText="View Rooms"
        buttonLink="/rooms"
        imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        videoUrl="https://ik.imagekit.io/mtk2a0sx6/hotel.mp4"
      />

      {/* Featured Section */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Dwell?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Comfort",
                description:
                  "Designed for your ultimate relaxation with top-tier amenities.",
              },
              {
                title: "Exquisite Dining",
                description:
                  "Savor culinary masterpieces crafted by world-class chefs.",
              },
              {
                title: "Prime Location",
                description:
                  "Located in the center of it all, yet a world away from the noise.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-20 px-4 md:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Featured Rooms</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our selection of elegantly designed rooms, each offering a unique blend of comfort and style.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Deluxe Suite",
                image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
                price: "$299/night",
                description: "Spacious suite with city views and a private balcony.",
              },
              {
                title: "Standard Room",
                image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
                price: "$149/night",
                description: "Cozy and comfortable room perfect for solo travelers or couples.",
              },
              {
                title: "Family Suite",
                image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
                price: "$399/night",
                description: "Large suite with multiple beds and a living area for the whole family.",
              },
            ].map((room, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video w-full relative">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{room.title}</CardTitle>
                    <span className="text-primary font-bold">{room.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{room.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/rooms">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/rooms">View All Rooms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Clark",
                role: "Business Traveler",
                quote: "The service at Dwell is unmatched. I felt completely at home during my business trip.",
              },
              {
                name: "Michael & Sarah",
                role: "Couple",
                quote: "A romantic getaway we will never forget. The dining experience was spectacular.",
              },
              {
                name: "The Johnsons",
                role: "Family",
                quote: "Our kids loved the family suite! Spacious, clean, and very accommodating staff.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-muted/30 border-none">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="text-primary">
                      {/* Simple quote icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="opacity-50"
                      >
                        <path d="M14.017 21L14.017 18C14.017 16.0547 15.372 15.1181 16.8145 14C16.5557 14 16.2731 14.0156 15.9757 14.0156C13.5284 14.0156 11.5367 11.979 11.5367 9.46875C11.5367 7.09885 13.5623 5 15.9757 5C18.423 5 20.4485 7.08643 20.4485 9.46875C20.4485 14.0586 17.6534 18.2734 14.017 21ZM5 21L5 18C5 16.0547 6.35496 15.1181 7.79749 14C7.5387 14 7.25615 14.0156 6.95874 14.0156C4.51137 14.0156 2.51969 11.979 2.51969 9.46875C2.51969 7.09885 4.54528 5 6.95874 5C9.40604 5 11.4315 7.08643 11.4315 9.46875C11.4315 14.0586 8.63644 18.2734 5 21Z" />
                      </svg>
                    </div>
                    <p className="italic text-muted-foreground">{testimonial.quote}</p>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="mb-8 opacity-90">
            Subscribe to our newsletter for exclusive offers, travel tips, and upcoming events at Dwell.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
