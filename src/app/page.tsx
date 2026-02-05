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

// Material-style wine icon
function WineIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 2h6l1.5 8.5a4.5 4.5 0 01-9 0L9 2zM12 14v7m-3 0h6" />
    </svg>
  );
}

// Church/ceremony icon
function CeremonyIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 0l4 3v13H8V9l4-3zm-4 6H4v12h4m8-12h4v12h-4" />
    </svg>
  );
}

// Restaurant/dining icon
function DiningIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9m0 0c-2 0-4 1-4 3v6h8v-6c0-2-2-3-4-3zM3 6c0 3 1.5 5 3 5v10h1V3C5.5 3 3 4.5 3 6z" />
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
      <AnimatedHero couple={couple} date={date} venue={venue} />

      {/* ============================================
          SCHEDULE SECTION - 3 Column Grid
          ============================================ */}
      <section id="schedule" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <Container>
          {/* Section Header */}
          <FadeIn className="text-center mb-16 md:mb-20">
            <p 
              className="text-[10px] uppercase font-bold mb-4"
              style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
            >
              The Celebration
            </p>
            <h2 
              className="font-serif text-4xl md:text-6xl italic mb-4"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              {schedule.title}
            </h2>
            <div className="divider-thin mx-auto mt-6" />
          </FadeIn>

          {/* Date highlight */}
          <FadeIn delay={0.1} className="text-center mb-12 md:mb-16">
            <p 
              className="font-serif text-2xl md:text-3xl italic"
              style={{ color: "#C37B60" }}
            >
              {date.full}
            </p>
          </FadeIn>

          {/* Event Grid - 3 columns on desktop */}
          <div className="grid gap-8 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {schedule.events.map((event, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center py-8 px-4 border-t" style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}>
                  {/* Time */}
                  <p 
                    className="text-[10px] uppercase font-bold mb-4"
                    style={{ letterSpacing: "0.3em", color: "#C37B60" }}
                  >
                    {event.time}
                  </p>
                  {/* Title */}
                  <h3 
                    className="font-serif text-xl md:text-2xl italic mb-3"
                    style={{ fontWeight: 400, color: "#2D2926" }}
                  >
                    {event.title}
                  </h3>
                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
                    {event.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Add to Calendar */}
          <FadeIn delay={0.4} className="text-center mt-12 md:mt-16">
            <AddToCalendar variant="secondary" />
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          VENUE / DESTINATION SECTION
          ============================================ */}
      <section id="venue" className="scroll-mt-20" style={{ backgroundColor: "#F5F5F0" }}>
        {/* Venue Hero - 2 column layout */}
        <div className="px-6 xl:px-12 2xl:px-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 md:py-24">
            {/* Left - Text Content */}
            <FadeIn>
              <div className="max-w-lg">
                <p 
                  className="text-[10px] uppercase font-bold mb-4"
                  style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
                >
                  <MapPinIcon className="h-4 w-4 inline mr-2" />
                  Location
                </p>
                <h2 
                  className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6"
                  style={{ fontWeight: 400, color: "#2D2926" }}
                >
                  {venue.name}
                </h2>
                <p 
                  className="font-serif text-lg md:text-xl italic mb-8 leading-relaxed"
                  style={{ color: "rgba(45, 41, 38, 0.7)" }}
                >
                  A Michelin-starred restaurant tucked into Het Park, right on the river. We fell in love with the view and stayed for the food.
                </p>
                
                {/* Venue Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "#C37B60" }} />
                    <div>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(45, 41, 38, 0.7)" }}>
                        {venue.address}, {venue.postalCode} {venue.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ClockIcon className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "#C37B60" }} />
                    <div>
                      <p className="text-sm" style={{ color: "rgba(45, 41, 38, 0.7)" }}>
                        {date.timeDisplay} ({date.timezoneAbbr})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GlobeAltIcon className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "#C37B60" }} />
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

                <Button href={venue.googleMapsLink} variant="primary" external>
                  View Travel Guide
                </Button>
              </div>
            </FadeIn>

            {/* Right - Image with grayscale hover */}
            <FadeIn delay={0.2}>
              <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
                <Image
                  src="/images/venue.jpg"
                  alt={venue.name}
                  fill
                  className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Map Section */}
        <div className="px-6 pb-16 md:pb-24">
          <Container>
            <FadeIn>
              <VenueMap />
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* ============================================
          DRESS CODE SECTION - Dark Espresso Background
          ============================================ */}
      <section id="dresscode" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: "#2D2926" }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <FadeIn>
              <div>
                <p 
                  className="text-[10px] uppercase font-bold mb-4"
                  style={{ letterSpacing: "0.3em", color: "rgba(245, 245, 240, 0.4)" }}
                >
                  What to Wear
                </p>
                <h2 
                  className="font-serif text-4xl md:text-5xl italic mb-6"
                  style={{ fontWeight: 400, color: "#F5F5F0" }}
                >
                  Our Aesthetic
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
                  className="text-base md:text-lg mb-8 leading-relaxed"
                  style={{ color: "rgba(245, 245, 240, 0.7)" }}
                >
                  {dressCode.description}
                </p>

                {/* Separate guidance for men/women */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span 
                      className="text-[10px] uppercase font-bold"
                      style={{ letterSpacing: "0.2em", color: "#C37B60" }}
                    >
                      For Him
                    </span>
                    <a
                      href={dressCode.inspiration.men.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:opacity-70 transition-opacity"
                      style={{ color: "rgba(245, 245, 240, 0.7)" }}
                    >
                      View inspiration →
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <span 
                      className="text-[10px] uppercase font-bold"
                      style={{ letterSpacing: "0.2em", color: "#C37B60" }}
                    >
                      For Her
                    </span>
                    <a
                      href={dressCode.inspiration.women.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:opacity-70 transition-opacity"
                      style={{ color: "rgba(245, 245, 240, 0.7)" }}
                    >
                      View inspiration →
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right - Staggered images placeholder */}
            <FadeIn delay={0.2}>
              <div className="relative h-[50vh] lg:h-[60vh] flex items-center justify-center">
                <div 
                  className="w-48 h-64 md:w-56 md:h-80 rounded-lg absolute top-0 left-4 lg:left-0 shadow-2xl overflow-hidden"
                  style={{ backgroundColor: "rgba(195, 123, 96, 0.2)" }}
                >
                  <Image
                    src="/images/hero-home.jpg"
                    alt="Dress code inspiration"
                    fill
                    className="object-cover opacity-80"
                    sizes="224px"
                  />
                </div>
                <div 
                  className="w-48 h-64 md:w-56 md:h-80 rounded-lg absolute bottom-0 right-4 lg:right-0 shadow-2xl overflow-hidden"
                  style={{ backgroundColor: "rgba(195, 123, 96, 0.3)" }}
                >
                  <Image
                    src="/images/hero-gifts.jpg"
                    alt="Dress code inspiration"
                    fill
                    className="object-cover opacity-80"
                    sizes="224px"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================
          TRAVEL SECTION
          ============================================ */}
      <section id="travel" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <Container>
          {/* Section Header */}
          <FadeIn className="text-center mb-16 md:mb-20">
            <p 
              className="text-[10px] uppercase font-bold mb-4"
              style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
            >
              Getting There
            </p>
            <h2 
              className="font-serif text-4xl md:text-6xl italic mb-4"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              {travel.title}
            </h2>
            <p 
              className="font-serif text-lg md:text-xl italic max-w-xl mx-auto"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
            >
              {travel.subtitle}
            </p>
          </FadeIn>

          {/* Transportation Options */}
          <div className="grid gap-8 md:gap-6 md:grid-cols-3">
            {/* By Air */}
            <FadeIn>
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
                            className="ml-2 text-[10px] uppercase px-2 py-0.5"
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
            </FadeIn>

            {/* By Train */}
            <FadeIn delay={0.1}>
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
            </FadeIn>

            {/* By Car */}
            <FadeIn delay={0.2}>
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
            </FadeIn>
          </div>

          {/* Directions Button */}
          <FadeIn delay={0.3} className="text-center mt-12">
            <Button href={venue.googleMapsLink} variant="secondary" external>
              Get Directions
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          ACCOMMODATIONS SECTION
          ============================================ */}
      <section id="stay" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <Container>
          {/* Section Header with Image */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-20">
            <FadeIn>
              <div>
                <p 
                  className="text-[10px] uppercase font-bold mb-4"
                  style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
                >
                  Plan Your Stay
                </p>
                <h2 
                  className="font-serif text-4xl md:text-5xl italic mb-6"
                  style={{ fontWeight: 400, color: "#2D2926" }}
                >
                  {accommodationsContent.title}
                </h2>
                <p 
                  className="font-serif text-lg md:text-xl italic leading-relaxed"
                  style={{ color: "rgba(45, 41, 38, 0.6)" }}
                >
                  {accommodationsContent.subtitle}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
                <Image
                  src="/images/dogs.jpg"
                  alt="Our welcome committee. They won&apos;t be at the wedding, but they wanted to say hi."
                  fill
                  className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>

          {/* Hotels Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel, index) => (
              <FadeIn key={hotel.id} delay={index * 0.1}>
                <HotelCard hotel={hotel} />
              </FadeIn>
            ))}
          </div>

          {/* Other Options */}
          <FadeIn delay={0.3} className="mt-12 text-center">
            <p className="text-sm" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
              {accommodationsContent.otherOptions.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          GIFTS SECTION
          ============================================ */}
      <section id="gifts" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <FadeIn className="text-center">
            {/* Icon */}
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ backgroundColor: "rgba(195, 123, 96, 0.1)" }}
            >
              <GiftIcon className="h-10 w-10" style={{ color: "#C37B60" }} />
            </div>

            {/* Heading */}
            <h2 
              className="font-serif text-4xl md:text-5xl italic mb-6"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              Your Presence is Enough
            </h2>

            <p 
              className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(45, 41, 38, 0.7)" }}
            >
              {gifts.message}
            </p>

            {/* Honeymoon Fund Card */}
            <div 
              className="rounded-lg p-8 md:p-10 mb-8 max-w-lg mx-auto"
              style={{ backgroundColor: "rgba(45, 41, 38, 0.03)", border: "1px solid rgba(45, 41, 38, 0.1)" }}
            >
              <h3 
                className="font-serif text-xl italic mb-3"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                {gifts.fund.name}
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
                {gifts.fund.description}
              </p>

              {gifts.fund.enabled ? (
                <Button href={gifts.fund.stripeLink} variant="primary" external>
                  Contribute
                </Button>
              ) : (
                <p className="text-sm italic" style={{ color: "rgba(45, 41, 38, 0.5)" }}>
                  We&apos;re still arguing about the destination, but we know it&apos;ll involve good food and zero alarm clocks. Help us get there.
                </p>
              )}
            </div>

            {/* Closing Note */}
            <p 
              className="font-serif text-lg italic max-w-md mx-auto"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
            >
              Your presence at our wedding is the greatest gift of all.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          FAQ SECTION - 2 Column Layout
          ============================================ */}
      <section id="faq" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left - Title (4 columns) */}
            <FadeIn className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p 
                  className="text-[10px] uppercase font-bold mb-4"
                  style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
                >
                  Got Questions?
                </p>
                <h2 
                  className="font-serif text-4xl md:text-5xl italic mb-4"
                  style={{ fontWeight: 400, color: "#2D2926" }}
                >
                  {faq.title}
                </h2>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(45, 41, 38, 0.6)" }}
                >
                  {faq.subtitle}
                </p>
              </div>
            </FadeIn>

            {/* Right - Questions (8 columns) */}
            <FadeIn delay={0.2} className="lg:col-span-8">
              <FAQAccordion items={faq.items} />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================
          RSVP / CLOSING SECTION
          ============================================ */}
      <section id="rsvp" className="scroll-mt-20 py-24 md:py-32" style={{ backgroundColor: "#2D2926" }}>
        <Container size="content">
          <FadeIn className="text-center">
            {/* Large Italic Heading */}
            <h2 
              className="font-serif text-5xl md:text-7xl italic mb-6"
              style={{ fontWeight: 400, color: "#F5F5F0" }}
            >
              Ready to Celebrate?
            </h2>

            <p 
              className="text-base md:text-lg mb-10 max-w-md mx-auto"
              style={{ color: "rgba(245, 245, 240, 0.6)" }}
            >
              Please respond by {rsvp.deadline}
            </p>

            {/* Full-width RSVP Button */}
            <Button href="#" variant="outline-white" size="lg" className="w-full max-w-md">
              RSVP Now
            </Button>

            {/* Date & Location */}
            <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(245, 245, 240, 0.1)" }}>
              <p 
                className="text-[10px] uppercase font-bold mb-2"
                style={{ letterSpacing: "0.3em", color: "rgba(245, 245, 240, 0.4)" }}
              >
                {date.full}
              </p>
              <p 
                className="font-serif text-lg italic"
                style={{ color: "rgba(245, 245, 240, 0.6)" }}
              >
                {venue.name}, {venue.city}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
