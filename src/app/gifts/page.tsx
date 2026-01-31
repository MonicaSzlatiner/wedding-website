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
      {/* Hero Section - Editorial framed style */}
      <section className="relative">
        {/* Mobile: Stacked with frame */}
        <div className="lg:hidden p-3 sm:p-4 min-h-[90vh]" style={{ backgroundColor: "#A5A5A0" }}>
          <div className="min-h-[calc(90vh-24px)] sm:min-h-[calc(90vh-32px)] flex flex-col" style={{ backgroundColor: "#6B705C" }}>
            {/* Image */}
            <div className="relative h-[50vh]">
              <Image
                src="/images/hero-gifts.jpg"
                alt="Laurens and Monica"
                fill
                className="object-cover object-top"
                priority
                sizes="100vw"
              />
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col justify-end p-6 sm:p-8">
              <p 
                className="text-white/50 text-xs uppercase mb-4"
                style={{ letterSpacing: "0.2em" }}
              >
                Celebrate With Us
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl text-white leading-tight mb-4" style={{ fontWeight: 400 }}>
                {gifts.title}
              </h1>
              <p className="text-white/70 text-base leading-relaxed max-w-sm">
                {gifts.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: Framed split layout */}
        <div className="hidden lg:block p-5 xl:p-6 min-h-screen" style={{ backgroundColor: "#A5A5A0" }}>
          <div className="flex h-[calc(100vh-40px)] xl:h-[calc(100vh-48px)]">
            {/* Left Panel */}
            <div 
              className="w-[45%] flex flex-col justify-end p-10 xl:p-14"
              style={{ backgroundColor: "#6B705C" }}
            >
              <p 
                className="text-white/50 text-xs xl:text-sm uppercase mb-6"
                style={{ letterSpacing: "0.2em" }}
              >
                Celebrate With Us
              </p>
              <h1 
                className="font-serif text-5xl xl:text-6xl 2xl:text-7xl text-white leading-[1.05] mb-6"
                style={{ fontWeight: 400 }}
              >
                {gifts.title}
              </h1>
              <p className="text-white/60 text-base xl:text-lg max-w-md leading-relaxed">
                {gifts.subtitle}
              </p>
            </div>
            {/* Right Panel - Image */}
            <div className="w-[55%] relative">
              <Image
                src="/images/hero-gifts.jpg"
                alt="Laurens and Monica"
                fill
                className="object-cover"
                priority
                sizes="55vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Gray background */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#A5A5A0" }}>
        <Container size="content">
          <div className="text-center max-w-2xl mx-auto px-2">
            {/* Heart Icon */}
            <div 
              className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
              style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}
            >
              <HeartIcon className="h-7 w-7 md:h-8 md:w-8" style={{ color: "#6B705C" }} />
            </div>

            {/* Message */}
            <p className="text-base md:text-lg leading-relaxed mb-8 md:mb-12" style={{ color: "rgba(26, 26, 26, 0.7)" }}>
              {gifts.message}
            </p>

            {/* Honeymoon Fund Card */}
            <div className="rounded-2xl shadow-lg overflow-hidden" style={{ backgroundColor: "#F8F9FA" }}>
              <div className="p-5 md:p-8 border-b" style={{ backgroundColor: "rgba(107, 112, 92, 0.1)", borderColor: "rgba(107, 112, 92, 0.2)" }}>
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
                  style={{ backgroundColor: "#6B705C" }}
                >
                  <GiftIcon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h2 className="font-serif text-xl md:text-2xl mb-2" style={{ color: "#1A1A1A", fontWeight: 400 }}>
                  {gifts.fund.name}
                </h2>
                <p style={{ color: "rgba(26, 26, 26, 0.6)" }} className="text-sm md:text-base">
                  {gifts.fund.description}
                </p>
              </div>

              <div className="p-5 md:p-8">
                {gifts.fund.enabled ? (
                  <>
                    <p className="text-sm md:text-base mb-5 md:mb-6" style={{ color: "rgba(26, 26, 26, 0.7)" }}>
                      Click below to contribute to our honeymoon adventure.
                      Every gift, no matter the size, means the world to us.
                    </p>
                    <Button
                      href={gifts.fund.stripeLink}
                      variant="primary"
                      size="lg"
                      external
                      className="w-full sm:w-auto"
                    >
                      Contribute to Our Honeymoon
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-2 md:py-4">
                    <p className="text-sm md:text-base mb-3 md:mb-4" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                      Our honeymoon fund will be available soon.
                    </p>
                    <div 
                      className="inline-block px-4 py-2 rounded-full text-sm"
                      style={{ backgroundColor: "rgba(107, 112, 92, 0.15)", color: "#6B705C" }}
                    >
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Note */}
            <div className="mt-8 md:mt-12 p-5 md:p-6 rounded-xl" style={{ backgroundColor: "rgba(107, 112, 92, 0.1)" }}>
              <p className="italic text-sm md:text-base leading-relaxed" style={{ color: "rgba(26, 26, 26, 0.7)" }}>
                Your presence at our wedding is the greatest gift of all. We are
                so grateful to have you in our lives and cannot wait to celebrate
                with you.
              </p>
              <p className="font-serif text-base md:text-lg mt-3 md:mt-4" style={{ color: "#1A1A1A" }}>
                With love, {couple.person1} & {couple.person2}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links - Sage background */}
      <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#6B705C" }}>
        <Container size="content">
          <h2 className="font-serif text-xl md:text-2xl text-white mb-6 md:mb-8" style={{ fontWeight: 400 }}>
            Ready to RSVP?
          </h2>
          <Button href="/rsvp" variant="outline-white" size="lg" className="w-full sm:w-auto">
            Respond to Invitation
          </Button>
        </Container>
      </section>
    </>
  );
}
