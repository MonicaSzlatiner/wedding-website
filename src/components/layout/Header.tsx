"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/config/content";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

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

  // Show solid header when scrolled or menu is open
  const showSolidHeader = isScrolled || menuOpen;

  // Menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      transition: { duration: 0.15 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        showSolidHeader ? "backdrop-blur-sm" : "bg-transparent"
      }`}
      style={showSolidHeader ? { backgroundColor: "rgba(107, 112, 92, 0.95)" } : undefined}
    >
      <nav className="px-6 md:px-16 lg:px-20" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand - couple names */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="font-serif text-lg md:text-xl text-white hover:opacity-80 transition-opacity"
            style={{ fontWeight: 400 }}
          >
            L & M
          </a>

          {/* Hamburger Menu Button - visible on all screen sizes */}
          <button
            type="button"
            className="p-2 -mr-2 transition-colors duration-200 text-white hover:opacity-80"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Full-screen Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="nav-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 top-16 md:top-20"
              style={{ backgroundColor: "#6B705C" }}
              role="menu"
            >
              <div className="h-full flex flex-col justify-center items-center space-y-6 md:space-y-8 px-6">
                {navigation.items.map((item, index) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
                    >
                      <a
                        href={item.href}
                        role="menuitem"
                        aria-current={isActive ? "page" : undefined}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={`block font-serif text-3xl md:text-4xl lg:text-5xl transition-all duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-white/50 hover:text-white"
                        }`}
                        style={{ fontWeight: 400 }}
                      >
                        {item.label}
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="h-0.5 bg-white mt-1 mx-auto"
                            style={{ width: "40px" }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
