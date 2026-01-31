"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { weddingConfig } from "@/config/content";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { navigation } = weddingConfig;

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidHeader
          ? "bg-stone-50/95 backdrop-blur-sm border-b border-stone-200"
          : "bg-transparent"
      }`}
    >
      {/* Nav padding matches the sage panel content: p-12 md:p-16 lg:p-20 */}
      <nav className="px-12 md:px-16 lg:px-20" aria-label="Main navigation">
        <div className="flex items-center justify-start h-16 md:h-20">
          {/* Desktop Navigation - Left Aligned with sage panel content */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {navigation.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                aria-current={pathname === item.href ? "page" : undefined}
                style={{ fontSize: "0.9rem", letterSpacing: "1.5px" }}
                className={`font-sans font-normal uppercase transition-all duration-300 ${
                  pathname === item.href
                    ? showSolidHeader
                      ? "text-sage-600"
                      : "text-white"
                    : showSolidHeader
                    ? "text-stone-500 hover:text-stone-800"
                    : "text-ivory hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden p-2 -ml-2 transition-colors ${
              showSolidHeader ? "text-stone-800" : "text-white"
            }`}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-stone-50 border-b border-stone-200 shadow-lg"
            role="menu"
          >
            <div className="py-4 px-6 space-y-1">
              {navigation.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: "0.9rem", letterSpacing: "1.5px" }}
                  className={`block py-3 font-sans font-normal uppercase transition-all duration-300 ${
                    pathname === item.href
                      ? "text-sage-600"
                      : "text-stone-600 hover:text-stone-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
