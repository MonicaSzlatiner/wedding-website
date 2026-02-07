/**
 * Animation configuration and variants for Framer Motion
 * 
 * Philosophy: Luxury editorial - motion should reveal, never perform.
 * Standard: Bottega Veneta, Celine, Aesop, The Row level restraint.
 * Performance: All animations use transform and opacity for 60fps.
 * Accessibility: Respects prefers-reduced-motion.
 */

import { Variants } from "framer-motion";

// Timing constants (in seconds) - Luxury editorial grade
export const TIMING = {
  // Interactions (hover, click)
  fast: 0.25,
  interaction: 0.3,
  // Reveals
  normal: 0.7,
  slow: 1.0,
  // Stagger between sequential items
  stagger: 0.1,
  staggerFast: 0.08,
} as const;

// Easing curves - editorial, never bounce or spring
export const EASING = {
  // Primary easing - smooth, confident deceleration
  out: [0.25, 0.1, 0.25, 1.0] as const,
  // Gentle ease in-out for symmetrical animations
  inOut: [0.4, 0, 0.2, 1] as const,
  // Subtle ease for interactions
  subtle: [0.25, 0.46, 0.45, 0.94] as const,
} as const;

/**
 * Fade up animation - the workhorse for scroll reveals
 * Subtle 30px upward drift with fade (editorial standard)
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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
 * Stagger container - for sections with multiple elements
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.stagger,
      delayChildren: 0.08,
    },
  },
};

/**
 * Stagger item - individual items in a staggered animation
 */
export const staggerItem: Variants = {
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
 * Fade in with subtle scale settle - for hero images
 * The 1.03 → 1.0 scale creates a "camera settling" effect
 */
export const fadeInScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.03,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.slow,
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
 * Card hover - lift + shadow (luxury approach, no scale)
 */
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    transition: {
      duration: TIMING.interaction,
      ease: EASING.out,
    },
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
    transition: {
      duration: TIMING.interaction,
      ease: EASING.out,
    },
  },
};

/**
 * Line grow from center - for decorative rules
 */
export const lineGrowVariants: Variants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
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
