import { Metadata } from "next";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: `RSVP | ${weddingConfig.meta.title}`,
  description: "Please let us know if you can join us for our wedding celebration.",
};

export default function RSVPPage() {
  const { rsvp } = weddingConfig;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-sage-600 text-white">
        <Container size="content">
          <div className="text-center px-2">
            <p className="text-white/70 text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
              You are Invited
            </p>
            <h1 className="font-serif text-display-sm md:text-display-lg text-white mb-4 md:mb-6">
              {rsvp.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Coming Soon */}
      <section className="py-12 md:py-16 lg:py-20">
        <Container size="content">
          <div className="text-center max-w-xl mx-auto py-8 md:py-16 px-2">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
              <EnvelopeIcon className="h-8 w-8 md:h-10 md:w-10 text-sage-600" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-3 md:mb-4">
              Coming Soon
            </h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed">
              Our RSVP form will be available shortly. Check back soon!
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16 bg-stone-100 text-center">
        <Container size="content">
          <h2 className="font-serif text-xl md:text-2xl text-stone-800 mb-6 md:mb-8">
            In the meantime
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button href="/schedule" variant="secondary" className="w-full sm:w-auto">
              View Schedule
            </Button>
            <Button href="/travel" variant="secondary" className="w-full sm:w-auto">
              Travel Info
            </Button>
            <Button href="/faq" variant="secondary" className="w-full sm:w-auto">
              FAQ
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
