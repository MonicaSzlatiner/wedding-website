import { weddingConfig } from "@/config/content";
import { AddToCalendar } from "@/components/AddToCalendar";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedHero } from "@/components/AnimatedHero";

export default function HomePage() {
  const { couple, date, venue, schedule } = weddingConfig;

  return (
    <>
      {/* Animated Hero Section */}
      <AnimatedHero couple={couple} date={date} venue={venue}>
        {/* Mobile buttons */}
        <div className="lg:hidden flex flex-col gap-3 w-full">
          <Button href="/rsvp" variant="outline-white" size="lg" className="w-full">
            RSVP Now
          </Button>
          <AddToCalendar variant="outline-white" size="lg" />
        </div>
        {/* Desktop buttons */}
        <div className="hidden lg:flex flex-wrap gap-4">
          <AddToCalendar variant="outline-white" />
          <Button href="/rsvp" variant="outline-white">
            RSVP Now
          </Button>
        </div>
      </AnimatedHero>

      {/* Venue Preview Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-stone-50">
        <Container size="content">
          <FadeIn className="text-center px-2">
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
          </FadeIn>
        </Container>
      </section>

      {/* Schedule Preview Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-sage-50">
        <Container>
          <FadeIn className="text-center mb-8 md:mb-12 px-2">
            <p className="text-emerald-600 text-xs md:text-sm font-medium tracking-widest uppercase mb-3 md:mb-4">
              The Day
            </p>
            <h2 className="font-serif text-2xl md:text-display-sm lg:text-display-md text-stone-800">
              {schedule.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            {schedule.events.map((event, index) => (
              <FadeIn key={index} delay={index * 0.1} className="text-center p-3 md:p-0">
                <div className="text-emerald-600 font-serif text-lg md:text-2xl mb-1 md:mb-2">
                  {event.time}
                </div>
                <h3 className="font-serif text-base md:text-xl text-stone-800 mb-1 md:mb-2">
                  {event.title}
                </h3>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed">{event.description}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="text-center mt-8 md:mt-12">
            <Button href="/schedule" variant="secondary" className="w-full sm:w-auto">
              Full Schedule & Details
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-sage-600 text-white text-center">
        <Container size="content">
          <FadeIn>
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
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
