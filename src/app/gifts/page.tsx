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
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-[70vh] flex">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-sage-600 flex flex-col justify-center p-8 md:p-12 lg:p-16 pt-24">
          <p className="text-white/70 text-sm tracking-widest uppercase mb-4">
            Celebrate With Us
          </p>
          <h1 className="font-serif text-display-md md:text-display-lg text-white mb-6">
            {gifts.title}
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            {gifts.subtitle}
          </p>
        </div>

        {/* Right Panel - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-300 via-stone-400 to-stone-500" />
          {/* Uncomment when gifts hero image is available:
          <Image
            src="/images/hero-gifts.jpg"
            alt="Honeymoon destination"
            fill
            className="object-cover"
            priority
          />
          */}
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <Container size="content">
          <div className="text-center max-w-2xl mx-auto">
            {/* Heart Icon */}
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <HeartIcon className="h-8 w-8 text-sage-600" />
            </div>

            {/* Message */}
            <p className="text-stone-600 text-lg leading-relaxed mb-12">
              {gifts.message}
            </p>

            {/* Honeymoon Fund Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden">
              <div className="bg-sage-50 p-8 border-b border-stone-100">
                <div className="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GiftIcon className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-serif text-2xl text-stone-800 mb-2">
                  {gifts.fund.name}
                </h2>
                <p className="text-stone-500">{gifts.fund.description}</p>
              </div>

              <div className="p-8">
                {gifts.fund.enabled ? (
                  <>
                    <p className="text-stone-600 mb-6">
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
                  <div className="text-center py-4">
                    <p className="text-stone-500 mb-4">
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
            <div className="mt-12 p-6 bg-blush-50 rounded-xl">
              <p className="text-stone-600 italic">
                Your presence at our wedding is the greatest gift of all. We are
                so grateful to have you in our lives and cannot wait to celebrate
                with you.
              </p>
              <p className="text-stone-800 font-serif text-lg mt-4">
                With love, {couple.person1} & {couple.person2}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-sage-600 text-white text-center">
        <Container size="content">
          <h2 className="font-serif text-2xl text-white mb-8">
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
