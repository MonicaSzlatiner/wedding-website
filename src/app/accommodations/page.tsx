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
      {/* Hero Section - Split Layout with Dogs */}
      <section className="relative min-h-[70vh] flex">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-sage-600 flex flex-col justify-center p-12 md:p-16 lg:p-20 pt-28">
          <p className="text-white text-sm tracking-widest uppercase mb-4" style={{ letterSpacing: "2px" }}>
            Plan Your Stay
          </p>
          <h1 className="font-serif text-display-md md:text-display-lg text-white mb-6" style={{ letterSpacing: "2px" }}>
            {title}
          </h1>
          <p className="text-white text-lg max-w-md">
            {subtitle}
          </p>
        </div>

        {/* Right Panel - Dogs Photo */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src="/images/dogs.jpg"
            alt="Our furry friends waiting to welcome you"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-stone-50">
        <Container size="content">
          <p className="text-stone-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {intro}
          </p>
        </Container>
      </section>

      {/* Hotels List */}
      <section className="section">
        <Container>
          <SectionHeading
            title="Recommended Hotels"
            subtitle="Our hand-picked options near the venue"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </Container>
      </section>

      {/* Other Options */}
      <section className="py-16 bg-stone-100">
        <Container size="content">
          <div className="text-center">
            <h2 className="font-serif text-2xl text-stone-800 mb-4">
              {otherOptions.title}
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              {otherOptions.description}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sage-600 text-white text-center">
        <Container size="content">
          <h2 className="font-serif text-2xl text-white mb-4" style={{ letterSpacing: "1px" }}>
            Questions about where to stay?
          </h2>
          <p className="text-white/80">
            Feel free to reach out if you need any recommendations.
          </p>
        </Container>
      </section>
    </>
  );
}
