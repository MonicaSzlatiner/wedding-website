import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/styles/globals.css";

// Cormorant Garamond - elegant serif for headings/names
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Manrope - clean sans-serif for body text, buttons, utility
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Save the Date | Laurens & Monica",
  description: "You're invited to celebrate our wedding on August 1, 2026.",
  themeColor: "#F5F5F0",
};

/**
 * Save the Date Layout
 * 
 * A minimal layout without Header/Footer for a focused invitation experience.
 * The primary CTA is "View Wedding Website" which takes guests to the main site.
 */
export default function SaveTheDateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body 
        className="min-h-screen flex flex-col font-sans antialiased" 
        style={{ backgroundColor: "#F5F5F0", color: "#2D2926" }}
      >
        <main className="flex-1" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
