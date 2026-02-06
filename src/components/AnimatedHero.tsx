"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedHeroProps {
  couple: { person1: string; person2: string };
  date: { full: string; timeDisplay: string };
  venue: { name: string; city: string; country: string };
  children?: ReactNode;
}

/**
 * AnimatedHero - Quiet Luxury aesthetic
 * 
 * Design Philosophy:
 * - Asymmetric overlapping layout: Names left (cols 1-8), image right (cols 6-13)
 * - Massive italic serif typography with terracotta accent
 * - "& Monica" indented with ml-24
 * - Grayscale hover effect on image with rounded corners and shadow
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
      <section id="home" className="md:hidden">
        <div className="min-h-screen flex flex-col pt-12 pb-20" style={{ backgroundColor: "#F5F5F0" }}>
          {/* Names section - centered on mobile */}
          <div className="px-6 pb-8 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {/* Names - Large italic serif */}
              <h1 className="font-serif leading-[0.8] tracking-tight" style={{ fontWeight: 400 }}>
                <span 
                  className="block text-[5rem] italic"
                  style={{ color: "#2D2926" }}
                >
                  {couple.person1}
                </span>
                <span 
                  className="block text-[5rem] italic"
                  style={{ color: "#C37B60" }}
                >
                  & {couple.person2}
                </span>
              </h1>
              
              {/* Date and Location */}
              <div className="mt-8 flex flex-col md:flex-row items-center gap-4 md:gap-12">
                <div className="text-center">
                  <p 
                    className="text-[11px] uppercase font-bold"
                    style={{ letterSpacing: "0.4em", color: "rgba(45, 41, 38, 0.8)" }}
                  >
                    {date.full}
                  </p>
                  <p 
                    className="font-serif text-lg md:text-xl font-light italic mt-1"
                    style={{ color: "#2D2926" }}
                  >
                    {venue.city}, the {venue.country}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Image section - fills remaining space */}
          <motion.div 
            className="relative flex-1 min-h-[50vh] mx-6"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <div className="relative w-full h-full aspect-[4/5] rounded-xl shadow-2xl overflow-hidden">
              <Image
                src="/images/hero-home.jpg"
                alt={`${couple.person1} and ${couple.person2}`}
                fill
                className="object-cover object-top grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                priority
                sizes="100vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          DESKTOP: Asymmetric overlapping layout
          ============================================ */}
      <section id="home" className="hidden md:block relative overflow-hidden">
        <div className="pt-12 md:pt-20 pb-20 px-6" style={{ backgroundColor: "#F5F5F0" }}>
          {/* Grid layout - overlapping: text cols 1-8, image cols 6-13 */}
          <div className="max-w-[1200px] mx-auto">
            <div className="relative grid grid-cols-12 items-center gap-8 md:gap-0">
              
              {/* Left - Names (cols 1-8, z-10 to appear above image) */}
              <motion.div 
                className="col-start-1 col-end-9 z-10 text-left"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                {/* Large italic serif names */}
                <h1 className="font-serif leading-[0.8] tracking-tight mb-8" style={{ fontWeight: 400 }}>
                  <motion.span 
                    className="block text-[5rem] md:text-[9rem] italic"
                    style={{ color: "#2D2926" }}
                    initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    {couple.person1}
                  </motion.span>
                  <motion.span 
                    className="block text-[5rem] md:text-[9rem] italic md:ml-24"
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
                  className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 md:ml-4"
                  initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.5 }}
                >
                  <div className="text-left">
                    <p 
                      className="text-[11px] uppercase font-bold"
                      style={{ letterSpacing: "0.4em", color: "rgba(45, 41, 38, 0.8)" }}
                    >
                      {date.full}
                    </p>
                    <p 
                      className="font-serif text-lg md:text-xl font-light italic"
                      style={{ color: "rgba(45, 41, 38, 0.9)" }}
                    >
                      {venue.city}, the {venue.country}
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right - Image (cols 6-13, overlaps with text) */}
              <motion.div 
                className="col-start-6 col-end-13 relative"
                initial="hidden"
                animate="visible"
                variants={imageVariants}
              >
                <div className="w-full aspect-[4/5] rounded-xl shadow-2xl overflow-hidden">
                  <Image
                    src="/images/hero-home.jpg"
                    alt={`${couple.person1} and ${couple.person2}`}
                    fill
                    className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                    priority
                    sizes="60vw"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
