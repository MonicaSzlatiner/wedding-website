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
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-sage-600 text-white">
        <Container size="content">
          <div className="text-center px-2">
            <p className="text-white/70 text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
              Got Questions?
            </p>
            <h1 className="font-serif text-display-sm md:text-display-lg text-white mb-4 md:mb-6">
              {faq.title}
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {faq.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <Container size="content">
          <FAQAccordion items={faq.items} />

          {/* Additional Help */}
          <div className="mt-10 md:mt-16 text-center">
            <div className="bg-sage-50 rounded-xl p-6 md:p-8">
              <h3 className="font-serif text-lg md:text-xl text-stone-800 mb-2 md:mb-3">
                Still have questions?
              </h3>
              <p className="text-stone-500 text-sm md:text-base mb-4 md:mb-6">
                Feel free to reach out to us directly. We are happy to help!
              </p>
              <Button href="/rsvp" variant="primary" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16 bg-stone-100 text-center">
        <Container size="content">
          <h2 className="font-serif text-xl md:text-2xl text-stone-800 mb-6 md:mb-8">
            Helpful Links
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button href="/schedule" variant="secondary" className="w-full sm:w-auto">
              Schedule
            </Button>
            <Button href="/travel" variant="secondary" className="w-full sm:w-auto">
              Travel
            </Button>
            <Button href="/rsvp" variant="secondary" className="w-full sm:w-auto">
              RSVP
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
