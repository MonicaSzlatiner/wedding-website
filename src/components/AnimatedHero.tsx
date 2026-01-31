"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedHeroProps {
  couple: { person1: string; person2: string };
  date: { full: string; timeDisplay: string };
  venue: { name: string; city: string };
  children?: ReactNode;
}

/**
 * AnimatedHero - Modern Editorial aesthetic
 * 
 * Design Philosophy:
 * - Thick khaki outer frame (40-60px)
 * - 50/50 split: Sage green left panel + Full-height image right
 * - Bottom-left aligned text (magazine feel)
 * - Ghost circle RSVP button overlapping the seam
 * - Typography: Cormorant Garamond for names, Montserrat for utility
 */
export function AnimatedHero({ couple, date, venue, children }: AnimatedHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const imageVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const textVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const floatingButtonVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: shouldReduceMotion ? 0 : 0.6 },
    },
  };

  return (
    <>
      {/* ============================================
          MOBILE: Stacked layout with cream frame
          ============================================ */}
      <section className="lg:hidden">
        {/* Outer cream frame */}
        <div className="p-3 sm:p-4 min-h-screen" style={{ backgroundColor: "#E8E6E1" }}>
          {/* Inner content */}
          <div className="min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] flex flex-col" style={{ backgroundColor: "#6B705C" }}>
            {/* Image section */}
            <motion.div 
              className="relative h-[55vh] w-full"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              <Image
                src="/images/hero-home.jpg"
                alt={`${couple.person1} and ${couple.person2}`}
                fill
                className="object-cover object-top"
                priority
                sizes="100vw"
              />
              
              {/* Ghost circle RSVP button - overlapping at seam */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={floatingButtonVariants}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/rsvp"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/40 backdrop-blur-sm
                               flex items-center justify-center text-white text-xs sm:text-sm font-sans font-normal
                               hover:border-white/70 transition-all duration-300"
                    style={{ letterSpacing: "0.15em", backgroundColor: "rgba(107, 112, 92, 0.6)" }}
                  >
                    RSVP
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Content section - bottom aligned */}
            <div className="flex-1 flex flex-col justify-end p-6 sm:p-8 pt-16">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                {/* "The Wedding of" - larger text */}
                <p 
                  className="text-white/70 text-lg sm:text-xl font-serif mb-4"
                  style={{ fontWeight: 400 }}
                >
                  The Wedding of
                </p>
                
                {/* Names - large serif, elegant */}
                <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.05] tracking-tight mb-6" style={{ fontWeight: 400 }}>
                  <span>{couple.person1}</span>
                  <span className="text-white/70"> &</span>
                  <br />
                  <span>{couple.person2}</span>
                </h1>
                
                {/* Date - spelled out */}
                <p 
                  className="text-white/50 text-sm sm:text-base font-sans"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {date.full}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          DESKTOP: Split layout with cream frame
          ============================================ */}
      <section className="hidden lg:block relative">
        {/* Outer cream frame */}
        <div className="p-5 xl:p-6 min-h-screen" style={{ backgroundColor: "#E8E6E1" }}>
          {/* Inner split layout */}
          <div className="flex h-[calc(100vh-40px)] xl:h-[calc(100vh-48px)] relative">
            
            {/* Left Panel - Sage green with bottom-left aligned text */}
            <motion.div 
              className="w-[45%] flex flex-col justify-end p-10 xl:p-14 2xl:p-16"
              style={{ backgroundColor: "#6B705C" }}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {/* "The Wedding of" - larger text */}
              <motion.p 
                className="text-white/70 text-xl xl:text-2xl font-serif mb-6"
                style={{ fontWeight: 400 }}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
              >
                The Wedding of
              </motion.p>
              
              {/* Names - Large elegant serif */}
              <motion.h1 
                className="font-serif text-6xl xl:text-7xl 2xl:text-8xl text-white leading-[1.02] tracking-tight mb-8"
                style={{ fontWeight: 400 }}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.3 }}
              >
                <span>{couple.person1}</span>
                <span className="text-white/60"> &</span>
                <br />
                <span>{couple.person2}</span>
              </motion.h1>
              
              {/* Date - spelled out */}
              <motion.p 
                className="text-white/50 text-base xl:text-lg font-sans"
                style={{ letterSpacing: "0.1em" }}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.5 }}
              >
                {date.full}
              </motion.p>
            </motion.div>

            {/* Right Panel - Full-height image (55% width) */}
            <motion.div 
              className="w-[55%] relative"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              <Image
                src="/images/hero-home.jpg"
                alt={`${couple.person1} and ${couple.person2}`}
                fill
                className="object-cover"
                priority
                sizes="55vw"
              />
            </motion.div>

            {/* Ghost Circle RSVP - positioned at the seam like reference */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={floatingButtonVariants}
              className="absolute left-[45%] top-1/3 -translate-x-1/2 z-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/rsvp"
                  className="w-24 h-24 xl:w-28 xl:h-28 rounded-full border border-white/40 backdrop-blur-sm
                             flex items-center justify-center text-white text-sm font-sans font-normal
                             hover:border-white/70 transition-all duration-300"
                  style={{ letterSpacing: "0.15em", backgroundColor: "rgba(107, 112, 92, 0.5)" }}
                >
                  RSVP
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
