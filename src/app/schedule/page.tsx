import { Metadata } from "next";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VenueMap } from "@/components/VenueMap";
import { AddToCalendar } from "@/components/AddToCalendar";
import {
  MapPinIcon,
  GlobeAltIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: `Schedule | ${weddingConfig.meta.title}`,
  description: "Wedding day schedule, venue details, and dress code information.",
};

export default function SchedulePage() {
  const { schedule, venue, date, dressCode } = weddingConfig;

  return (
    <>
      {/* Hero Section - Editorial style */}
      <section 
        className="pt-24 pb-12 md:pt-32 md:pb-16" 
        style={{ backgroundColor: "#6B705C" }}
      >
        <Container size="content">
          <div className="text-center px-2">
            <p 
              className="text-white/50 text-xs md:text-sm uppercase mb-3 md:mb-4"
              style={{ letterSpacing: "0.2em" }}
            >
              {date.full}
            </p>
            <h1 
              className="font-serif text-4xl md:text-6xl text-white mb-4 md:mb-6"
              style={{ fontWeight: 400 }}
            >
              {schedule.title}
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {schedule.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline Section - Gray frame background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#A5A5A0" }}>
        <Container size="content">
          {/* Mobile: Simple stacked cards */}
          <div className="md:hidden space-y-4">
            {schedule.events.map((event, index) => (
              <div
                key={index}
                className="p-5 rounded-xl"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                <div className="font-serif text-xl mb-1" style={{ color: "#6B705C" }}>
                  {event.time}
                </div>
                <h3 className="font-serif text-lg mb-2" style={{ color: "#1A1A1A", fontWeight: 400 }}>
                  {event.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                  {event.description}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: Timeline with alternating layout */}
          <div className="hidden md:block relative">
            {/* Timeline line */}
            <div 
              className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5"
              style={{ backgroundColor: "rgba(107, 112, 92, 0.3)" }}
            />

            {/* Timeline events */}
            <div className="space-y-12">
              {schedule.events.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4"
                    style={{ backgroundColor: "#6B705C", borderColor: "#A5A5A0" }}
                  />

                  {/* Content */}
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-16 text-right" : "pl-16"
                    }`}
                  >
                    <div className="p-6 rounded-lg" style={{ backgroundColor: "#F8F9FA" }}>
                      <div className="font-serif text-2xl mb-2" style={{ color: "#6B705C" }}>
                        {event.time}
                      </div>
                      <h3 className="font-serif text-xl mb-2" style={{ color: "#1A1A1A", fontWeight: 400 }}>
                        {event.title}
                      </h3>
                      <p style={{ color: "rgba(26, 26, 26, 0.6)" }}>{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Calendar */}
          <div className="text-center mt-10 md:mt-16">
            <AddToCalendar variant="primary" />
          </div>
        </Container>
      </section>

      {/* Venue Section - Sage background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#6B705C" }}>
        <Container>
          <div className="text-center mb-8 md:mb-12">
            <p 
              className="text-white/50 text-xs md:text-sm uppercase mb-3"
              style={{ letterSpacing: "0.2em" }}
            >
              Location
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white" style={{ fontWeight: 400 }}>
              The Venue
            </h2>
          </div>

          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
            {/* Venue Info */}
            <div>
              <h3 className="font-serif text-2xl text-white mb-6" style={{ fontWeight: 400 }}>
                {venue.name}
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-white/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-white/70">
                      {venue.address}
                      <br />
                      {venue.postalCode} {venue.city}
                      <br />
                      {venue.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="h-5 w-5 text-white/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Ceremony Begins</p>
                    <p className="text-white/70">
                      {date.timeDisplay} ({date.timezoneAbbr})
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GlobeAltIcon className="h-5 w-5 text-white/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Website</p>
                    <a
                      href={venue.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white underline underline-offset-4 transition-colors"
                    >
                      {venue.website.replace("https://", "")}
                    </a>
                  </div>
                </div>
              </div>

              <Button href={venue.googleMapsLink} variant="outline-white" external>
                Get Directions
              </Button>
            </div>

            {/* Map */}
            <VenueMap />
          </div>
        </Container>
      </section>

      {/* Dress Code Section - Gray background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#A5A5A0" }}>
        <Container size="content">
          <div className="text-center px-2">
            <p 
              className="text-xs md:text-sm uppercase mb-3"
              style={{ letterSpacing: "0.2em", color: "#6B705C" }}
            >
              What to Wear
            </p>
            <h2 
              className="font-serif text-3xl md:text-4xl mb-4 md:mb-6"
              style={{ fontWeight: 400, color: "#1A1A1A" }}
            >
              {dressCode.title}
            </h2>
            <p 
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-6 md:mb-8"
              style={{ color: "rgba(26, 26, 26, 0.7)" }}
            >
              {dressCode.description}
            </p>

            <div 
              className="inline-block px-6 py-3 md:px-8 md:py-4 rounded-full mb-6 md:mb-8"
              style={{ backgroundColor: "#6B705C" }}
            >
              <span className="font-serif text-xl md:text-2xl text-white">
                {dressCode.code}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button
                href={dressCode.inspiration.men.url}
                variant="secondary"
                external
                className="w-full sm:w-auto"
              >
                {dressCode.inspiration.men.label}
              </Button>
              <Button
                href={dressCode.inspiration.women.url}
                variant="secondary"
                external
                className="w-full sm:w-auto"
              >
                {dressCode.inspiration.women.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
