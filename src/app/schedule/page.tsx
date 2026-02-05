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
      {/* Hero Section */}
      <section 
        className="pt-24 pb-16 md:pt-32 md:pb-20" 
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <Container size="content">
          <div className="text-center px-2">
            <p 
              className="text-[10px] uppercase font-bold mb-4"
              style={{ letterSpacing: "0.3em", color: "#C37B60" }}
            >
              {date.full}
            </p>
            <h1 
              className="font-serif text-4xl md:text-6xl italic mb-4 md:mb-6"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              {schedule.title}
            </h1>
            <p 
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
            >
              {schedule.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          {/* Event Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {schedule.events.map((event, index) => (
              <div
                key={index}
                className="text-center py-8 px-4 border-t"
                style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}
              >
                <p 
                  className="text-[10px] uppercase font-bold mb-4"
                  style={{ letterSpacing: "0.3em", color: "#C37B60" }}
                >
                  {event.time}
                </p>
                <h3 
                  className="font-serif text-xl md:text-2xl italic mb-3"
                  style={{ fontWeight: 400, color: "#2D2926" }}
                >
                  {event.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
                  {event.description}
                </p>
              </div>
            ))}
          </div>

          {/* Add to Calendar */}
          <div className="text-center mt-10 md:mt-16">
            <AddToCalendar variant="secondary" />
          </div>
        </Container>
      </section>

      {/* Venue Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#2D2926" }}>
        <Container>
          <div className="text-center mb-12 md:mb-16">
            <p 
              className="text-[10px] uppercase font-bold mb-4"
              style={{ letterSpacing: "0.3em", color: "rgba(245, 245, 240, 0.4)" }}
            >
              Location
            </p>
            <h2 
              className="font-serif text-3xl md:text-4xl italic text-white" 
              style={{ fontWeight: 400 }}
            >
              The Venue
            </h2>
          </div>

          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-start">
            {/* Venue Info */}
            <div>
              <h3 
                className="font-serif text-2xl md:text-3xl italic text-white mb-6" 
                style={{ fontWeight: 400 }}
              >
                {venue.name}
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/70 text-sm">
                      {venue.address}
                      <br />
                      {venue.postalCode} {venue.city}
                      <br />
                      {venue.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="h-5 w-5 text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/70 text-sm">
                      {date.timeDisplay} ({date.timezoneAbbr})
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GlobeAltIcon className="h-5 w-5 text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <a
                      href={venue.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:opacity-70 transition-opacity"
                      style={{ color: "#C37B60" }}
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

      {/* Dress Code Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <div className="text-center px-2">
            <p 
              className="text-[10px] uppercase font-bold mb-4"
              style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
            >
              What to Wear
            </p>
            <h2 
              className="font-serif text-3xl md:text-4xl italic mb-6"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              {dressCode.title}
            </h2>
            
            <div 
              className="inline-block px-6 py-3 rounded-full mb-6"
              style={{ backgroundColor: "rgba(195, 123, 96, 0.2)" }}
            >
              <span 
                className="font-serif text-xl italic"
                style={{ color: "#C37B60" }}
              >
                {dressCode.code}
              </span>
            </div>

            <p 
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
            >
              {dressCode.description}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <Button
                href={dressCode.inspiration.men.url}
                variant="secondary"
                external
              >
                Men&apos;s Inspiration
              </Button>
              <Button
                href={dressCode.inspiration.women.url}
                variant="secondary"
                external
              >
                Women&apos;s Inspiration
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
