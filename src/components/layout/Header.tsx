"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/config/content";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// Luxury editorial easing - never bounce, never spring
const EASING = [0.25, 0.1, 0.25, 1.0] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { navigation } = weddingConfig;
  const shouldReduceMotion = useReducedMotion();

  // Track scroll position for header background and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = navigation.items.map(item => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigation.items]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Smooth scroll to section
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetId === "home" ? 0 : offsetPosition,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }

    setMenuOpen(false);
  }, [shouldReduceMotion]);

  // Menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.2, ease: EASING },
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3, ease: EASING },
    },
  };

  return (
    <>
      {/* Header Bar - 0.4s transition for luxury feel */}
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,padding] duration-[400ms] ease-out ${
          isScrolled ? "backdrop-blur-md border-espresso/5" : "border-transparent"
        }`}
        style={{ 
          backgroundColor: isScrolled ? "rgba(245, 245, 240, 0.95)" : "transparent"
        }}
      >
        <nav className="max-content px-6 py-6 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo - L&M italic serif */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="font-serif text-3xl italic font-medium tracking-tight hover:opacity-80 transition-opacity"
            style={{ color: "#2D2926" }}
          >
            L&M
          </a>

          {/* Desktop Navigation with sliding active underline */}
          <div className="hidden md:flex items-center gap-10">
            {navigation.items.slice(1).map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="relative text-[10px] uppercase font-bold transition-colors duration-[250ms] hover:text-espresso py-1"
                  style={{ 
                    letterSpacing: "0.3em",
                    color: isActive ? "#2D2926" : "rgba(45, 41, 38, 0.6)"
                  }}
                >
                  {item.label}
                  {/* Sliding underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[1px]"
                      style={{ backgroundColor: "#C37B60" }}
                      transition={{ 
                        type: "tween", 
                        duration: shouldReduceMotion ? 0 : 0.3,
                        ease: EASING 
                      }}
                    />
                  )}
                </a>
              );
            })}
            {/* RSVP Button - Terracotta accent */}
            <a
              href="#rsvp"
              onClick={(e) => scrollToSection(e, "#rsvp")}
              className="text-[10px] uppercase font-black px-6 py-2 rounded-full border transition-all hover:bg-terracotta hover:text-white"
              style={{ 
                letterSpacing: "0.4em",
                color: "#C37B60",
                borderColor: "rgba(195, 123, 96, 0.2)"
              }}
            >
              RSVP
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 transition-colors duration-200 hover:opacity-80"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            style={{ color: "#2D2926" }}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Full-screen Menu Overlay - Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nav-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ backgroundColor: "#2D2926" }}
            role="menu"
          >
            {/* Menu Content - starts below header */}
            <div className="flex-1 flex flex-col justify-start pt-24 px-6">
              <div className="space-y-4">
                {navigation.items.map((item, index) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
                    >
                      <a
                        href={item.href}
                        role="menuitem"
                        aria-current={isActive ? "page" : undefined}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={`block font-serif text-4xl italic transition-all duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-white/40 hover:text-white"
                        }`}
                        style={{ fontWeight: 400, lineHeight: 1.3 }}
                      >
                        {item.label}
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Footer in mobile menu */}
            <div className="p-6 border-t border-white/10">
              <p className="font-serif text-lg italic text-white/40">
                Laurens & Monica — 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
