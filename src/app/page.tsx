import Image from "next/image";
import Link from "next/link";
import { weddingConfig } from "@/config/content";
import { SplitHero } from "@/components/SplitHero";
import { AddToCalendar } from "@/components/AddToCalendar";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  const { couple, date, venue, schedule } = weddingConfig;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex">
        {/* Left Panel - Sage Background with Content - 80px padding */}
        <div className="w-full lg:w-1/2 bg-sage-600 flex flex-col justify-center lg:justify-end p-12 md:p-16 lg:p-20 pt-28">
          {/* Date */}
          <p className="text-white text-sm tracking-widest uppercase mb-8" style={{ letterSpacing: "2px" }}>
            {date.full}
          </p>

          {/* Wedding Label */}
          <p className="text-white text-sm tracking-widest uppercase mb-4" style={{ letterSpacing: "2px" }}>
            The Wedding of
          </p>

          {/* Couple Names */}
          <div className="mb-10">
            <div className="font-serif text-display-md md:text-display-lg lg:text-display-xl text-white leading-tight w-fit" style={{ letterSpacing: "2px" }}>
              <div>{couple.person1}</div>
              <div className="text-center">&</div>
              <div>{couple.person2}</div>
            </div>
          </div>

          {/* Venue & Date Info */}
          <div className="space-y-3 mb-12">
            <div className="flex items-center gap-3 text-white">
              <MapPinIcon className="h-5 w-5 flex-shrink-0" />
              <span>{venue.name}, {venue.city}</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <ClockIcon className="h-5 w-5 flex-shrink-0" />
              <span>{date.full} at {date.timeDisplay}</span>
            </div>
          </div>

          {/* CTAs - Ghost Buttons */}
          <div className="flex flex-wrap gap-4">
            <AddToCalendar variant="outline-white" />
            <Button href="/rsvp" variant="outline-white">
              RSVP Now
            </Button>
          </div>
        </div>

        {/* Right Panel - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src="/images/hero-home.jpg"
            alt={`${couple.person1} and ${couple.person2}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Floating RSVP Button */}
        <Link
          href="/rsvp"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex
                     w-28 h-28 rounded-full border-2 border-white/40 bg-sage-600/90 backdrop-blur-sm
                     items-center justify-center text-white text-sm font-medium tracking-wider uppercase
                     hover:bg-sage-700 hover:border-white/60 transition-all duration-300 shadow-lg"
        >
          RSVP
        </Link>
      </section>

      {/* Venue Preview Section */}
      <section className="section bg-stone-50">
        <Container size="content">
          <div className="text-center">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-4">
              The Venue
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md text-stone-800 mb-6">
              {venue.name}
            </h2>
            <p className="text-stone-500 text-lg mb-8 max-w-xl mx-auto">
              {venue.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/schedule" variant="primary">
                View Schedule
              </Button>
              <Button href={venue.website} variant="secondary" external>
                Visit Venue Website
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Schedule Preview Section */}
      <section className="section bg-sage-50">
        <Container>
          <div className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-4">
              The Day
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md text-stone-800">
              {schedule.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {schedule.events.map((event, index) => (
              <div key={index} className="text-center">
                <div className="text-emerald-600 font-serif text-2xl mb-2">
                  {event.time}
                </div>
                <h3 className="font-serif text-xl text-stone-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-stone-500 text-sm">{event.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/schedule" variant="secondary">
              Full Schedule & Details
            </Button>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-sage-600 text-white text-center">
        <Container size="content">
          <h2 className="font-serif text-display-sm md:text-display-md text-white mb-6">
            We cannot wait to celebrate with you
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Please let us know if you can join us by {weddingConfig.rsvp.deadline}
          </p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <Button href="/rsvp" variant="outline-white" size="lg">
              RSVP Now
            </Button>
            <AddToCalendar variant="outline-white" size="lg" />
          </div>
        </Container>
      </section>
    </>
  );
}
