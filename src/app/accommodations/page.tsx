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
      {/* Hero Section - Editorial framed style */}
      <section className="relative">
        {/* Mobile: Stacked with frame */}
        <div className="lg:hidden p-3 sm:p-4 min-h-[90vh]" style={{ backgroundColor: "#E8E6E1" }}>
          <div className="min-h-[calc(90vh-24px)] sm:min-h-[calc(90vh-32px)] flex flex-col" style={{ backgroundColor: "#6B705C" }}>
            {/* Image */}
            <div className="relative h-[50vh]">
              <Image
                src="/images/dogs.jpg"
                alt="Our furry friends waiting to welcome you"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col justify-end p-6 sm:p-8">
              <p 
                className="text-white/50 text-xs uppercase mb-4"
                style={{ letterSpacing: "0.2em" }}
              >
                Plan Your Stay
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl text-white leading-tight mb-4" style={{ fontWeight: 400 }}>
                {title}
              </h1>
              <p className="text-white/70 text-base leading-relaxed max-w-sm">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: Framed split layout */}
        <div className="hidden lg:block p-5 xl:p-6 min-h-screen" style={{ backgroundColor: "#E8E6E1" }}>
          <div className="flex h-[calc(100vh-40px)] xl:h-[calc(100vh-48px)]">
            {/* Left Panel */}
            <div 
              className="w-[45%] flex flex-col justify-end p-10 xl:p-14"
              style={{ backgroundColor: "#6B705C" }}
            >
              <p 
                className="text-white/50 text-xs xl:text-sm uppercase mb-6"
                style={{ letterSpacing: "0.2em" }}
              >
                Plan Your Stay
              </p>
              <h1 
                className="font-serif text-5xl xl:text-6xl 2xl:text-7xl text-white leading-[1.05] mb-6"
                style={{ fontWeight: 400 }}
              >
                {title}
              </h1>
              <p className="text-white/60 text-base xl:text-lg max-w-md leading-relaxed">
                {subtitle}
              </p>
            </div>
            {/* Right Panel - Image */}
            <div className="w-[55%] relative">
              <Image
                src="/images/dogs.jpg"
                alt="Our furry friends waiting to welcome you"
                fill
                className="object-cover"
                priority
                sizes="55vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section - Sage background */}
      <section className="py-10 md:py-12" style={{ backgroundColor: "#6B705C" }}>
        <Container size="content">
          <p className="text-white/80 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto px-2">
            {intro}
          </p>
        </Container>
      </section>

      {/* Hotels List - Gray background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
        <Container>
          <div className="text-center mb-8 md:mb-12">
            <p 
              className="text-xs md:text-sm uppercase mb-3"
              style={{ letterSpacing: "0.2em", color: "#6B705C" }}
            >
              Our Picks
            </p>
            <h2 
              className="font-serif text-3xl md:text-4xl"
              style={{ fontWeight: 400, color: "#1A1A1A" }}
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

      {/* Other Options - Sage background */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#6B705C" }}>
        <Container size="content">
          <div className="text-center px-2">
            <h2 className="font-serif text-xl md:text-2xl text-white mb-3 md:mb-4" style={{ fontWeight: 400 }}>
              {otherOptions.title}
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {otherOptions.description}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section - Cream background */}
      <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#E8E6E1" }}>
        <Container size="content">
          <h2 
            className="font-serif text-xl md:text-2xl mb-3 md:mb-4 px-2"
            style={{ fontWeight: 400, color: "#1A1A1A" }}
          >
            Questions about where to stay?
          </h2>
          <p style={{ color: "rgba(26, 26, 26, 0.6)" }} className="text-sm md:text-base px-2">
            Feel free to reach out if you need any recommendations.
          </p>
        </Container>
      </section>
    </>
  );
}
