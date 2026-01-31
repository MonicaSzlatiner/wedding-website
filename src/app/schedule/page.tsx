import { Metadata } from "next";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <section className="pt-32 pb-16 bg-sage-600 text-white">
        <Container size="content">
          <div className="text-center">
            <p className="text-white/70 text-sm tracking-widest uppercase mb-4">
              {date.full}
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg text-white mb-6">
              {schedule.title}
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              {schedule.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="section">
        <Container size="content">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-sage-200" />

            {/* Timeline events */}
            <div className="space-y-12">
              {schedule.events.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-sage-600 border-4 border-white shadow" />

                  {/* Content */}
                  <div
                    className={`ml-8 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                      <div className="text-emerald-600 font-serif text-2xl mb-2">
                        {event.time}
                      </div>
                      <h3 className="font-serif text-xl text-stone-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-stone-500">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Calendar */}
          <div className="text-center mt-16">
            <AddToCalendar variant="primary" />
          </div>
        </Container>
      </section>

      {/* Venue Section */}
      <section className="section bg-stone-100">
        <Container>
          <SectionHeading title="The Venue" subtitle={venue.description} />

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Venue Info */}
            <div>
              <h3 className="font-serif text-2xl text-stone-800 mb-6">
                {venue.name}
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-stone-800 font-medium">Address</p>
                    <p className="text-stone-500">
                      {venue.address}
                      <br />
                      {venue.postalCode} {venue.city}
                      <br />
                      {venue.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-stone-800 font-medium">Ceremony Begins</p>
                    <p className="text-stone-500">
                      {date.timeDisplay} ({date.timezoneAbbr})
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GlobeAltIcon className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-stone-800 font-medium">Website</p>
                    <a
                      href={venue.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 link-underline"
                    >
                      {venue.website.replace("https://", "")}
                    </a>
                  </div>
                </div>
              </div>

              <Button href={venue.googleMapsLink} variant="secondary" external>
                Get Directions
              </Button>
            </div>

            {/* Map */}
            <VenueMap />
          </div>
        </Container>
      </section>

      {/* Dress Code Section */}
      <section className="section">
        <Container size="content">
          <div className="text-center">
            <SectionHeading
              title={dressCode.title}
              subtitle={dressCode.description}
            />

            <div className="inline-block bg-sage-100 px-8 py-4 rounded-full mb-8">
              <span className="font-serif text-2xl text-sage-700">
                {dressCode.code}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href={dressCode.inspiration.men.url}
                variant="secondary"
                external
              >
                {dressCode.inspiration.men.label}
              </Button>
              <Button
                href={dressCode.inspiration.women.url}
                variant="secondary"
                external
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
