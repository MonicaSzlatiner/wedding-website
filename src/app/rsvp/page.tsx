import { Metadata } from "next";
import { weddingConfig } from "@/config/content";
import { RSVPClient } from "./RSVPClient";

export const metadata: Metadata = {
  title: `RSVP | ${weddingConfig.meta.title}`,
  description:
    "Let us know if you can join us for our wedding celebration at Parkheuvel, Rotterdam.",
};

export default function RSVPPage() {
  return <RSVPClient />;
}
