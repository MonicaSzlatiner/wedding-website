import { Metadata } from "next";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "L & M | Wedding Brief",
  description: "Wedding brief — internal use only",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function WeddingBriefLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="flex-1" role="main">
      <div className={jost.variable}>{children}</div>
    </main>
  );
}
