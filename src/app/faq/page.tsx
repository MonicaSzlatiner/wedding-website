import { Metadata } from "next";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <section className="pt-32 pb-16 bg-sage-600 text-white">
        <Container size="content">
          <div className="text-center">
            <p className="text-white/70 text-sm tracking-widest uppercase mb-4">
              Got Questions?
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg text-white mb-6">
              {faq.title}
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              {faq.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <Container size="content">
          <FAQAccordion items={faq.items} />

          {/* Additional Help */}
          <div className="mt-16 text-center">
            <div className="bg-sage-50 rounded-xl p-8">
              <h3 className="font-serif text-xl text-stone-800 mb-3">
                Still have questions?
              </h3>
              <p className="text-stone-500 mb-6">
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
      <section className="py-16 bg-stone-100 text-center">
        <Container size="content">
          <h2 className="font-serif text-2xl text-stone-800 mb-8">
            Helpful Links
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/schedule" variant="secondary">
              Schedule
            </Button>
            <Button href="/travel" variant="secondary">
              Travel
            </Button>
            <Button href="/rsvp" variant="secondary">
              RSVP
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
