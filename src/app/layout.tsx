import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { weddingConfig } from "@/config/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F5F0",
};

export const metadata: Metadata = {
  title: weddingConfig.meta.title,
  description: weddingConfig.meta.description,
  openGraph: {
    title: weddingConfig.meta.title,
    description: weddingConfig.meta.description,
    url: weddingConfig.meta.siteUrl,
    siteName: weddingConfig.couple.names,
    locale: "en_US",
    type: "website",
  },
};

const MINIMAL_PREFIXES = ["/save-the-date", "/wedding-brief"] as const;

function isMinimalPath(pathname: string): boolean {
  return MINIMAL_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = headers().get("x-pathname") ?? "";
  const minimal = isMinimalPath(pathname);

  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body
        className="min-h-screen flex flex-col font-sans antialiased"
        style={{ backgroundColor: "#F5F5F0", color: "#2D2926" }}
        suppressHydrationWarning
      >
        {minimal ? (
          <main id="main-content" className="flex-1" role="main">
            {children}
          </main>
        ) : (
          <>
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
          </>
        )}
      </body>
    </html>
  );
}
