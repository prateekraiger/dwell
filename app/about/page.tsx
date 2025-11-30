import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About Dwell</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Dwell, we believe that a hotel stay should be more than just a place to sleep. It should be an experience that rejuvenates your soul and inspires your mind. Founded in 2024, we have set a new standard for luxury hospitality, blending modern elegance with timeless comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden shadow-xl">
               <img
                 src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
                 alt="Dwell Hotel - Our Story"
                 className="w-full h-full object-cover"
               />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our mission is to provide an oasis of calm in the bustling city. We are dedicated to personalized service, sustainable practices, and creating a welcoming atmosphere where every guest feels at home.
            </p>
            <ul className="space-y-4">
              {[
                "Unmatched Hospitality",
                "Sustainable Luxury",
                "Curated Experiences",
                "Architectural Excellence"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticity",
                description: "We believe in genuine interactions and staying true to our local roots.",
                icon: "🌟"
              },
              {
                title: "Sustainability",
                description: "Committed to eco-friendly practices that minimize our footprint.",
                icon: "🌿"
              },
              {
                title: "Excellence",
                description: "Striving for perfection in every detail of your stay.",
                icon: "🏆"
              }
            ].map((value, index) => (
              <Card key={index} className="text-center p-6 border-none bg-muted/30">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                  { name: "Sarah Jenkins", role: "General Manager", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" },
                  { name: "David Chen", role: "Head Chef", image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2080&auto=format&fit=crop" },
                  { name: "Elena Rodriguez", role: "Guest Experience Manager", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" }
              ].map((member, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl bg-muted p-0 transition-all hover:shadow-lg">
                      <div className="aspect-[3/4] w-full overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                          <h3 className="text-xl font-semibold">{member.name}</h3>
                          <p className="text-sm opacity-90">{member.role}</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">A Glimpse Inside</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
            ].map((img, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden group">
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Us CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">
            Passionate about hospitality? We are always looking for talented individuals to join the Dwell family and help us create unforgettable experiences.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact">Contact Us for Careers</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
