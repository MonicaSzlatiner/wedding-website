import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface SplitHeroProps {
  // Left panel content
  date?: string;
  title: string;
  subtitle?: string;
  // Right panel image
  imageSrc?: string;
  imageAlt?: string;
  // Optional floating CTA
  ctaLabel?: string;
  ctaHref?: string;
  // Additional content below title
  children?: ReactNode;
  // Layout options
  reversed?: boolean; // Image on left, content on right
  fullHeight?: boolean;
}

export function SplitHero({
  date,
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  ctaLabel,
  ctaHref,
  children,
  reversed = false,
  fullHeight = true,
}: SplitHeroProps) {
  return (
    <section
      className={`relative ${fullHeight ? "min-h-screen" : "min-h-[70vh]"} flex`}
    >
      {/* Left Panel - Sage Background with Content */}
      <div
        className={`w-full lg:w-1/2 bg-sage-600 flex flex-col justify-end p-8 md:p-12 lg:p-16 ${
          reversed ? "order-2" : "order-1"
        }`}
      >
        {/* Date */}
        {date && (
          <p className="text-white/70 text-sm tracking-widest uppercase mb-6">
            {date}
          </p>
        )}

        {/* Title */}
        <h1 className="font-serif text-display-md md:text-display-lg lg:text-display-xl text-white mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/80 text-lg md:text-xl max-w-md mb-8">
            {subtitle}
          </p>
        )}

        {/* Additional content */}
        {children}
      </div>

      {/* Right Panel - Image */}
      <div
        className={`hidden lg:block lg:w-1/2 relative ${
          reversed ? "order-1" : "order-2"
        }`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        ) : (
          // Placeholder gradient when no image
          <div className="absolute inset-0 bg-gradient-to-br from-stone-300 to-stone-400" />
        )}
      </div>

      {/* Floating RSVP CTA Button */}
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex
                     w-28 h-28 rounded-full border-2 border-white/40 bg-sage-600/80 backdrop-blur-sm
                     items-center justify-center text-white text-sm font-medium tracking-wider
                     hover:bg-sage-700 hover:border-white/60 transition-all duration-300
                     shadow-lg"
        >
          {ctaLabel}
        </Link>
      )}
    </section>
  );
}
