"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Luxury editorial easing
const EASING = [0.25, 0.1, 0.25, 1.0] as const;

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** 
   * Parallax speed multiplier (default: 0.1 = 10% slower than scroll)
   * Higher values = more parallax effect
   */
  speed?: number;
  /**
   * Enable clip reveal animation from center
   */
  clipReveal?: boolean;
  /**
   * Container height (default: 400px)
   */
  height?: string;
  /**
   * Object position for the image (e.g., "center top", "center 30%")
   * Use to show more of specific parts of the image
   */
  objectPosition?: string;
  /**
   * Use object-contain instead of object-cover (no zoom/crop)
   */
  contain?: boolean;
  /**
   * Aspect ratio for the container (e.g., "4/3", "16/9")
   * When set, height is ignored and aspect ratio is used instead
   */
  aspectRatio?: string;
}

/**
 * ParallaxImage - Luxury editorial image component
 * 
 * Features:
 * - Subtle parallax (image moves 10-15% slower than scroll)
 * - Optional clip reveal from center (editorial curtain effect)
 * - Grayscale hover effect
 * - Respects prefers-reduced-motion
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  priority = false,
  speed = 0.1,
  clipReveal = true,
  height = "400px",
  objectPosition = "center center",
  contain = false,
  aspectRatio,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves slower than scroll (5% up/down)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-5%", "5%"]
  );

  // Clip reveal: curtain opens from center
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3],
    clipReveal && !shouldReduceMotion 
      ? ["inset(0% 40% 0% 40%)", "inset(0% 0% 0% 0%)"]
      : ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Opacity fade in with clip
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    shouldReduceMotion ? [1, 1] : [0, 1]
  );

  // Container style: use aspectRatio if provided, otherwise height
  const containerStyle = aspectRatio 
    ? { aspectRatio, backgroundColor: "#E8E8E1" }
    : { height, backgroundColor: "#E8E8E1" };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl shadow-sm ${className}`}
      style={containerStyle}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          y: contain ? 0 : y, // No parallax when using contain
          clipPath,
          opacity,
        }}
      >
        {/* Image container - no scale when using contain */}
        <div className={`absolute inset-0 ${contain ? "" : "scale-110"}`}>
          <Image
            src={src}
            alt={alt}
            fill
            className={`${contain ? "object-contain" : "object-cover"} grayscale-[20%] hover:grayscale-0 transition-all duration-1000`}
            style={{ objectPosition }}
            sizes="100vw"
            priority={priority}
          />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * SimpleRevealImage - Fade + scale settle without parallax
 * 
 * For inline images that don't need parallax but should still
 * have the luxury editorial reveal treatment.
 */
export function RevealImage({
  src,
  alt,
  className = "",
  priority = false,
  aspectRatio = "16/10",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl shadow-lg ${className}`}
      style={{ aspectRatio }}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.0, ease: EASING }}
    >
      <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-1000">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
    </motion.div>
  );
}
