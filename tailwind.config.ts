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
        // QUIET LUXURY PALETTE
        // Terracotta + Espresso theme
        // ============================================
        
        // Primary accent - Warm terracotta
        terracotta: {
          DEFAULT: "#C37B60",
          light: "#d4947f",
          dark: "#a86750",
        },
        
        // Text and dark sections - Rich espresso
        espresso: {
          DEFAULT: "#2D2926",
          light: "#3d3935",
          dark: "#1d1916",
        },
        
        // Background - Warm off-white
        "background-light": "#F5F5F0",
        "background-dark": "#182111",
        
        // Legacy sage (keep for Save the Date)
        sage: {
          DEFAULT: "#6B705C",
          50: "#f6f7f4",
          100: "#e8ebe3",
          500: "#6B705C",
          600: "#5a5e4d",
        },
        
        // Outer Frame - Warm Cream/Stone
        frame: {
          DEFAULT: "#F2F2EC",
          light: "#F5F5F0",
          dark: "#E8E8E1",
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
      },
      fontFamily: {
        // Cormorant Garamond for headings/names - elegant, editorial
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        // Manrope for body text, buttons, utility text
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        // Display font (same as sans but explicit)
        display: ["var(--font-manrope)", "sans-serif"],
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
