import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ============================================
        // MODERN EDITORIAL PALETTE
        // Based on reference: Cool gray frame + Sage green panel
        // ============================================
        
        // Primary Background - Darker Sage/Olive (matches reference)
        sage: {
          DEFAULT: "#6B705C",
          50: "#f6f7f4",
          100: "#e8ebe3",
          500: "#6B705C",
          600: "#5a5e4d",
        },
        
        // Outer Frame - Cool Gray/Stone (matches reference)
        frame: {
          DEFAULT: "#A5A5A0",
          light: "#B0B0AB",
          dark: "#959590",
        },
        
        // Typography colors
        offWhite: "#F8F9FA",
        white: "#FFFFFF",
        black: "#000000",
        charcoal: "#1A1A1A",
        
        // Supporting grays
        gray: {
          100: "#F5F5F5",
          300: "#E0E0E0",
          400: "#A0A0A0",
          600: "#666666",
          800: "#333333",
        },
        
        // Legacy for other pages
        cream: {
          50: "#FAFAFA",
          100: "#F8F7F4",
        },
        stone: {
          50: "#fafaf9",
          500: "#78716c",
          800: "#292524",
        },
        emerald: {
          500: "#10B981",
          600: "#059669",
        },
      },
      fontFamily: {
        // Cormorant Garamond for headings/names - elegant, editorial
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        // Montserrat for dates, buttons, utility text
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Typography scale - mobile-first, responsive
        "display-xl": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],   // 80px
        "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],   // 64px
        "display-md": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],   // 48px
        "display-sm": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }], // 36px
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        content: "42rem",
        wide: "72rem",
        prose: "65ch", // Optimal reading line length
      },
    },
  },
  plugins: [],
};

export default config;
