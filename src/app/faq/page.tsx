import { Metadata } from "next";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: `FAQ | ${weddingConfig.meta.title}`,
  description: "Frequently asked questions about our wedding celebration.",
};

export default function FAQPage() {
  const { faq } = weddingConfig;

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
              Got Questions?
            </p>
            <h1 
              className="font-serif text-4xl md:text-6xl text-white mb-4 md:mb-6"
              style={{ fontWeight: 400 }}
            >
              {faq.title}
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {faq.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section - Cream background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
        <Container size="content">
          <FAQAccordion items={faq.items} />

          {/* Additional Help */}
          <div className="mt-10 md:mt-16 text-center">
            <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}>
              <h3 
                className="font-serif text-lg md:text-xl mb-2 md:mb-3"
                style={{ color: "#1A1A1A", fontWeight: 400 }}
              >
                Still have questions?
              </h3>
              <p className="text-sm md:text-base mb-4 md:mb-6" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                Feel free to reach out to us directly. We are happy to help!
              </p>
              <Button href="/rsvp" variant="primary" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links - Sage background */}
      <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#6B705C" }}>
        <Container size="content">
          <h2 className="font-serif text-xl md:text-2xl text-white mb-6 md:mb-8" style={{ fontWeight: 400 }}>
            Helpful Links
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button href="/schedule" variant="outline-white" className="w-full sm:w-auto">
              Schedule
            </Button>
            <Button href="/travel" variant="outline-white" className="w-full sm:w-auto">
              Travel
            </Button>
            <Button href="/rsvp" variant="outline-white" className="w-full sm:w-auto">
              RSVP
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
