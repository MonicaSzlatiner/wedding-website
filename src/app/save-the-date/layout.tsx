import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#F5F5F0",
};

export const metadata: Metadata = {
  title: "Save the Date | Laurens & Monica",
  description: "You're invited to celebrate our wedding on August 1, 2026.",
};

/**
 * Save the Date — metadata only. Root layout omits header/footer when x-pathname is /save-the-date.
 */
export default function SaveTheDateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
