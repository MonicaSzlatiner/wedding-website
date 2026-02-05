import { Metadata } from "next";
import { RSVPClient } from "./RSVPClient";
import { getGuestByCode, getRSVPByGuestId } from "@/lib/supabase";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: `RSVP | ${weddingConfig.meta.title}`,
  description: "Please let us know if you can join us for our wedding celebration.",
};

interface PageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function RSVPPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const code = params.code || "";

  // If no code provided, show a message to use the link from invitation
  if (!code) {
    return (
      <>
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
                You are Invited
              </p>
              <h1 
                className="font-serif text-4xl md:text-6xl italic mb-4 md:mb-6"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                RSVP
              </h1>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
          <Container size="content">
            <div className="text-center max-w-xl mx-auto px-2">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: "rgba(195, 123, 96, 0.1)" }}
              >
                <EnvelopeIcon className="h-10 w-10" style={{ color: "#C37B60" }} />
              </div>
              <h2 
                className="font-serif text-2xl md:text-3xl italic mb-4"
                style={{ color: "#2D2926", fontWeight: 400 }}
              >
                Please use your personal link
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
                To RSVP, please use the personalized link from your invitation or Save the Date.
              </p>
            </div>
          </Container>
        </section>
      </>
    );
  }

  // Lookup guest by code from Supabase
  const guest = await getGuestByCode(code);

  // If code is invalid, show error
  if (!guest) {
    return (
      <>
        <section 
          className="pt-24 pb-16 md:pt-32 md:pb-20" 
          style={{ backgroundColor: "#F5F5F0" }}
        >
          <Container size="content">
            <div className="text-center px-2">
              <h1 
                className="font-serif text-4xl md:text-6xl italic mb-4 md:mb-6"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                RSVP
              </h1>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
          <Container size="content">
            <div className="text-center max-w-xl mx-auto px-2">
              <h2 
                className="font-serif text-2xl md:text-3xl italic mb-4"
                style={{ color: "#2D2926", fontWeight: 400 }}
              >
                Invalid Invitation Code
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
                We couldn&apos;t find your invitation. Please check the link or contact us directly.
              </p>
            </div>
          </Container>
        </section>
      </>
    );
  }

  // Check if guest already has an RSVP
  const existingRSVP = await getRSVPByGuestId(guest.id);

  return (
    <RSVPClient
      guest={guest}
      existingRSVP={existingRSVP}
      deadline={weddingConfig.rsvp.deadline}
    />
  );
}
