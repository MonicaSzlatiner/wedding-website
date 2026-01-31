import { Metadata } from "next";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AddToCalendar } from "@/components/AddToCalendar";
import { CalendarDaysIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: `RSVP | ${weddingConfig.meta.title}`,
  description: "Please let us know if you can join us for our wedding celebration.",
};

export default function RSVPPage() {
  const { rsvp, couple, date, venue } = weddingConfig;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-sage-600 text-white">
        <Container size="content">
          <div className="text-center">
            <p className="text-white/70 text-sm tracking-widest uppercase mb-4">
              You are Invited
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg text-white mb-6">
              {rsvp.title}
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              {rsvp.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* RSVP Card */}
      <section className="section">
        <Container size="content">
          <div className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden max-w-2xl mx-auto">
            {/* Card Header */}
            <div className="bg-sage-50 p-8 text-center border-b border-stone-100">
              <h2 className="font-serif text-2xl text-stone-800 mb-2">
                {couple.names}
              </h2>
              <p className="text-stone-500">
                Request the pleasure of your company
              </p>
            </div>

            {/* Event Details */}
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CalendarDaysIcon className="h-5 w-5 text-sage-600" />
                  </div>
                  <div>
                    <p className="text-stone-800 font-medium">{date.full}</p>
                    <p className="text-stone-500 text-sm">Save the date</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="h-5 w-5 text-sage-600" />
                  </div>
                  <div>
                    <p className="text-stone-800 font-medium">{date.timeDisplay}</p>
                    <p className="text-stone-500 text-sm">Ceremony begins</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="h-5 w-5 text-sage-600" />
                  </div>
                  <div>
                    <p className="text-stone-800 font-medium">{venue.name}</p>
                    <p className="text-stone-500 text-sm">{venue.fullAddress}</p>
                  </div>
                </div>
              </div>

              {/* Deadline Notice */}
              <div className="bg-blush-50 rounded-lg p-4 mb-8 text-center">
                <p className="text-stone-700">
                  <span className="font-medium">Please respond by:</span>{" "}
                  {rsvp.deadline}
                </p>
              </div>

              {/* RSVP Button */}
              <div className="text-center">
                <Button
                  href={rsvp.formUrl}
                  variant="primary"
                  size="lg"
                  external
                  className="w-full sm:w-auto"
                >
                  {rsvp.buttonText}
                </Button>
                <p className="text-stone-400 text-sm mt-4">
                  {rsvp.note}
                </p>
              </div>
            </div>
          </div>

          {/* Add to Calendar */}
          <div className="text-center mt-12">
            <p className="text-stone-500 mb-4">Do not forget to add it to your calendar</p>
            <AddToCalendar variant="primary" />
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-stone-100 text-center">
        <Container size="content">
          <h2 className="font-serif text-2xl text-stone-800 mb-8">
            Need more information?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/schedule" variant="secondary">
              View Schedule
            </Button>
            <Button href="/travel" variant="secondary">
              Travel Info
            </Button>
            <Button href="/faq" variant="secondary">
              FAQ
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
