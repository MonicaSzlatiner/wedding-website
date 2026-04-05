import { Metadata } from "next";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import HoneymoonFund from "@/components/HoneymoonFund";

export const metadata: Metadata = {
  title: `Gifts | ${weddingConfig.meta.title}`,
  description: "Information about wedding gifts and our honeymoon fund.",
};

export default function GiftsPage() {
  const { gifts, couple } = weddingConfig;

  const PAYPAL_URL = "https://paypal.me/monicaandlaurens";
  const BANK_TRANSFER_URL =
    "https://www.ing.nl/de-ing/payreq?trxid=mdH0dM8iGbS0qO6zsJ7kTNQ0EjibEpPQ&flow-step=payment-request";

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-10 md:pt-32 md:pb-14 overflow-hidden" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span
                className="text-[10px] uppercase font-bold"
                style={{ letterSpacing: "0.3em", marginRight: "-0.3em", color: "rgba(45, 41, 38, 0.5)" }}
              >
                {gifts.label}
              </span>
            </div>
            <h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              {gifts.heading}
            </h1>
            <p
              className="font-serif text-base md:text-lg italic leading-relaxed max-w-md mx-auto"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
            >
              {gifts.message}
            </p>
          </div>
        </Container>
      </section>

      {/* Honeymoon Fund */}
      <section className="pb-20 md:pb-28 overflow-hidden" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <HoneymoonFund paypalUrl={PAYPAL_URL} bankTransferUrl={BANK_TRANSFER_URL} />
        </Container>
      </section>

      {/* Closing Note */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <div className="text-center max-w-md mx-auto">
            <p
              className="font-serif text-lg italic"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
            >
              Your presence at our wedding is the greatest gift of all.
            </p>
            <p className="font-serif text-base mt-4" style={{ color: "#2D2926" }}>
              With love, {couple.person1} &amp; {couple.person2}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 text-center" style={{ backgroundColor: "#2D2926" }}>
        <Container size="content">
          <h2
            className="font-serif text-2xl md:text-3xl italic text-white mb-8"
            style={{ fontWeight: 400 }}
          >
            Ready to RSVP?
          </h2>
          <Button href="/rsvp" variant="outline-white" size="lg">
            Respond to Invitation
          </Button>
        </Container>
      </section>
    </>
  );
}
