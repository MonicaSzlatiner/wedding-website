import Image from "next/image";
import { weddingConfig } from "@/config/content";
import { hotels, accommodationsContent } from "@/config/hotels";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedHero } from "@/components/AnimatedHero";
import { VenueMap } from "@/components/VenueMap";
import { AddToCalendar } from "@/components/AddToCalendar";
import { HotelCard } from "@/components/HotelCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import {
  MapPinIcon,
  GlobeAltIcon,
  ClockIcon,
  PaperAirplaneIcon,
  TruckIcon,
  GiftIcon,
  HeartIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

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

export default function HomePage() {
  const { couple, date, venue, schedule, travel, gifts, rsvp, faq, dressCode } = weddingConfig;

  return (
    <>
      {/* ============================================
          HOME / HERO SECTION
          ============================================ */}
      <section id="home">
        <AnimatedHero couple={couple} date={date} venue={venue} />
      </section>

      {/* ============================================
          SCHEDULE SECTION
          ============================================ */}
      <section id="schedule" className="scroll-mt-20">
        {/* Schedule Header - Framed with cream border */}
        <div className="p-3 sm:p-4 lg:p-5 xl:p-6" style={{ backgroundColor: "#E8E6E1" }}>
          <div className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: "#6B705C" }}>
            <Container size="content">
              <FadeIn className="text-center px-2">
                <p 
                  className="text-white/50 text-xs md:text-sm uppercase mb-3 md:mb-4"
                  style={{ letterSpacing: "0.2em" }}
                >
                  {date.full}
                </p>
                <h2 
                  className="font-serif text-4xl md:text-6xl text-white mb-4 md:mb-6"
                  style={{ fontWeight: 400 }}
                >
                  {schedule.title}
                </h2>
                <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                  {schedule.subtitle}
                </p>
              </FadeIn>
            </Container>
          </div>
        </div>

        {/* Timeline - Cream background */}
        <div className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
          <Container size="content">
            {/* Mobile: Simple stacked cards */}
            <div className="md:hidden space-y-4">
              {schedule.events.map((event, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="p-5 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
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
                </FadeIn>
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
                  <FadeIn key={index} delay={index * 0.1}>
                    <div
                      className={`relative flex items-start gap-8 ${
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div 
                        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4"
                        style={{ backgroundColor: "#6B705C", borderColor: "#E8E6E1" }}
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
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Add to Calendar */}
            <FadeIn delay={0.3} className="text-center mt-10 md:mt-16">
              <AddToCalendar variant="primary" />
            </FadeIn>
          </Container>
        </div>

        {/* Venue Section */}
        {/* Venue Image Header */}
        <div className="p-3 sm:p-4 lg:p-5 xl:p-6" style={{ backgroundColor: "#E8E6E1" }}>
          <FadeIn>
            <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
              <Image
                src="/images/venue.jpg"
                alt={venue.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* Overlay with venue name */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
                <p 
                  className="text-white/70 text-xs md:text-sm uppercase mb-2 md:mb-3"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Location
                </p>
                <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white" style={{ fontWeight: 400 }}>
                  {venue.name}
                </h3>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Venue Details - Sage background */}
        <div className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#6B705C" }}>
          <Container>
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
              {/* Venue Info */}
              <FadeIn>
                <div>
                  {/* Venue tagline */}
                  <p className="text-white/80 italic font-serif text-lg mb-6">
                    Michelin-starred dining with views of the Maas
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="h-5 w-5 text-white/60 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">Address</p>
                        <p className="text-white/70">
                          {venue.address}<br />
                          {venue.postalCode} {venue.city}<br />
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
              </FadeIn>

              {/* Map */}
              <FadeIn delay={0.2}>
                <VenueMap />
              </FadeIn>
            </div>
          </Container>
        </div>

        {/* Dress Code Section - Cream background */}
        <div className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
          <Container size="content">
            <FadeIn className="text-center px-2">
              <p 
                className="text-xs md:text-sm uppercase mb-3"
                style={{ letterSpacing: "0.2em", color: "#6B705C" }}
              >
                What to Wear
              </p>
              <h3 
                className="font-serif text-3xl md:text-4xl mb-4 md:mb-6"
                style={{ fontWeight: 400, color: "#1A1A1A" }}
              >
                {dressCode.title}
              </h3>
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

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Button href={dressCode.inspiration.men.url} variant="secondary" external>
                  Men&apos;s Inspiration
                </Button>
                <Button href={dressCode.inspiration.women.url} variant="secondary" external>
                  Women&apos;s Inspiration
                </Button>
              </div>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* ============================================
          TRAVEL SECTION
          ============================================ */}
      <section id="travel" className="scroll-mt-20">
        {/* Travel Hero - Split layout with image */}
        <div className="relative">
          {/* Mobile: Stacked with frame */}
          <div className="lg:hidden p-3 sm:p-4 min-h-[80vh]" style={{ backgroundColor: "#E8E6E1" }}>
            <div className="min-h-[calc(80vh-24px)] sm:min-h-[calc(80vh-32px)] flex flex-col" style={{ backgroundColor: "#6B705C" }}>
              {/* Image */}
              <div className="relative h-[40vh]">
                <Image
                  src="/images/hero-travel.jpg"
                  alt="Laurens and Monica in New York City"
                  fill
                  className="object-cover object-center"
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
                <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight mb-4" style={{ fontWeight: 400 }}>
                  {travel.title}
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-sm">
                  {travel.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Framed split layout */}
          <div className="hidden lg:block p-5 xl:p-6" style={{ backgroundColor: "#E8E6E1" }}>
            <div className="flex min-h-[70vh]">
              {/* Left Panel */}
              <div 
                className="w-1/2 flex flex-col justify-end p-10 xl:p-14"
                style={{ backgroundColor: "#6B705C" }}
              >
                <p 
                  className="text-white/50 text-xs xl:text-sm uppercase mb-6"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Getting There
                </p>
                <h2 
                  className="font-serif text-5xl xl:text-6xl text-white leading-[1.05] mb-6"
                  style={{ fontWeight: 400 }}
                >
                  {travel.title}
                </h2>
                <p className="text-white/60 text-base xl:text-lg max-w-md leading-relaxed">
                  {travel.subtitle}
                </p>
              </div>
              {/* Right Panel - Image */}
              <div className="w-1/2 relative min-h-[70vh]">
                <Image
                  src="/images/hero-travel.jpg"
                  alt="Laurens and Monica in New York City"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Options - Cream background */}
        <div className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
          <Container>
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* By Air */}
              <FadeIn>
                <div className="p-5 md:p-8 rounded-xl h-full" style={{ backgroundColor: "#F8F9FA" }}>
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
              </FadeIn>

              {/* By Train */}
              <FadeIn delay={0.1}>
                <div className="p-5 md:p-8 rounded-xl h-full" style={{ backgroundColor: "#F8F9FA" }}>
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
              </FadeIn>

              {/* By Car */}
              <FadeIn delay={0.2}>
                <div className="p-5 md:p-8 rounded-xl h-full" style={{ backgroundColor: "#F8F9FA" }}>
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
              </FadeIn>
            </div>

            {/* Directions Button */}
            <FadeIn delay={0.3} className="text-center mt-8 md:mt-12">
              <Button href={venue.googleMapsLink} variant="primary" external>
                Get Directions to Venue
              </Button>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* ============================================
          STAY / ACCOMMODATIONS SECTION
          ============================================ */}
      <section id="stay" className="scroll-mt-20">
        {/* Stay Hero - Split layout with image */}
        <div className="relative">
          {/* Mobile: Stacked with frame */}
          <div className="lg:hidden p-3 sm:p-4 min-h-[80vh]" style={{ backgroundColor: "#E8E6E1" }}>
            <div className="min-h-[calc(80vh-24px)] sm:min-h-[calc(80vh-32px)] flex flex-col" style={{ backgroundColor: "#6B705C" }}>
              {/* Image */}
              <div className="relative h-[40vh]">
                <Image
                  src="/images/dogs.jpg"
                  alt="Our furry friends waiting to welcome you"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col justify-end p-6 sm:p-8">
                <p 
                  className="text-white/50 text-xs uppercase mb-4"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Plan Your Stay
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight mb-4" style={{ fontWeight: 400 }}>
                  {accommodationsContent.title}
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-sm">
                  {accommodationsContent.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Framed split layout */}
          <div className="hidden lg:block p-5 xl:p-6" style={{ backgroundColor: "#E8E6E1" }}>
            <div className="flex min-h-[70vh]">
              {/* Left Panel */}
              <div 
                className="w-1/2 flex flex-col justify-end p-10 xl:p-14"
                style={{ backgroundColor: "#6B705C" }}
              >
                <p 
                  className="text-white/50 text-xs xl:text-sm uppercase mb-6"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Plan Your Stay
                </p>
                <h2 
                  className="font-serif text-5xl xl:text-6xl text-white leading-[1.05] mb-6"
                  style={{ fontWeight: 400 }}
                >
                  {accommodationsContent.title}
                </h2>
                <p className="text-white/60 text-base xl:text-lg max-w-md leading-relaxed">
                  {accommodationsContent.subtitle}
                </p>
              </div>
              {/* Right Panel - Image */}
              <div className="w-1/2 relative min-h-[70vh]">
                <Image
                  src="/images/dogs.jpg"
                  alt="Our furry friends waiting to welcome you"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hotels List - Cream background */}
        <div className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
          <Container>
            <FadeIn className="mb-8 md:mb-12">
              <p 
                className="text-xs md:text-sm uppercase mb-3"
                style={{ letterSpacing: "0.2em", color: "#6B705C" }}
              >
                Our Picks
              </p>
              <h3 
                className="font-serif text-3xl md:text-4xl"
                style={{ fontWeight: 400, color: "#1A1A1A" }}
              >
                Recommended Hotels
              </h3>
            </FadeIn>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hotels.map((hotel, index) => (
                <FadeIn key={hotel.id} delay={index * 0.1}>
                  <HotelCard hotel={hotel} />
                </FadeIn>
              ))}
            </div>
          </Container>
        </div>

        {/* Other Options - Sage background */}
        <div className="py-12 md:py-16" style={{ backgroundColor: "#6B705C" }}>
          <Container size="content">
            <FadeIn className="text-center px-2">
              <h3 className="font-serif text-xl md:text-2xl text-white mb-3 md:mb-4" style={{ fontWeight: 400 }}>
                {accommodationsContent.otherOptions.title}
              </h3>
              <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                {accommodationsContent.otherOptions.description}
              </p>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* ============================================
          GIFTS SECTION
          ============================================ */}
      <section id="gifts" className="scroll-mt-20">
        {/* Gifts Hero - Split layout with image */}
        <div className="relative">
          {/* Mobile: Stacked with frame */}
          <div className="lg:hidden p-3 sm:p-4 min-h-[80vh]" style={{ backgroundColor: "#E8E6E1" }}>
            <div className="min-h-[calc(80vh-24px)] sm:min-h-[calc(80vh-32px)] flex flex-col" style={{ backgroundColor: "#6B705C" }}>
              {/* Image */}
              <div className="relative h-[40vh]">
                <Image
                  src="/images/hero-gifts.jpg"
                  alt="Laurens and Monica"
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                />
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col justify-end p-6 sm:p-8">
                <p 
                  className="text-white/50 text-xs uppercase mb-4"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Celebrate With Us
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight mb-4" style={{ fontWeight: 400 }}>
                  {gifts.title}
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-sm">
                  {gifts.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Framed split layout */}
          <div className="hidden lg:block p-5 xl:p-6" style={{ backgroundColor: "#E8E6E1" }}>
            <div className="flex min-h-[70vh]">
              {/* Left Panel */}
              <div 
                className="w-1/2 flex flex-col justify-end p-10 xl:p-14"
                style={{ backgroundColor: "#6B705C" }}
              >
                <p 
                  className="text-white/50 text-xs xl:text-sm uppercase mb-6"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Celebrate With Us
                </p>
                <h2 
                  className="font-serif text-5xl xl:text-6xl text-white leading-[1.05] mb-6"
                  style={{ fontWeight: 400 }}
                >
                  {gifts.title}
                </h2>
                <p className="text-white/60 text-base xl:text-lg max-w-md leading-relaxed">
                  {gifts.subtitle}
                </p>
              </div>
              {/* Right Panel - Image */}
              <div className="w-1/2 relative min-h-[70vh]">
                <Image
                  src="/images/hero-gifts.jpg"
                  alt="Laurens and Monica"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Honeymoon Fund - Cream background */}
        <div className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
          <Container size="content">
            <FadeIn className="text-center max-w-2xl mx-auto px-2">
              {/* Heart Icon */}
              <div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
                style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}
              >
                <HeartIcon className="h-7 w-7 md:h-8 md:w-8" style={{ color: "#6B705C" }} />
              </div>

              {/* Message */}
              <p className="text-base md:text-lg leading-relaxed mb-8 md:mb-12" style={{ color: "rgba(26, 26, 26, 0.7)" }}>
                {gifts.message}
              </p>

              {/* Honeymoon Fund Card */}
              <div className="rounded-2xl shadow-lg overflow-hidden" style={{ backgroundColor: "#F8F9FA" }}>
                <div className="p-5 md:p-8 border-b" style={{ backgroundColor: "rgba(107, 112, 92, 0.1)", borderColor: "rgba(107, 112, 92, 0.2)" }}>
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
                    style={{ backgroundColor: "#6B705C" }}
                  >
                    <GiftIcon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl mb-2" style={{ color: "#1A1A1A", fontWeight: 400 }}>
                    {gifts.fund.name}
                  </h3>
                  <p style={{ color: "rgba(26, 26, 26, 0.6)" }} className="text-sm md:text-base">
                    {gifts.fund.description}
                  </p>
                </div>

                <div className="p-5 md:p-8">
                  {gifts.fund.enabled ? (
                    <>
                      <p className="text-sm md:text-base mb-5 md:mb-6" style={{ color: "rgba(26, 26, 26, 0.7)" }}>
                        Click below to contribute to our honeymoon adventure.
                        Every gift, no matter the size, means the world to us.
                      </p>
                      <Button href={gifts.fund.stripeLink} variant="primary" size="lg" external>
                        Contribute to Our Honeymoon
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-2 md:py-4">
                      <p className="text-sm md:text-base mb-3 md:mb-4" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                        Our honeymoon fund will be available soon.
                      </p>
                      <div 
                        className="inline-block px-4 py-2 rounded-full text-sm"
                        style={{ backgroundColor: "rgba(107, 112, 92, 0.15)", color: "#6B705C" }}
                      >
                        Coming Soon
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Note */}
              <div className="mt-8 md:mt-12 p-5 md:p-6 rounded-xl" style={{ backgroundColor: "rgba(107, 112, 92, 0.1)" }}>
                <p className="italic text-sm md:text-base leading-relaxed" style={{ color: "rgba(26, 26, 26, 0.7)" }}>
                  Your presence at our wedding is the greatest gift of all. We are
                  so grateful to have you in our lives and cannot wait to celebrate
                  with you.
                </p>
                <p className="font-serif text-base md:text-lg mt-3 md:mt-4" style={{ color: "#1A1A1A" }}>
                  With love, {couple.person1} & {couple.person2}
                </p>
              </div>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* ============================================
          RSVP SECTION
          ============================================ */}
      <section id="rsvp" className="scroll-mt-20">
        {/* RSVP Header - Sage background */}
        <div className="py-16 md:py-24" style={{ backgroundColor: "#6B705C" }}>
          <Container size="content">
            <FadeIn className="text-center px-2">
              <p 
                className="text-white/50 text-xs md:text-sm uppercase mb-3 md:mb-4"
                style={{ letterSpacing: "0.2em" }}
              >
                You are Invited
              </p>
              <h2 
                className="font-serif text-4xl md:text-6xl text-white mb-4 md:mb-6"
                style={{ fontWeight: 400 }}
              >
                {rsvp.title}
              </h2>
            </FadeIn>
          </Container>
        </div>

        {/* Coming Soon - Cream background */}
        <div className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
          <Container size="content">
            <FadeIn className="text-center max-w-xl mx-auto py-8 md:py-16 px-2">
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
                style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}
              >
                <EnvelopeIcon className="h-8 w-8 md:h-10 md:w-10" style={{ color: "#6B705C" }} />
              </div>
              <h3 
                className="font-serif text-2xl md:text-3xl mb-3 md:mb-4"
                style={{ color: "#1A1A1A", fontWeight: 400 }}
              >
                Coming Soon
              </h3>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                Our RSVP form will be available shortly. Check back soon!
              </p>
              <p 
                className="font-sans text-sm uppercase"
                style={{ letterSpacing: "0.1em", color: "rgba(26, 26, 26, 0.5)" }}
              >
                Please respond by {rsvp.deadline}
              </p>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* ============================================
          FAQ SECTION
          ============================================ */}
      <section id="faq" className="scroll-mt-20">
        {/* FAQ Header - Sage background */}
        <div className="py-12 md:py-16" style={{ backgroundColor: "#6B705C" }}>
          <Container size="content">
            <FadeIn className="text-center px-2">
              <p 
                className="text-white/50 text-xs md:text-sm uppercase mb-3 md:mb-4"
                style={{ letterSpacing: "0.2em" }}
              >
                Got Questions?
              </p>
              <h2 
                className="font-serif text-4xl md:text-6xl text-white mb-4 md:mb-6"
                style={{ fontWeight: 400 }}
              >
                {faq.title}
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                {faq.subtitle}
              </p>
            </FadeIn>
          </Container>
        </div>

        {/* FAQ Content - Cream background */}
        <div className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
          <Container size="content">
            <FadeIn>
              <FAQAccordion items={faq.items} />
            </FadeIn>

            {/* Additional Help */}
            <FadeIn delay={0.2} className="mt-10 md:mt-16 text-center">
              <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}>
                <h3 
                  className="font-serif text-lg md:text-xl mb-2 md:mb-3"
                  style={{ color: "#1A1A1A", fontWeight: 400 }}
                >
                  Still have questions?
                </h3>
                <p className="text-sm md:text-base" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                  Feel free to reach out to us directly. We are happy to help!
                </p>
              </div>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* ============================================
          FINAL CTA SECTION
          ============================================ */}
      <section className="py-16 md:py-24 text-center" style={{ backgroundColor: "#6B705C" }}>
        <Container size="content">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 md:mb-6 px-2" style={{ fontWeight: 400 }}>
              We cannot wait to celebrate with you
            </h2>
            <p 
              className="font-sans text-sm md:text-base mb-8 md:mb-10 max-w-xl mx-auto px-2 leading-relaxed uppercase text-white/60"
              style={{ letterSpacing: "0.1em" }}
            >
              {date.full} • {venue.name}, {venue.city}
            </p>
            <AddToCalendar variant="outline-white" />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
