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

// Material-style wine icon (thin stroke for quiet luxury)
function WineIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 2h6l1.5 8.5a4.5 4.5 0 01-9 0L9 2zM12 14v7m-3 0h6" />
    </svg>
  );
}

// Church/ceremony icon (thin stroke)
function CeremonyIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 0l4 3v13H8V9l4-3zm-4 6H4v12h4m8-12h4v12h-4" />
    </svg>
  );
}

// Restaurant/dining icon (thin stroke)
function DiningIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9m0 0c-2 0-4 1-4 3v6h8v-6c0-2-2-3-4-3zM3 6c0 3 1.5 5 3 5v10h1V3C5.5 3 3 4.5 3 6z" />
    </svg>
  );
}

// Music/dancing icon (thin stroke)
function MusicIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  );
}

// Map event titles to icons
const eventIcons: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  "Arrival": WineIcon,
  "Ceremony": CeremonyIcon,
  "Toast & Dinner": DiningIcon,
  "Dancing": MusicIcon,
};

export default function HomePage() {
  const { couple, date, venue, schedule, travel, gifts, rsvp, faq, dressCode } = weddingConfig;

  return (
    <>
      {/* ============================================
          HOME / HERO SECTION
          ============================================ */}
      <AnimatedHero couple={couple} date={date} venue={venue} />

      {/* ============================================
          SCHEDULE SECTION - The Weekend
          ============================================ */}
      <section id="schedule" className="scroll-mt-20 py-24 md:py-32 border-t" style={{ backgroundColor: "#F5F5F0", borderColor: "rgba(45, 41, 38, 0.05)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section Header */}
          <FadeIn className="mb-20">
            <div className="text-center">
              <p 
                className="text-[10px] uppercase font-medium mb-3"
                style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.4)" }}
              >
                The Celebration
              </p>
              <h2 
                className="font-serif text-5xl md:text-6xl italic"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                Schedule
              </h2>
            </div>
          </FadeIn>

          {/* Event Grid - 3/4 columns on desktop */}
          <div className="grid gap-16 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {schedule.events.map((event, index) => {
              const IconComponent = eventIcons[event.title] || WineIcon;
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="flex flex-col items-center text-center px-4">
                    {/* Icon */}
                    <IconComponent 
                      className="w-8 h-8 mb-6" 
                      style={{ color: "#C37B60" }} 
                    />
                    {/* Date/Day Label */}
                    <p 
                      className="text-[11px] uppercase font-bold mb-2"
                      style={{ letterSpacing: "0.15em", color: "#C37B60" }}
                    >
                      {date.short}
                    </p>
                    {/* Time */}
                    <p 
                      className="text-sm mb-6"
                      style={{ color: "rgba(45, 41, 38, 0.6)" }}
                    >
                      {event.time}
                    </p>
                    {/* Title */}
                    <h3 
                      className="font-serif text-3xl italic mb-3"
                      style={{ fontWeight: 400, color: "#2D2926" }}
                    >
                      {event.title}
                    </h3>
                    {/* Venue/Description - italic serif */}
                    <p 
                      className="font-serif text-lg font-light italic"
                      style={{ color: "rgba(45, 41, 38, 0.7)" }}
                    >
                      {event.description}
                    </p>
                    {/* Thin divider */}
                    <div 
                      className="w-8 mt-8"
                      style={{ height: "0.5px", backgroundColor: "rgba(45, 41, 38, 0.2)" }}
                    />
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Add to Calendar */}
          <FadeIn delay={0.4} className="text-center mt-16">
            <AddToCalendar variant="secondary" />
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          VENUE / DESTINATION SECTION
          ============================================ */}
      <section id="venue" className="scroll-mt-20 py-24 border-y" style={{ backgroundColor: "#F2F2EC", borderColor: "rgba(45, 41, 38, 0.05)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <FadeIn className="order-2 md:order-1">
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg">
                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-1000">
                  <Image
                    src="/images/venue.jpg"
                    alt={venue.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Right - Text Content */}
            <FadeIn className="order-1 md:order-2 text-center md:text-left">
              {/* Large location icon */}
              <MapPinIcon 
                className="w-10 h-10 mb-6 mx-auto md:mx-0" 
                style={{ color: "#2D2926" }} 
              />
              <h2 
                className="font-serif text-5xl italic mb-6"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                The Destination
              </h2>
              <p 
                className="text-lg font-light mb-10 max-w-md mx-auto md:mx-0 leading-relaxed"
                style={{ color: "rgba(45, 41, 38, 0.8)" }}
              >
                {venue.name}, {venue.address}, {venue.city}, {venue.country} — A Michelin-starred restaurant tucked into Het Park, right on the river.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={venue.website} variant="primary" external>
                  Visit Restaurant
                </Button>
                <Button href={venue.googleMapsLink} variant="secondary" external>
                  Get Directions
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================
          DRESS CODE SECTION - Dark Espresso Background
          ============================================ */}
      <section id="dresscode" className="scroll-mt-20 py-32" style={{ backgroundColor: "#2D2926" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Left - Text Content */}
            <FadeIn>
              <div className="space-y-12">
                <header>
                  <p 
                    className="text-[10px] uppercase font-bold mb-4"
                    style={{ letterSpacing: "0.4em", color: "#C37B60" }}
                  >
                    The Dress Code
                  </p>
                  <h2 
                    className="font-serif text-6xl italic mb-4"
                    style={{ fontWeight: 400, color: "#F5F5F0" }}
                  >
                    Our Aesthetic
                  </h2>
                  <p 
                    className="font-serif text-3xl italic mb-6"
                    style={{ color: "#C37B60" }}
                  >
                    {dressCode.code}
                  </p>
                  <p 
                    className="text-lg font-light leading-relaxed max-w-md"
                    style={{ color: "rgba(245, 245, 240, 0.8)" }}
                  >
                    {dressCode.description}
                  </p>
                </header>

                {/* Gender-specific inspiration links */}
                <div className="space-y-6">
                  {/* For the Gentlemen */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 flex-shrink-0"
                      style={{ height: "0.5px", backgroundColor: "#C37B60" }}
                    />
                    <div className="flex items-center gap-4">
                      <p 
                        className="text-[11px] uppercase font-bold"
                        style={{ letterSpacing: "0.2em", color: "#C37B60" }}
                      >
                        For Him
                      </p>
                      <a
                        href="https://suitsupply.com/en-nl/journal/cocktail-attire-for-men.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] uppercase font-bold pb-1 border-b transition-all hover:opacity-70"
                        style={{ 
                          letterSpacing: "0.2em", 
                          color: "rgba(245, 245, 240, 0.7)",
                          borderBottomColor: "rgba(245, 245, 240, 0.3)"
                        }}
                      >
                        Inspiration →
                      </a>
                    </div>
                  </div>

                  {/* For the Ladies */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 flex-shrink-0"
                      style={{ height: "0.5px", backgroundColor: "#C37B60" }}
                    />
                    <div className="flex items-center gap-4">
                      <p 
                        className="text-[11px] uppercase font-bold"
                        style={{ letterSpacing: "0.2em", color: "#C37B60" }}
                      >
                        For Her
                      </p>
                      <a
                        href="https://www.theknot.com/content/cocktail-wedding-attire"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] uppercase font-bold pb-1 border-b transition-all hover:opacity-70"
                        style={{ 
                          letterSpacing: "0.2em", 
                          color: "rgba(245, 245, 240, 0.7)",
                          borderBottomColor: "rgba(245, 245, 240, 0.3)"
                        }}
                      >
                        Inspiration →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right - Staggered images */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-6 items-start">
                <div className="aspect-[3/4] rounded-lg shadow-2xl overflow-hidden relative">
                  <Image
                    src="/images/hero-home.jpg"
                    alt="Dress code inspiration"
                    fill
                    className="object-cover"
                    sizes="224px"
                  />
                </div>
                <div className="aspect-[3/4] rounded-lg shadow-2xl overflow-hidden relative mt-12 md:mt-24">
                  <Image
                    src="/images/hero-gifts.jpg"
                    alt="Dress code inspiration"
                    fill
                    className="object-cover"
                    sizes="224px"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================
          ACCOMMODATIONS SECTION
          ============================================ */}
      <section id="stay" className="scroll-mt-20 py-32 border-t" style={{ backgroundColor: "#F5F5F0", borderColor: "rgba(45, 41, 38, 0.05)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section Header */}
          <FadeIn className="mb-20">
            <div className="text-center">
              <p 
                className="text-[10px] uppercase font-medium mb-3"
                style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.4)" }}
              >
                Where to Stay
              </p>
              <h2 
                className="font-serif text-5xl italic"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                Accommodations
              </h2>
            </div>
          </FadeIn>

          {/* Large placeholder/image area */}
          <FadeIn className="mb-24">
            <div 
              className="w-full h-[400px] rounded-xl overflow-hidden relative shadow-sm"
              style={{ backgroundColor: "#E8E8E1" }}
            >
              <Image
                src="/images/dogs.jpg"
                alt="Our welcome committee. They won't be at the wedding, but they wanted to say hi."
                fill
                className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                sizes="100vw"
              />
            </div>
          </FadeIn>

          {/* Hotels Grid - 2 column layout per HTML design */}
          <div className="grid gap-16 md:grid-cols-2">
            {hotels.slice(0, 2).map((hotel, index) => (
              <FadeIn key={hotel.id} delay={index * 0.1}>
                <HotelCard hotel={hotel} />
              </FadeIn>
            ))}
          </div>

          {/* Show remaining hotels if more than 2 */}
          {hotels.length > 2 && (
            <div className="grid gap-16 md:grid-cols-2 mt-16">
              {hotels.slice(2).map((hotel, index) => (
                <FadeIn key={hotel.id} delay={(index + 2) * 0.1}>
                  <HotelCard hotel={hotel} />
                </FadeIn>
              ))}
            </div>
          )}

          {/* Other Options */}
          <FadeIn delay={0.3} className="mt-12 text-center">
            <p className="text-sm" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
              {accommodationsContent.otherOptions.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          GIFTS SECTION - 2 Column Layout
          ============================================ */}
      <section id="gifts" className="scroll-mt-20 py-24 border-y" style={{ backgroundColor: "#F2F2EC", borderColor: "rgba(45, 41, 38, 0.05)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-16">
              {/* Left - Large icon card (1/3) */}
              <div className="w-full md:w-1/3">
                <div 
                  className="aspect-square rounded-2xl shadow-xl flex items-center justify-center"
                  style={{ backgroundColor: "white" }}
                >
                  <GiftIcon 
                    className="w-24 h-24" 
                    style={{ color: "rgba(195, 123, 96, 0.4)" }} 
                  />
                </div>
              </div>

              {/* Right - Text content (2/3) */}
              <div className="md:w-2/3 text-center md:text-left">
                <p 
                  className="text-[10px] uppercase font-medium mb-3"
                  style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.4)" }}
                >
                  Registry
                </p>
                <h2 
                  className="font-serif text-5xl italic mb-6"
                  style={{ fontWeight: 400, color: "#2D2926" }}
                >
                  Your Presence is Enough
                </h2>
                <p 
                  className="text-lg font-light leading-relaxed mb-10 max-w-xl"
                  style={{ color: "rgba(45, 41, 38, 0.7)" }}
                >
                  {gifts.message}
                </p>
                
                {gifts.fund.enabled ? (
                  <Button href={gifts.fund.stripeLink} variant="primary" external>
                    Visit Registry
                  </Button>
                ) : (
                  <a
                    href="#"
                    className="inline-block px-12 py-5 rounded-full text-[11px] uppercase font-bold transition-all hover:shadow-lg"
                    style={{ 
                      letterSpacing: "0.3em",
                      backgroundColor: "#2D2926", 
                      color: "white" 
                    }}
                  >
                    Visit Registry
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          FAQ SECTION - 2 Column Layout
          ============================================ */}
      <section id="faq" className="scroll-mt-20 py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16">
            {/* Left - Title (4 columns) */}
            <FadeIn className="md:col-span-4">
              <div className="md:sticky md:top-32">
                <p 
                  className="text-[10px] uppercase font-medium mb-3"
                  style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.4)" }}
                >
                  Details to Note
                </p>
                <h2 
                  className="font-serif text-5xl italic"
                  style={{ fontWeight: 400, color: "#2D2926" }}
                >
                  F.A.Q.
                </h2>
              </div>
            </FadeIn>

            {/* Right - Questions (8 columns) */}
            <FadeIn delay={0.2} className="md:col-span-8">
              <FAQAccordion items={faq.items} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================
          RSVP / CLOSING SECTION
          ============================================ */}
      <section id="rsvp" className="scroll-mt-20 py-32 border-t" style={{ backgroundColor: "#F5F5F0", borderColor: "rgba(45, 41, 38, 0.05)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn className="text-center">
            {/* Large Italic Heading */}
            <h2 
              className="font-serif text-6xl md:text-8xl italic mb-12"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              Ready to Celebrate?
            </h2>

            {/* Full-width RSVP Button */}
            <div className="max-w-md mx-auto">
              <button 
                className="w-full py-6 rounded-lg text-[11px] uppercase font-black shadow-2xl transition-all hover:opacity-90"
                style={{ 
                  letterSpacing: "0.4em",
                  backgroundColor: "#2D2926", 
                  color: "white" 
                }}
              >
                RSVP Online
              </button>
            </div>

            {/* Footer-style divider and text */}
            <div className="mt-24 flex flex-col items-center gap-6" style={{ opacity: 0.4 }}>
              <div 
                className="w-12"
                style={{ height: "0.5px", backgroundColor: "#2D2926" }}
              />
              <p 
                className="font-serif text-lg italic"
                style={{ color: "#2D2926" }}
              >
                Laurens & Monica — 2026
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
