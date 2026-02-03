import { Metadata } from "next";
import { SaveTheDateClient } from "./SaveTheDateClient";
import { getGuestByCode } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Save the Date | Laurens & Monica",
  description: "You're invited to celebrate our wedding on August 1, 2026.",
  openGraph: {
    title: "Save the Date - Laurens & Monica",
    description: "You're invited to celebrate our wedding on August 1, 2026.",
  },
};

interface PageProps {
  searchParams: Promise<{ code?: string; admin?: string }>;
}

export default async function SaveTheDatePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const code = params.code || "";
  const isAdmin = params.admin === "1";

  // Lookup guest by code from Supabase
  const guest = code ? await getGuestByCode(code) : null;

  return (
    <SaveTheDateClient
      guestName={guest?.name || null}
      hasPlusOne={guest?.plus_one_allowed || false}
      code={code}
      isAdmin={isAdmin}
      isValidCode={!!guest}
      guestId={guest?.id || null}
    />
  );
}
