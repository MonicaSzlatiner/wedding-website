"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TIMING, EASING } from "@/lib/animations";

interface AnimatedImageProps extends Omit<ImageProps, "onLoad"> {
  /**
   * Whether to animate on load (fade in)
   */
  animate?: boolean;
}

/**
 * AnimatedImage - Next.js Image with subtle fade-in on load
 * 
 * - No placeholder blur jump
 * - Smooth fade reveals image
 * - Respects reduced motion
 */
export function AnimatedImage({
  animate = true,
  className = "",
  ...props
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion or no animation, render standard image
  if (shouldReduceMotion || !animate) {
    return <Image className={className} {...props} />;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{
        duration: TIMING.slow,
        ease: EASING.out,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Image
        {...props}
        className={className}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  );
}
