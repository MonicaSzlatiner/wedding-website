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
function TrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
      {/* Hero Section - Mobile: stacked, Desktop: split */}
      <section className="relative min-h-[85vh] lg:min-h-[70vh]">
        {/* Mobile: Full-bleed image background */}
        <div className="lg:hidden absolute inset-0">
          <Image
            src="/images/hero-travel.jpg"
            alt="Laurens and Monica in New York City"
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
            <p className="text-white/80 text-sm tracking-widest uppercase mb-4">
              Getting There
            </p>
            <h1 className="font-serif text-display-lg text-white mb-6">
              {travel.title}
            </h1>
            <p className="text-white/90 text-lg max-w-md leading-relaxed">
              {travel.subtitle}
            </p>
          </div>
          <div className="w-1/2 relative">
            <Image
              src="/images/hero-travel.jpg"
              alt="Laurens and Monica in New York City"
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
            Getting There
          </p>
          <h1 className="font-serif text-display-sm text-white mb-4">
            {travel.title}
          </h1>
          <p className="text-white/90 text-base leading-relaxed max-w-sm">
            {travel.subtitle}
          </p>
        </div>
      </section>

      {/* Transportation Options */}
      <section className="py-12 md:py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* By Air */}
            <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-stone-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-sage-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <PaperAirplaneIcon className="h-5 w-5 md:h-6 md:w-6 text-sage-600" />
              </div>
              <h3 className="font-serif text-lg md:text-xl text-stone-800 mb-3 md:mb-4">
                {travel.sections.flights.title}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {travel.sections.flights.items.map((item, index) => (
                  <div key={index}>
                    <p className="text-stone-800 font-medium text-sm md:text-base">
                      {item.name}
                      {item.recommended && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </p>
                    <p className="text-stone-500 text-xs md:text-sm mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* By Train */}
            <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-stone-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-sage-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <TrainIcon className="h-5 w-5 md:h-6 md:w-6 text-sage-600" />
              </div>
              <h3 className="font-serif text-lg md:text-xl text-stone-800 mb-3 md:mb-4">
                {travel.sections.train.title}
              </h3>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                {travel.sections.train.description}
              </p>
            </div>

            {/* By Car */}
            <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-stone-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-sage-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <TruckIcon className="h-5 w-5 md:h-6 md:w-6 text-sage-600" />
              </div>
              <h3 className="font-serif text-lg md:text-xl text-stone-800 mb-3 md:mb-4">
                {travel.sections.car.title}
              </h3>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                {travel.sections.car.description}
              </p>
            </div>
          </div>

          {/* Directions Button */}
          <div className="text-center mt-8 md:mt-12">
            <Button href={venue.googleMapsLink} variant="primary" external className="w-full sm:w-auto">
              Get Directions to Venue
            </Button>
          </div>
        </Container>
      </section>

      {/* Where to Stay Section */}
      <section className="py-12 md:py-16 bg-stone-100">
        <Container size="content">
          <div className="text-center px-2">
            <h2 className="font-serif text-xl md:text-2xl text-stone-800 mb-2 md:mb-3">
              Where to Stay
            </h2>
            <p className="text-stone-500 text-sm md:text-base mb-5 md:mb-6 max-w-xl mx-auto leading-relaxed">
              We have put together a list of recommended hotels near the venue, 
              complete with ratings and booking links.
            </p>
            <Button href="/accommodations" variant="primary" className="w-full sm:w-auto">
              View Accommodations
            </Button>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16 bg-sage-600 text-white text-center">
        <Container size="content">
          <h2 className="font-serif text-xl md:text-2xl text-white mb-6 md:mb-8 px-2">
            Have questions about getting there?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button href="/faq" variant="outline-white" className="w-full sm:w-auto">
              View FAQ
            </Button>
            <Button href="/rsvp" variant="outline-white" className="w-full sm:w-auto">
              RSVP
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
