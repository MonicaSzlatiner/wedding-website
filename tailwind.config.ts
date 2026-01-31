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
        // Primary sage/olive tones (refined elegant palette)
        sage: {
          50: "#f6f7f4",
          100: "#e8ebe3",
          200: "#d4d9cb",
          300: "#b5bda8",
          400: "#939d82",
          500: "#828D77", // Sage green
          600: "#828D77", // Primary background panels
          700: "#6b7660",
          800: "#565f4d",
          900: "#414839",
        },
        // Ivory for text
        ivory: {
          DEFAULT: "#E4E4DE",
          50: "#F5F5F3",
          100: "#E4E4DE",
        },
        // Emerald accents
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669", // CTAs, links
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Warm stone neutrals
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        // Accent colors
        blush: {
          50: "#fef2f2",
          100: "#fee2e2",
        },
        gold: {
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
        },
      },
      fontFamily: {
        serif: ["Prata", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Custom heading sizes for editorial feel
        "display-xl": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.25" }],
      },
      spacing: {
        // Section spacing
        section: "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        content: "42rem",
        wide: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
