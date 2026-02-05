import { Metadata } from "next";
import Image from "next/image";
import { weddingConfig } from "@/config/content";
import { hotels, accommodationsContent } from "@/config/hotels";
import { Container } from "@/components/ui/Container";
import { HotelCard } from "@/components/HotelCard";

export const metadata: Metadata = {
  title: `Accommodations | ${weddingConfig.meta.title}`,
  description: "Recommended hotels and places to stay for our wedding in Rotterdam.",
};

export default function AccommodationsPage() {
  const { title, subtitle, intro, otherOptions } = accommodationsContent;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <div>
              <p 
                className="text-[10px] uppercase font-bold mb-4"
                style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
              >
                Plan Your Stay
              </p>
              <h1 
                className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                {title}
              </h1>
              <p 
                className="font-serif text-lg md:text-xl italic leading-relaxed"
                style={{ color: "rgba(45, 41, 38, 0.6)" }}
              >
                {subtitle}
              </p>
            </div>

            {/* Right - Image */}
            <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
              <Image
                src="/images/dogs.jpg"
                alt="Our welcome committee. They won&apos;t be at the wedding, but they wanted to say hi."
                fill
                className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-10 md:py-12" style={{ backgroundColor: "#2D2926" }}>
        <Container size="content">
          <p className="text-white/70 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto px-2">
            {intro}
          </p>
        </Container>
      </section>

      {/* Hotels List */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
        <Container>
          <div className="text-center mb-12 md:mb-16">
            <p 
              className="text-[10px] uppercase font-bold mb-4"
              style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
            >
              Our Picks
            </p>
            <h2 
              className="font-serif text-3xl md:text-4xl italic"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              Recommended Hotels
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </Container>
      </section>

      {/* Other Options */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#2D2926" }}>
        <Container size="content">
          <div className="text-center px-2">
            <h2 
              className="font-serif text-xl md:text-2xl italic text-white mb-3 md:mb-4" 
              style={{ fontWeight: 400 }}
            >
              {otherOptions.title}
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {otherOptions.description}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <h2 
            className="font-serif text-xl md:text-2xl italic mb-3 md:mb-4 px-2"
            style={{ fontWeight: 400, color: "#2D2926" }}
          >
            Questions about where to stay?
          </h2>
          <p style={{ color: "rgba(45, 41, 38, 0.6)" }} className="text-sm md:text-base px-2">
            Feel free to reach out if you need any recommendations.
          </p>
        </Container>
      </section>
    </>
  );
}
