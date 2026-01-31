"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/config/content";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

/**
 * NavLink with animated underline
 */
function NavLink({ 
  href, 
  isActive, 
  showSolidHeader, 
  children 
}: { 
  href: string; 
  isActive: boolean; 
  showSolidHeader: boolean; 
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link
      href={href}
      role="menuitem"
      aria-current={isActive ? "page" : undefined}
      style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}
      className={`relative font-sans font-medium uppercase transition-colors duration-200 group ${
        isActive
          ? showSolidHeader ? "text-white" : "text-white"
          : showSolidHeader
          ? "text-white/60 hover:text-white"
          : "text-white/60 hover:text-white"
      }`}
    >
      {children}
      {/* Animated underline */}
      <span
        className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-200 ease-out ${
          isActive 
            ? "w-full bg-white"
            : "w-0 group-hover:w-full bg-white/60"
        }`}
      />
    </Link>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { navigation } = weddingConfig;
  const shouldReduceMotion = useReducedMotion();

  // Check if we're on the home page (which has a dark hero)
  const isHomePage = pathname === "/";

  // Track scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show solid header when scrolled or menu is open
  const showSolidHeader = isScrolled || mobileMenuOpen || !isHomePage;

  // Mobile menu animation variants
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
        showSolidHeader
          ? "backdrop-blur-sm"
          : "bg-transparent"
      }`}
      style={showSolidHeader ? { backgroundColor: "rgba(107, 112, 92, 0.95)" } : undefined}
    >
      <nav className="px-6 md:px-16 lg:px-20" aria-label="Main navigation">
        <div className="flex items-center justify-start h-16 md:h-20">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {navigation.items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                isActive={pathname === item.href}
                showSolidHeader={showSolidHeader}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden p-2 -ml-2 transition-colors duration-200 text-white`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden absolute top-full left-0 right-0 shadow-lg"
              style={{ backgroundColor: "#6B705C" }}
              role="menu"
            >
              <div className="py-4 px-6 space-y-1">
                {navigation.items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      role="menuitem"
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}
                      className={`block py-3 font-sans font-medium uppercase transition-colors duration-200 ${
                        pathname === item.href
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
