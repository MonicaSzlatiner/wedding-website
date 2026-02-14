import { Metadata } from "next";

export const metadata: Metadata = {
  title: "M & L | Mood Board",
  description: "Wedding aesthetic mood board - Japandi style",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function MoodboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
