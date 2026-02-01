import { Metadata } from "next";
import { SaveTheDateClient } from "./SaveTheDateClient";
import guestsData from "@/data/guests.json";

export const metadata: Metadata = {
  title: "Save the Date | Laurens & Monica",
  description: "You're invited to celebrate our wedding on August 1, 2026.",
};

interface GuestData {
  name: string;
  plusOne: boolean;
}

interface GuestsMap {
  [code: string]: GuestData;
}

interface PageProps {
  searchParams: Promise<{ code?: string; admin?: string }>;
}

export default async function SaveTheDatePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const code = params.code || "";
  const isAdmin = params.admin === "1";

  // Lookup guest by code
  const guests = guestsData as GuestsMap;
  const guest = code ? guests[code] : null;

  return (
    <SaveTheDateClient
      guestName={guest?.name || null}
      hasPlusOne={guest?.plusOne || false}
      code={code}
      isAdmin={isAdmin}
      isValidCode={!!guest}
    />
  );
}
