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
      {/* Hero Section - Editorial framed style */}
      <section className="relative">
        {/* Mobile: Stacked with frame */}
        <div className="lg:hidden p-3 sm:p-4 min-h-[90vh]" style={{ backgroundColor: "#E8E6E1" }}>
          <div className="min-h-[calc(90vh-24px)] sm:min-h-[calc(90vh-32px)] flex flex-col" style={{ backgroundColor: "#6B705C" }}>
            {/* Image */}
            <div className="relative h-[50vh]">
              <Image
                src="/images/hero-travel.jpg"
                alt="Laurens and Monica in New York City"
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
                Getting There
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl text-white leading-tight mb-4" style={{ fontWeight: 400 }}>
                {travel.title}
              </h1>
              <p className="text-white/70 text-base leading-relaxed max-w-sm">
                {travel.subtitle}
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
                Getting There
              </p>
              <h1 
                className="font-serif text-5xl xl:text-6xl 2xl:text-7xl text-white leading-[1.05] mb-6"
                style={{ fontWeight: 400 }}
              >
                {travel.title}
              </h1>
              <p className="text-white/60 text-base xl:text-lg max-w-md leading-relaxed">
                {travel.subtitle}
              </p>
            </div>
            {/* Right Panel - Image */}
            <div className="w-[55%] relative">
              <Image
                src="/images/hero-travel.jpg"
                alt="Laurens and Monica in New York City"
                fill
                className="object-cover"
                priority
                sizes="55vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Options - Cream background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
        <Container>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* By Air */}
            <div className="p-5 md:p-8 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
              <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6"
                style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}
              >
                <PaperAirplaneIcon className="h-5 w-5 md:h-6 md:w-6" style={{ color: "#6B705C" }} />
              </div>
              <h3 className="font-serif text-lg md:text-xl mb-3 md:mb-4" style={{ color: "#1A1A1A", fontWeight: 400 }}>
                {travel.sections.flights.title}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {travel.sections.flights.items.map((item, index) => (
                  <div key={index}>
                    <p className="font-medium text-sm md:text-base" style={{ color: "#1A1A1A" }}>
                      {item.name}
                      {item.recommended && (
                        <span 
                          className="ml-2 text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(107, 112, 92, 0.15)", color: "#6B705C" }}
                        >
                          Recommended
                        </span>
                      )}
                    </p>
                    <p className="text-xs md:text-sm mt-1 leading-relaxed" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* By Train */}
            <div className="p-5 md:p-8 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
              <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6"
                style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}
              >
                <TrainIcon className="h-5 w-5 md:h-6 md:w-6" style={{ color: "#6B705C" }} />
              </div>
              <h3 className="font-serif text-lg md:text-xl mb-3 md:mb-4" style={{ color: "#1A1A1A", fontWeight: 400 }}>
                {travel.sections.train.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                {travel.sections.train.description}
              </p>
            </div>

            {/* By Car */}
            <div className="p-5 md:p-8 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
              <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6"
                style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}
              >
                <TruckIcon className="h-5 w-5 md:h-6 md:w-6" style={{ color: "#6B705C" }} />
              </div>
              <h3 className="font-serif text-lg md:text-xl mb-3 md:mb-4" style={{ color: "#1A1A1A", fontWeight: 400 }}>
                {travel.sections.car.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                {travel.sections.car.description}
              </p>
            </div>
          </div>

          {/* Directions Button */}
          <div className="text-center mt-8 md:mt-12">
            <Button href={venue.googleMapsLink} variant="primary" external >
              Get Directions to Venue
            </Button>
          </div>
        </Container>
      </section>

      {/* Where to Stay Section - Sage background */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#6B705C" }}>
        <Container size="content">
          <div className="text-center px-2">
            <h2 className="font-serif text-xl md:text-2xl text-white mb-2 md:mb-3" style={{ fontWeight: 400 }}>
              Where to Stay
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-5 md:mb-6 max-w-xl mx-auto leading-relaxed">
              We have put together a list of recommended hotels near the venue, 
              complete with ratings and booking links.
            </p>
            <Button href="/accommodations" variant="outline-white" >
              View Accommodations
            </Button>
          </div>
        </Container>
      </section>

      {/* Quick Links - Cream background */}
      <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#E8E6E1" }}>
        <Container size="content">
          <h2 
            className="font-serif text-xl md:text-2xl mb-6 md:mb-8 px-2"
            style={{ fontWeight: 400, color: "#1A1A1A" }}
          >
            Have questions about getting there?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button href="/faq" variant="secondary" >
              View FAQ
            </Button>
            <Button href="/rsvp" variant="primary" >
              RSVP
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
