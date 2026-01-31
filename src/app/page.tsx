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
      {/* Hero Section - Mobile: Full image with overlay, Desktop: Split layout */}
      <section className="relative min-h-screen">
        {/* Mobile: Full-screen image background with parallax effect */}
        <div className="lg:hidden absolute inset-0">
          <div className="absolute inset-0 bg-fixed">
            <Image
              src="/images/hero-home.jpg"
              alt={`${couple.person1} and ${couple.person2}`}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-sage-900/90 via-sage-800/50 to-transparent" />
        </div>

        {/* Desktop: Split layout */}
        <div className="hidden lg:flex min-h-screen">
          {/* Left Panel - Sage Background */}
          <div className="w-1/2 bg-sage-600 flex flex-col justify-end p-20">
            <p className="text-white text-sm tracking-widest uppercase mb-4" style={{ letterSpacing: "2px" }}>
              The Wedding of
            </p>
            <div className="mb-10">
              <div className="font-serif text-display-lg xl:text-display-xl text-white leading-tight w-fit" style={{ letterSpacing: "2px" }}>
                <div>{couple.person1}</div>
                <div className="text-center">&</div>
                <div>{couple.person2}</div>
              </div>
            </div>
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
            <div className="flex flex-wrap gap-4">
              <AddToCalendar variant="outline-white" />
              <Button href="/rsvp" variant="outline-white">
                RSVP Now
              </Button>
            </div>
          </div>

          {/* Right Panel - Image */}
          <div className="w-1/2 relative">
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
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                       w-28 h-28 rounded-full border-2 border-white/40 bg-sage-600/90 backdrop-blur-sm
                       flex items-center justify-center text-white text-sm font-medium tracking-wider uppercase
                       hover:bg-sage-700 hover:border-white/60 transition-all duration-300 shadow-lg"
          >
            RSVP
          </Link>
        </div>

        {/* Mobile: Content overlay at bottom */}
        <div className="lg:hidden relative min-h-screen flex flex-col justify-end p-6 pb-12 pt-24">
          <div className="text-center">
            <p className="text-white/80 text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "3px" }}>
              The Wedding of
            </p>
            <div className="mb-8">
              <div className="font-serif text-display-md text-white leading-tight" style={{ letterSpacing: "2px" }}>
                <div>{couple.person1}</div>
                <div>&</div>
                <div>{couple.person2}</div>
              </div>
            </div>
            <div className="space-y-2 mb-8 text-white/90 text-sm">
              <div className="flex items-center justify-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>{venue.name}, {venue.city}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span>{date.full}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/rsvp" variant="outline-white" size="lg" className="w-full sm:w-auto">
                RSVP Now
              </Button>
              <AddToCalendar variant="outline-white" size="lg" />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/60 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Venue Preview Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-stone-50">
        <Container size="content">
          <div className="text-center px-2">
            <p className="text-emerald-600 text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4">
              The Venue
            </p>
            <h2 className="font-serif text-2xl md:text-display-sm lg:text-display-md text-stone-800 mb-4 md:mb-6">
              {venue.name}
            </h2>
            <p className="text-stone-500 text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed">
              {venue.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button href="/schedule" variant="primary" className="w-full sm:w-auto">
                View Schedule
              </Button>
              <Button href={venue.website} variant="secondary" external className="w-full sm:w-auto">
                Visit Venue Website
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Schedule Preview Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-sage-50">
        <Container>
          <div className="text-center mb-8 md:mb-12 px-2">
            <p className="text-emerald-600 text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4">
              The Day
            </p>
            <h2 className="font-serif text-2xl md:text-display-sm lg:text-display-md text-stone-800">
              {schedule.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            {schedule.events.map((event, index) => (
              <div key={index} className="text-center p-3 md:p-0">
                <div className="text-emerald-600 font-serif text-lg md:text-2xl mb-1 md:mb-2">
                  {event.time}
                </div>
                <h3 className="font-serif text-base md:text-xl text-stone-800 mb-1 md:mb-2">
                  {event.title}
                </h3>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button href="/schedule" variant="secondary" className="w-full sm:w-auto">
              Full Schedule & Details
            </Button>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-sage-600 text-white text-center">
        <Container size="content">
          <h2 className="font-serif text-2xl md:text-display-sm lg:text-display-md text-white mb-4 md:mb-6 px-2">
            We cannot wait to celebrate with you
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto px-2 leading-relaxed">
            Please let us know if you can join us by {weddingConfig.rsvp.deadline}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button href="/rsvp" variant="outline-white" size="lg" className="w-full sm:w-auto">
              RSVP Now
            </Button>
            <AddToCalendar variant="outline-white" size="lg" />
          </div>
        </Container>
      </section>
    </>
  );
}
