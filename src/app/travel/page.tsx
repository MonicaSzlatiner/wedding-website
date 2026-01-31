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
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-[70vh] flex">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-sage-600 flex flex-col justify-center p-8 md:p-12 lg:p-16 pt-24">
          <p className="text-white/70 text-sm tracking-widest uppercase mb-4">
            Getting There
          </p>
          <h1 className="font-serif text-display-md md:text-display-lg text-white mb-6">
            {travel.title}
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            {travel.subtitle}
          </p>
        </div>

        {/* Right Panel - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src="/images/hero-travel.jpg"
            alt="Laurens and Monica in New York City"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Transportation Options */}
      <section className="section">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {/* By Air */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-6">
                <PaperAirplaneIcon className="h-6 w-6 text-sage-600" />
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-4">
                {travel.sections.flights.title}
              </h3>
              <div className="space-y-4">
                {travel.sections.flights.items.map((item, index) => (
                  <div key={index}>
                    <p className="text-stone-800 font-medium">
                      {item.name}
                      {item.recommended && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </p>
                    <p className="text-stone-500 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* By Train */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-6">
                <TrainIcon className="h-6 w-6 text-sage-600" />
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-4">
                {travel.sections.train.title}
              </h3>
              <p className="text-stone-500">
                {travel.sections.train.description}
              </p>
            </div>

            {/* By Car */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-6">
                <TruckIcon className="h-6 w-6 text-sage-600" />
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-4">
                {travel.sections.car.title}
              </h3>
              <p className="text-stone-500">
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
      <section className="py-16 bg-stone-100">
        <Container size="content">
          <div className="text-center">
            <h2 className="font-serif text-2xl text-stone-800 mb-3">
              Where to Stay
            </h2>
            <p className="text-stone-500 mb-6 max-w-xl mx-auto">
              We have put together a list of recommended hotels near the venue, 
              complete with ratings and booking links.
            </p>
            <Button href="/accommodations" variant="primary">
              View Accommodations
            </Button>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-sage-600 text-white text-center">
        <Container size="content">
          <h2 className="font-serif text-2xl text-white mb-8">
            Have questions about getting there?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/faq" variant="outline-white">
              View FAQ
            </Button>
            <Button href="/rsvp" variant="outline-white">
              RSVP
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
