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
      {/* Hero Section */}
      <section 
        className="pt-24 pb-16 md:pt-32 md:pb-20" 
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <Container size="content">
          <div className="text-center px-2">
            <p 
              className="text-[10px] uppercase font-bold mb-4"
              style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
            >
              Got Questions?
            </p>
            <h1 
              className="font-serif text-4xl md:text-6xl italic mb-4 md:mb-6"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              {faq.title}
            </h1>
            <p 
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
            >
              {faq.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <FAQAccordion items={faq.items} />

          {/* Additional Help */}
          <div className="mt-16 text-center">
            <div 
              className="rounded-lg p-8"
              style={{ backgroundColor: "rgba(45, 41, 38, 0.03)", border: "1px solid rgba(45, 41, 38, 0.1)" }}
            >
              <h3 
                className="font-serif text-xl italic mb-3"
                style={{ color: "#2D2926", fontWeight: 400 }}
              >
                Still have questions?
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
                Feel free to reach out to us directly. We are happy to help!
              </p>
              <Button href="/rsvp" variant="primary">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#2D2926" }}>
        <Container size="content">
          <h2 
            className="font-serif text-xl md:text-2xl italic text-white mb-8" 
            style={{ fontWeight: 400 }}
          >
            Helpful Links
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Button href="/schedule" variant="outline-white">
              Schedule
            </Button>
            <Button href="/travel" variant="outline-white">
              Travel
            </Button>
            <Button href="/rsvp" variant="outline-white">
              RSVP
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
