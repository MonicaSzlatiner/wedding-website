import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { weddingConfig } from "@/config/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  title: weddingConfig.meta.title,
  description: weddingConfig.meta.description,
  themeColor: "#F5F5F0",
  openGraph: {
    title: weddingConfig.meta.title,
    description: weddingConfig.meta.description,
    url: weddingConfig.meta.siteUrl,
    siteName: weddingConfig.couple.names,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased" style={{ backgroundColor: "#F5F5F0", color: "#2D2926" }}>
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-sage-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
