import { Metadata } from "next";
import Image from "next/image";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  PaperAirplaneIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: `Travel | ${weddingConfig.meta.title}`,
  description: "Travel information, transportation options, and hotel recommendations.",
};

// Custom train icon
function TrainIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 18v2m8-2v2M4 6v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2zm4 8h.01M16 14h.01M7 10h10"
      />
    </svg>
  );
}

export default function TravelPage() {
  const { travel, venue } = weddingConfig;

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
                Getting There
              </p>
              <h1 
                className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                {travel.heading}
              </h1>
              <p 
                className="font-serif text-lg md:text-xl italic leading-relaxed"
                style={{ color: "rgba(45, 41, 38, 0.6)" }}
              >
                {travel.subtitle}
              </p>
            </div>

            {/* Right - Image */}
            <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
              <Image
                src="/images/hero-travel.jpg"
                alt="Laurens and Monica in New York City"
                fill
                className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Transportation Options */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
        <Container>
          <div className="grid gap-8 md:gap-6 md:grid-cols-3">
            {/* By Air */}
            <div className="py-8 px-6 border-t" style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}>
              <div className="mb-6">
                <PaperAirplaneIcon className="h-6 w-6" style={{ color: "#C37B60" }} />
              </div>
              <h3 
                className="font-serif text-xl italic mb-4"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                {travel.sections.flights.title}
              </h3>
              <div className="space-y-4">
                {travel.sections.flights.items.map((item, index) => (
                  <div key={index}>
                    <p className="font-medium text-sm mb-1" style={{ color: "#2D2926" }}>
                      {item.name}
                      {item.recommended && (
                        <span 
                          className="ml-2 text-[10px] uppercase"
                          style={{ color: "#C37B60", letterSpacing: "0.1em" }}
                        >
                          ★
                        </span>
                      )}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* By Train */}
            <div className="py-8 px-6 border-t" style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}>
              <div className="mb-6">
                <TrainIcon className="h-6 w-6" style={{ color: "#C37B60" }} />
              </div>
              <h3 
                className="font-serif text-xl italic mb-4"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                {travel.sections.train.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
                {travel.sections.train.description}
              </p>
            </div>

            {/* By Car */}
            <div className="py-8 px-6 border-t" style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}>
              <div className="mb-6">
                <TruckIcon className="h-6 w-6" style={{ color: "#C37B60" }} />
              </div>
              <h3 
                className="font-serif text-xl italic mb-4"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                {travel.sections.car.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
                {travel.sections.car.description}
              </p>
            </div>
          </div>

          {/* Directions Button */}
          <div className="text-center mt-12">
            <Button href={venue.googleMapsLink} variant="primary" external>
              Get Directions to Venue
            </Button>
          </div>
        </Container>
      </section>

      {/* Where to Stay Section */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#2D2926" }}>
        <Container size="content">
          <div className="text-center px-2">
            <h2 
              className="font-serif text-xl md:text-2xl italic text-white mb-2 md:mb-3" 
              style={{ fontWeight: 400 }}
            >
              Where to Stay
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-6 max-w-xl mx-auto leading-relaxed">
              We have put together a list of recommended hotels near the venue, 
              complete with ratings and booking links.
            </p>
            <Button href="/accommodations" variant="outline-white">
              View Accommodations
            </Button>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <h2 
            className="font-serif text-xl md:text-2xl italic mb-8 px-2"
            style={{ fontWeight: 400, color: "#2D2926" }}
          >
            Have questions about getting there?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Button href="/faq" variant="secondary">
              View FAQ
            </Button>
            <Button href="/rsvp" variant="primary">
              RSVP
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
