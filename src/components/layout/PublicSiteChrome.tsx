import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/** Shared header + main landmark + footer for the main wedding site. */
export function PublicSiteChrome({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
