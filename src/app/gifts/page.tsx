import { Metadata } from "next";
import Image from "next/image";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GiftIcon, HeartIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: `Gifts | ${weddingConfig.meta.title}`,
  description: "Information about wedding gifts and our honeymoon fund.",
};

export default function GiftsPage() {
  const { gifts, couple } = weddingConfig;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <div>
              <p 
                className="text-[10px] uppercase font-bold mb-4"
                style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
              >
                Celebrate With Us
              </p>
              <h1 
                className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                {gifts.heading}
              </h1>
              <p 
                className="font-serif text-lg md:text-xl italic leading-relaxed"
                style={{ color: "rgba(45, 41, 38, 0.6)" }}
              >
                {gifts.subtitle}
              </p>
            </div>

            {/* Right - Image */}
            <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
              <Image
                src="/images/hero-gifts.jpg"
                alt="Laurens and Monica"
                fill
                className="object-cover object-top grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <div className="text-center max-w-2xl mx-auto px-2">
            {/* Heart Icon */}
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ backgroundColor: "rgba(195, 123, 96, 0.1)" }}
            >
              <HeartIcon className="h-8 w-8 md:h-10 md:w-10" style={{ color: "#C37B60" }} />
            </div>

            {/* Message */}
            <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: "rgba(45, 41, 38, 0.7)" }}>
              {gifts.message}
            </p>

            {/* Honeymoon Fund Card */}
            <div 
              className="rounded-lg p-8 md:p-10 mb-8"
              style={{ backgroundColor: "rgba(45, 41, 38, 0.03)", border: "1px solid rgba(45, 41, 38, 0.1)" }}
            >
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#2D2926" }}
              >
                <GiftIcon className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <h2 
                className="font-serif text-xl md:text-2xl italic mb-3" 
                style={{ color: "#2D2926", fontWeight: 400 }}
              >
                {gifts.fund.name}
              </h2>
              <p style={{ color: "rgba(45, 41, 38, 0.6)" }} className="text-sm md:text-base mb-6">
                {gifts.fund.description}
              </p>

              {gifts.fund.enabled ? (
                <Button
                  href={gifts.fund.stripeLink}
                  variant="primary"
                  size="lg"
                  external
                >
                  Contribute to Our Honeymoon
                </Button>
              ) : (
                <p className="text-sm italic" style={{ color: "rgba(45, 41, 38, 0.5)" }}>
                  We&apos;re still arguing about the destination, but we know it&apos;ll involve good food and zero alarm clocks. Help us get there.
                </p>
              )}
            </div>

            {/* Additional Note */}
            <p 
              className="font-serif text-lg italic max-w-md mx-auto"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
            >
              Your presence at our wedding is the greatest gift of all.
            </p>
            <p className="font-serif text-base mt-4" style={{ color: "#2D2926" }}>
              With love, {couple.person1} & {couple.person2}
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
