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
      {/* Hero Section - Sage background */}
      <section 
        className="pt-24 pb-12 md:pt-32 md:pb-16" 
        style={{ backgroundColor: "#6B705C" }}
      >
        <Container size="content">
          <div className="text-center px-2">
            <p 
              className="text-white/50 text-xs md:text-sm uppercase mb-3 md:mb-4"
              style={{ letterSpacing: "0.2em" }}
            >
              You are Invited
            </p>
            <h1 
              className="font-serif text-4xl md:text-6xl text-white mb-4 md:mb-6"
              style={{ fontWeight: 400 }}
            >
              {rsvp.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Coming Soon - Cream background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
        <Container size="content">
          <div className="text-center max-w-xl mx-auto py-8 md:py-16 px-2">
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
              style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}
            >
              <EnvelopeIcon className="h-8 w-8 md:h-10 md:w-10" style={{ color: "#6B705C" }} />
            </div>
            <h2 
              className="font-serif text-2xl md:text-3xl mb-3 md:mb-4"
              style={{ color: "#1A1A1A", fontWeight: 400 }}
            >
              Coming Soon
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
              Our RSVP form will be available shortly. Check back soon!
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Links - Sage background */}
      <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#6B705C" }}>
        <Container size="content">
          <h2 className="font-serif text-xl md:text-2xl text-white mb-6 md:mb-8" style={{ fontWeight: 400 }}>
            In the meantime
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button href="/schedule" variant="outline-white" className="w-full sm:w-auto">
              View Schedule
            </Button>
            <Button href="/travel" variant="outline-white" className="w-full sm:w-auto">
              Travel Info
            </Button>
            <Button href="/faq" variant="outline-white" className="w-full sm:w-auto">
              FAQ
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
