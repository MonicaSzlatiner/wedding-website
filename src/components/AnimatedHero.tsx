"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TIMING, EASING } from "@/lib/animations";

interface AnimatedHeroProps {
  couple: { person1: string; person2: string };
  date: { full: string; timeDisplay: string };
  venue: { name: string; city: string };
  children?: ReactNode;
}

/**
 * AnimatedHero - Homepage hero with subtle staggered animations
 * 
 * Desktop: Split layout with staggered text reveal
 * Mobile: Stacked layout with subtle fade-ins
 * Respects reduced motion preferences
 */
export function AnimatedHero({ couple, date, venue, children }: AnimatedHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: shouldReduceMotion ? 1 : 0, 
      y: shouldReduceMotion ? 0 : 20 
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

  const imageVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: TIMING.slow,
        ease: EASING.out,
      },
    },
  };

  const floatingButtonVariants = {
    hidden: { 
      opacity: shouldReduceMotion ? 1 : 0, 
      scale: shouldReduceMotion ? 1 : 0.9 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: TIMING.normal,
        ease: EASING.out,
        delay: shouldReduceMotion ? 0 : 0.6,
      },
    },
  };

  return (
    <section className="relative">
      {/* Mobile: Stacked layout */}
      <div className="lg:hidden">
        {/* Image section */}
        <motion.div 
          className="relative h-[65vh] w-full"
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
        </motion.div>
        
        {/* Content section */}
        <motion.div 
          className="bg-sage-600 px-6 py-10 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p 
            className="text-white/80 text-xs tracking-widest uppercase mb-3"
            style={{ letterSpacing: "3px" }}
            variants={itemVariants}
          >
            The Wedding of
          </motion.p>
          <motion.div className="mb-6" variants={itemVariants}>
            <div className="font-serif text-display-sm text-white leading-tight" style={{ letterSpacing: "2px" }}>
              <div>{couple.person1}</div>
              <div>&</div>
              <div>{couple.person2}</div>
            </div>
          </motion.div>
          <motion.div className="space-y-2 mb-6 text-white/90 text-sm" variants={itemVariants}>
            <div className="flex items-center justify-center gap-2">
              <span>{venue.name}, {venue.city}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>{date.full}</span>
            </div>
          </motion.div>
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop: Split layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Panel */}
        <motion.div 
          className="w-1/2 bg-sage-600 flex flex-col justify-end p-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p 
            className="text-white text-sm tracking-widest uppercase mb-4"
            style={{ letterSpacing: "2px" }}
            variants={itemVariants}
          >
            The Wedding of
          </motion.p>
          <motion.div className="mb-10" variants={itemVariants}>
            <div className="font-serif text-display-lg xl:text-display-xl text-white leading-tight w-fit" style={{ letterSpacing: "2px" }}>
              <div>{couple.person1}</div>
              <div className="text-center">&</div>
              <div>{couple.person2}</div>
            </div>
          </motion.div>
          <motion.div className="space-y-3 mb-12" variants={itemVariants}>
            <div className="flex items-center gap-3 text-white">
              <span>{venue.name}, {venue.city}</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span>{date.full} at {date.timeDisplay}</span>
            </div>
          </motion.div>
          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>

        {/* Right Panel - Image */}
        <motion.div 
          className="w-1/2 relative"
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
            sizes="50vw"
          />
        </motion.div>

        {/* Floating RSVP Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={floatingButtonVariants}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <Link
            href="/rsvp"
            className="w-28 h-28 rounded-full border-2 border-white/40 bg-sage-600/90 backdrop-blur-sm
                       flex items-center justify-center text-white text-sm font-medium tracking-wider uppercase
                       hover:bg-sage-700 hover:border-white/60 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            RSVP
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
