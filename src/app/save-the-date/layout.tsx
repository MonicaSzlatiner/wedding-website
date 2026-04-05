import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#F5F5F0",
};

export const metadata: Metadata = {
  title: "Save the Date | Laurens & Monica",
  description: "You're invited to celebrate our wedding on August 1, 2026.",
};

/**
 * Minimal shell (no site header/footer — those live only under the (public) route group).
 */
export default function SaveTheDateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="main-content" className="flex-1" role="main">
      {children}
    </main>
  );
}
