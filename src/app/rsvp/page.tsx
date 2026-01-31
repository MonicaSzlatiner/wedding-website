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
      <section className="pt-32 pb-16 bg-sage-600 text-white">
        <Container size="content">
          <div className="text-center">
            <p className="text-white/70 text-sm tracking-widest uppercase mb-4">
              You are Invited
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg text-white mb-6">
              {rsvp.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Coming Soon */}
      <section className="section">
        <Container size="content">
          <div className="text-center max-w-xl mx-auto py-16">
            <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <EnvelopeIcon className="h-10 w-10 text-sage-600" />
            </div>
            <h2 className="font-serif text-3xl text-stone-800 mb-4">
              Coming Soon
            </h2>
            <p className="text-stone-500 text-lg">
              Our RSVP form will be available shortly. Check back soon!
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-stone-100 text-center">
        <Container size="content">
          <h2 className="font-serif text-2xl text-stone-800 mb-8">
            In the meantime
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
