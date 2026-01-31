import { Metadata } from "next";
import Image from "next/image";
import { weddingConfig } from "@/config/content";
import { hotels, accommodationsContent } from "@/config/hotels";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HotelCard } from "@/components/HotelCard";

export const metadata: Metadata = {
  title: `Accommodations | ${weddingConfig.meta.title}`,
  description: "Recommended hotels and places to stay for our wedding in Rotterdam.",
};

export default function AccommodationsPage() {
  const { title, subtitle, intro, otherOptions } = accommodationsContent;

  return (
    <>
      {/* Hero Section - Mobile: stacked, Desktop: split */}
      <section className="relative min-h-[85vh] lg:min-h-[70vh]">
        {/* Mobile: Full-bleed image background */}
        <div className="lg:hidden absolute inset-0">
          <Image
            src="/images/dogs.jpg"
            alt="Our furry friends waiting to welcome you"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage-900/95 via-sage-800/60 to-sage-700/30" />
        </div>

        {/* Desktop: Split layout */}
        <div className="hidden lg:flex min-h-[70vh]">
          <div className="w-1/2 bg-sage-600 flex flex-col justify-center p-20">
            <p className="text-white/80 text-sm tracking-widest uppercase mb-4" style={{ letterSpacing: "2px" }}>
              Plan Your Stay
            </p>
            <h1 className="font-serif text-display-lg text-white mb-6" style={{ letterSpacing: "2px" }}>
              {title}
            </h1>
            <p className="text-white/90 text-lg max-w-md leading-relaxed">
              {subtitle}
            </p>
          </div>
          <div className="w-1/2 relative">
            <Image
              src="/images/dogs.jpg"
              alt="Our furry friends waiting to welcome you"
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
          </div>
        </div>

        {/* Mobile: Content overlay */}
        <div className="lg:hidden relative min-h-[85vh] flex flex-col justify-end px-6 pb-16 pt-24">
          <p className="text-white/80 text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "3px" }}>
            Plan Your Stay
          </p>
          <h1 className="font-serif text-display-sm text-white mb-4" style={{ letterSpacing: "1px" }}>
            {title}
          </h1>
          <p className="text-white/90 text-base leading-relaxed max-w-sm">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-10 md:py-12 bg-stone-50">
        <Container size="content">
          <p className="text-stone-600 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto px-2">
            {intro}
          </p>
        </Container>
      </section>

      {/* Hotels List */}
      <section className="py-12 md:py-16 lg:py-20">
        <Container>
          <SectionHeading
            title="Recommended Hotels"
            subtitle="Our hand-picked options near the venue"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </Container>
      </section>

      {/* Other Options */}
      <section className="py-12 md:py-16 bg-stone-100">
        <Container size="content">
          <div className="text-center px-2">
            <h2 className="font-serif text-xl md:text-2xl text-stone-800 mb-3 md:mb-4">
              {otherOptions.title}
            </h2>
            <p className="text-stone-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {otherOptions.description}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-sage-600 text-white text-center">
        <Container size="content">
          <h2 className="font-serif text-xl md:text-2xl text-white mb-3 md:mb-4 px-2" style={{ letterSpacing: "1px" }}>
            Questions about where to stay?
          </h2>
          <p className="text-white/80 text-sm md:text-base px-2">
            Feel free to reach out if you need any recommendations.
          </p>
        </Container>
      </section>
    </>
  );
}
