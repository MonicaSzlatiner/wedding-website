/**
 * Animation configuration and variants for Framer Motion
 * 
 * Philosophy: Restrained elegance. Animations guide attention, don't demand it.
 * Performance: All animations use transform and opacity for 60fps.
 * Accessibility: Respects prefers-reduced-motion.
 */

import { Variants } from "framer-motion";

// Timing constants (in seconds)
export const TIMING = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  stagger: 0.1,
} as const;

// Easing curves - subtle, natural feeling
export const EASING = {
  // Smooth deceleration - feels premium
  out: [0.16, 1, 0.3, 1],
  // Gentle ease in-out
  inOut: [0.4, 0, 0.2, 1],
} as const;

/**
 * Fade up animation - the workhorse for scroll reveals
 * Subtle 20px upward drift with fade
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.out,
    },
  },
};

/**
 * Stagger container - for hero sections with multiple elements
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.stagger,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger item - individual items in a staggered animation
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.out,
    },
  },
};

/**
 * Fade in only (no movement) - for images
 */
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: TIMING.slow,
      ease: EASING.out,
    },
  },
};

/**
 * Scale up subtle - for card hover states
 */
export const scaleUpVariants: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: TIMING.fast,
      ease: EASING.out,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: TIMING.fast,
      ease: EASING.out,
    },
  },
};

/**
 * Viewport settings for scroll-triggered animations
 * Triggers when 15% of element is visible, only animates once
 */
export const viewportSettings = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -50px 0px",
};

/**
 * Mobile-optimized viewport settings
 * Earlier trigger, respects mobile performance
 */
export const mobileViewportSettings = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -30px 0px",
};
