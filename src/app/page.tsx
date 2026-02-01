import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedHero } from "@/components/AnimatedHero";

export default function HomePage() {
  const { couple, date, venue, schedule } = weddingConfig;

  return (
    <>
      {/* Modern Editorial Hero - Full viewport with khaki frame */}
      <AnimatedHero couple={couple} date={date} venue={venue} />

      {/* Venue Preview Section - Cream frame background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
        <Container size="content">
          <FadeIn className="text-center px-2">
            <p 
              className="text-xs md:text-sm font-sans font-medium uppercase mb-3 md:mb-4"
              style={{ letterSpacing: "0.2em", color: "#6B705C" }}
            >
              The Venue
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6" style={{ fontWeight: 400, color: "#1A1A1A" }}>
              {venue.name}
            </h2>
            <p className="font-sans text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(26, 26, 26, 0.7)" }}>
              {venue.description}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Button href="/schedule" variant="primary">
                View Schedule
              </Button>
              <Button href={venue.website} variant="secondary" external>
                Venue Website
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Schedule Preview Section - Sage green background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#6B705C" }}>
        <Container>
          <FadeIn className="text-center mb-8 md:mb-12 px-2">
            <p 
              className="text-xs md:text-sm font-sans font-medium uppercase mb-3 md:mb-4"
              style={{ letterSpacing: "0.2em", color: "rgba(255, 255, 255, 0.5)" }}
            >
              The Day
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-white" style={{ fontWeight: 400 }}>
              {schedule.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            {schedule.events.map((event, index) => (
              <FadeIn key={index} delay={index * 0.1} className="text-center p-3 md:p-0">
                <div className="font-serif text-lg md:text-2xl mb-1 md:mb-2" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  {event.time}
                </div>
                <h3 className="font-serif text-base md:text-xl text-white mb-1 md:mb-2" style={{ fontWeight: 400 }}>
                  {event.title}
                </h3>
                <p className="font-sans text-xs md:text-sm leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.5)" }}>{event.description}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="text-center mt-8 md:mt-12">
            <Button href="/schedule" variant="outline-white">
              Full Schedule & Details
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* Final CTA Section - Cream frame background */}
      <section className="py-16 md:py-24 text-center" style={{ backgroundColor: "#E8E6E1" }}>
        <Container size="content">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6 px-2" style={{ fontWeight: 400, color: "#1A1A1A" }}>
              We cannot wait to celebrate with you
            </h2>
            <p 
              className="font-sans text-sm md:text-base mb-8 md:mb-10 max-w-xl mx-auto px-2 leading-relaxed uppercase"
              style={{ letterSpacing: "0.1em", color: "rgba(26, 26, 26, 0.6)" }}
            >
              Please let us know if you can join us by {weddingConfig.rsvp.deadline}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Button href="/rsvp" variant="primary" size="lg">
                RSVP Now
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
