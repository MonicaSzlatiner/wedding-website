"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedHeroProps {
  couple: { person1: string; person2: string };
  date: { full: string; timeDisplay: string };
  venue: { name: string; city: string };
  children?: ReactNode;
}

/**
 * AnimatedHero - Quiet Luxury aesthetic
 * 
 * Design Philosophy:
 * - Asymmetric layout: Names left, image right
 * - Large italic serif typography with terracotta accent
 * - Grayscale hover effect on image
 * - Clean, minimal background
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

  return (
    <>
      {/* ============================================
          MOBILE: Stacked layout
          ============================================ */}
      <section id="home" className="lg:hidden">
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F5F0" }}>
          {/* Names section - top aligned */}
          <div className="px-6 pt-6 pb-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {/* Names - Large italic serif */}
              <h1 className="font-serif leading-[0.95] tracking-tight" style={{ fontWeight: 400 }}>
                <span 
                  className="block text-6xl sm:text-7xl italic"
                  style={{ color: "#2D2926" }}
                >
                  {couple.person1}
                </span>
                <span 
                  className="block text-6xl sm:text-7xl italic mt-1"
                  style={{ color: "#C37B60" }}
                >
                  & {couple.person2}
                </span>
              </h1>
              
              {/* Date and Location */}
              <div className="mt-6 flex flex-col gap-1">
                <p 
                  className="text-[10px] uppercase font-bold"
                  style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.6)" }}
                >
                  {date.full}
                </p>
                <p 
                  className="text-[10px] uppercase font-bold"
                  style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.6)" }}
                >
                  {venue.city}
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Image section - fills remaining space */}
          <motion.div 
            className="relative flex-1 min-h-[50vh]"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <Image
              src="/images/hero-home.jpg"
              alt={`${couple.person1} and ${couple.person2}`}
              fill
              className="object-cover object-top grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
              priority
              sizes="100vw"
            />
          </motion.div>
        </div>
      </section>

      {/* ============================================
          DESKTOP: Asymmetric split layout
          ============================================ */}
      <section id="home" className="hidden lg:block relative">
        <div className="min-h-screen px-6 xl:px-12 2xl:px-20 py-10" style={{ backgroundColor: "#F5F5F0" }}>
          {/* Grid layout - names left, image right */}
          <div className="grid grid-cols-12 gap-8 min-h-[calc(100vh-80px)] items-center">
            
            {/* Left - Names (spans 5 columns) */}
            <motion.div 
              className="col-span-5 flex flex-col justify-center"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {/* Large italic serif names */}
              <h1 className="font-serif leading-[0.9] tracking-tight" style={{ fontWeight: 400 }}>
                <motion.span 
                  className="block text-7xl xl:text-8xl 2xl:text-9xl italic"
                  style={{ color: "#2D2926" }}
                  initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
                >
                  {couple.person1}
                </motion.span>
                <motion.span 
                  className="block text-7xl xl:text-8xl 2xl:text-9xl italic mt-2"
                  style={{ color: "#C37B60" }}
                  initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.35 }}
                >
                  & {couple.person2}
                </motion.span>
              </h1>
              
              {/* Date and Location - below names */}
              <motion.div 
                className="mt-10 flex flex-col gap-1"
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.5 }}
              >
                <p 
                  className="text-[11px] uppercase font-bold"
                  style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.6)" }}
                >
                  {date.full}
                </p>
                <p 
                  className="text-[11px] uppercase font-bold"
                  style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.6)" }}
                >
                  {venue.city}
                </p>
              </motion.div>
            </motion.div>

            {/* Right - Image (spans 7 columns) */}
            <motion.div 
              className="col-span-7 relative h-[75vh] xl:h-[80vh]"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              <Image
                src="/images/hero-home.jpg"
                alt={`${couple.person1} and ${couple.person2}`}
                fill
                className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                priority
                sizes="60vw"
              />
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
