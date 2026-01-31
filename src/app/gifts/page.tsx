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
      {/* Hero Section - Mobile: stacked, Desktop: split */}
      <section className="relative min-h-[85vh] lg:min-h-[70vh]">
        {/* Mobile: Full-bleed image background */}
        <div className="lg:hidden absolute inset-0">
          <Image
            src="/images/hero-gifts.jpg"
            alt="Laurens and Monica"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage-900/95 via-sage-800/60 to-sage-700/30" />
        </div>

        {/* Desktop: Split layout */}
        <div className="hidden lg:flex min-h-[70vh]">
          <div className="w-1/2 bg-sage-600 flex flex-col justify-center p-20">
            <p className="text-white/80 text-sm tracking-widest uppercase mb-4">
              Celebrate With Us
            </p>
            <h1 className="font-serif text-display-lg text-white mb-6">
              {gifts.title}
            </h1>
            <p className="text-white/90 text-lg max-w-md leading-relaxed">
              {gifts.subtitle}
            </p>
          </div>
          <div className="w-1/2 relative">
            <Image
              src="/images/hero-gifts.jpg"
              alt="Laurens and Monica"
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
          </div>
        </div>

        {/* Mobile: Content overlay */}
        <div className="lg:hidden relative min-h-[85vh] flex flex-col justify-end px-6 pb-16 pt-24">
          <p className="text-white/80 text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "3px" }}>
            Celebrate With Us
          </p>
          <h1 className="font-serif text-display-sm text-white mb-4">
            {gifts.title}
          </h1>
          <p className="text-white/90 text-base leading-relaxed max-w-sm">
            {gifts.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <Container size="content">
          <div className="text-center max-w-2xl mx-auto px-2">
            {/* Heart Icon */}
            <div className="w-14 h-14 md:w-16 md:h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
              <HeartIcon className="h-7 w-7 md:h-8 md:w-8 text-sage-600" />
            </div>

            {/* Message */}
            <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-8 md:mb-12">
              {gifts.message}
            </p>

            {/* Honeymoon Fund Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden">
              <div className="bg-sage-50 p-5 md:p-8 border-b border-stone-100">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-sage-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <GiftIcon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h2 className="font-serif text-xl md:text-2xl text-stone-800 mb-2">
                  {gifts.fund.name}
                </h2>
                <p className="text-stone-500 text-sm md:text-base">{gifts.fund.description}</p>
              </div>

              <div className="p-5 md:p-8">
                {gifts.fund.enabled ? (
                  <>
                    <p className="text-stone-600 text-sm md:text-base mb-5 md:mb-6">
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
                    <p className="text-stone-500 text-sm md:text-base mb-3 md:mb-4">
                      Our honeymoon fund will be available soon.
                    </p>
                    <div className="inline-block bg-stone-100 px-4 py-2 rounded-full text-stone-500 text-sm">
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Note */}
            <div className="mt-8 md:mt-12 p-5 md:p-6 bg-blush-50 rounded-xl">
              <p className="text-stone-600 italic text-sm md:text-base leading-relaxed">
                Your presence at our wedding is the greatest gift of all. We are
                so grateful to have you in our lives and cannot wait to celebrate
                with you.
              </p>
              <p className="text-stone-800 font-serif text-base md:text-lg mt-3 md:mt-4">
                With love, {couple.person1} & {couple.person2}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16 bg-sage-600 text-white text-center">
        <Container size="content">
          <h2 className="font-serif text-xl md:text-2xl text-white mb-6 md:mb-8">
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
