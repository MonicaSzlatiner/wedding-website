"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Mood board color palette
const colors = {
  emerald: "#037A4D",
  ivory: "#F5F3EE",
  greige: "#D4CCC4",
  champagne: "#E8DCC4",
  charcoal: "#4A4A4A",
};

// Color swatches data
const colorSwatches = [
  { name: "Emerald", hex: "#037A4D", color: colors.emerald },
  { name: "Warm Ivory", hex: "#F5F3EE", color: colors.ivory },
  { name: "Greige", hex: "#D4CCC4", color: colors.greige },
  { name: "Champagne", hex: "#E8DCC4", color: colors.champagne },
  { name: "Soft Charcoal", hex: "#4A4A4A", color: colors.charcoal },
];

// Design principles
const designPrinciples = [
  "Clean lines, organic textures",
  "Structured silhouettes with natural elements",
  "Matte finishes, quality materials",
  "Intentional color — emerald as the accent",
  "Timeless elegance, not trends",
];

// Think / Not lists
const thinkList = [
  "The Row showroom",
  "Kinfolk magazine editorial",
  "Contemporary art gallery",
  "Laurens' menswear aesthetic",
  "Natural textures, intentional details",
];

const notList = [
  "Traditional bridal party",
  "Nightclub or party aesthetic",
  "Instagram trends",
  "Heavy embellishment",
  "Maximum sparkle or shine",
];

// Visual inspiration cards
const inspirationCards = [
  {
    title: "Clean Lines & Natural Materials",
    link: "https://www.pinterest.com/search/pins/?q=japandi%20wedding%20minimal",
    svg: "geometric",
  },
  {
    title: "Minimal Table Settings",
    link: "https://www.pinterest.com/search/pins/?q=minimal%20wedding%20table%20setting%20ivory%20greenery",
    svg: "table",
  },
  {
    title: "Architectural Greenery",
    link: "https://www.pinterest.com/search/pins/?q=architectural%20greenery%20wedding%20minimal",
    svg: "greenery",
  },
  {
    title: "Olive & Eucalyptus",
    link: "https://www.pinterest.com/search/pins/?q=olive%20branch%20eucalyptus%20wedding%20minimal",
    svg: "branch",
  },
  {
    title: "Candlelight",
    link: "https://www.pinterest.com/search/pins/?q=brass%20candlesticks%20minimal%20wedding",
    svg: "candle",
  },
  {
    title: "Quiet Luxury",
    link: "https://www.pinterest.com/search/pins/?q=quiet%20luxury%20wedding%20minimal%20editorial",
    svg: "frame",
  },
];

// Curated links
const weddingStyleLinks = [
  { label: "Japandi Wedding Receptions", href: "https://www.pinterest.com/search/pins/?q=japandi%20wedding%20reception" },
  { label: "Modern Natural Weddings", href: "https://www.pinterest.com/search/pins/?q=minimal%20modern%20wedding%20natural%20greenery" },
  { label: "Quiet Luxury Weddings", href: "https://www.instagram.com/explore/tags/quietluxurywedding/" },
  { label: "Kinfolk Wedding Editorials", href: "https://kinfolk.com/tag/weddings/" },
];

const floralLinks = [
  { label: "Architectural Greenery", href: "https://www.pinterest.com/search/pins/?q=architectural%20wedding%20greenery" },
  { label: "Olive Branch Centerpieces", href: "https://www.pinterest.com/search/pins/?q=olive%20branch%20wedding%20centerpiece" },
  { label: "Taper Candle Tablescapes", href: "https://www.pinterest.com/search/pins/?q=minimal%20wedding%20table%20taper%20candles" },
  { label: "Emerald Accent Weddings", href: "https://www.pinterest.com/search/pins/?q=emerald%20green%20wedding%20minimal" },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// SVG Components for inspiration cards
function GeometricSVG() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <rect x="20" y="30" width="60" height="90" fill={colors.greige} />
      <rect x="90" y="50" width="40" height="70" fill={colors.emerald} opacity="0.8" />
      <circle cx="160" cy="75" r="30" fill={colors.champagne} />
      <line x1="20" y1="130" x2="180" y2="130" stroke={colors.charcoal} strokeWidth="1" />
    </svg>
  );
}

function TableSVG() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <ellipse cx="100" cy="90" rx="70" ry="40" fill={colors.ivory} stroke={colors.greige} strokeWidth="2" />
      <circle cx="100" cy="85" r="25" fill={colors.champagne} />
      <circle cx="100" cy="85" r="15" fill={colors.ivory} />
      <rect x="95" y="50" width="10" height="20" fill={colors.emerald} />
      <ellipse cx="100" cy="50" rx="8" ry="5" fill={colors.emerald} />
    </svg>
  );
}

function GreenerySVG() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <path d="M100 140 L100 60" stroke={colors.emerald} strokeWidth="2" fill="none" />
      <ellipse cx="70" cy="50" rx="20" ry="8" fill={colors.emerald} transform="rotate(-30 70 50)" />
      <ellipse cx="130" cy="50" rx="20" ry="8" fill={colors.emerald} opacity="0.7" transform="rotate(30 130 50)" />
      <ellipse cx="60" cy="80" rx="18" ry="7" fill={colors.emerald} opacity="0.8" transform="rotate(-40 60 80)" />
      <ellipse cx="140" cy="80" rx="18" ry="7" fill={colors.emerald} opacity="0.6" transform="rotate(40 140 80)" />
      <ellipse cx="75" cy="110" rx="15" ry="6" fill={colors.emerald} opacity="0.5" transform="rotate(-35 75 110)" />
      <ellipse cx="125" cy="110" rx="15" ry="6" fill={colors.emerald} opacity="0.4" transform="rotate(35 125 110)" />
    </svg>
  );
}

function BranchSVG() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <path d="M30 130 Q100 80 170 30" stroke={colors.emerald} strokeWidth="2" fill="none" />
      <ellipse cx="50" cy="115" rx="12" ry="5" fill={colors.emerald} transform="rotate(-50 50 115)" />
      <ellipse cx="80" cy="95" rx="14" ry="5" fill={colors.emerald} opacity="0.8" transform="rotate(-45 80 95)" />
      <ellipse cx="110" cy="75" rx="13" ry="5" fill={colors.emerald} opacity="0.7" transform="rotate(-40 110 75)" />
      <ellipse cx="140" cy="55" rx="12" ry="5" fill={colors.emerald} opacity="0.6" transform="rotate(-35 140 55)" />
      <ellipse cx="160" cy="40" rx="10" ry="4" fill={colors.emerald} opacity="0.5" transform="rotate(-30 160 40)" />
    </svg>
  );
}

function CandleSVG() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <rect x="90" y="50" width="20" height="70" fill={colors.champagne} />
      <rect x="85" y="115" width="30" height="15" fill={colors.greige} rx="2" />
      <ellipse cx="100" cy="45" rx="6" ry="10" fill="#FFD54F" opacity="0.8" />
      <ellipse cx="100" cy="42" rx="3" ry="6" fill="#FFECB3" />
      <rect x="50" y="70" width="12" height="50" fill={colors.champagne} opacity="0.7" />
      <rect x="138" y="60" width="12" height="60" fill={colors.champagne} opacity="0.7" />
    </svg>
  );
}

function FrameSVG() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <rect x="30" y="20" width="140" height="110" fill="none" stroke={colors.greige} strokeWidth="3" />
      <rect x="45" y="35" width="110" height="80" fill="none" stroke={colors.emerald} strokeWidth="1" />
      <line x1="100" y1="55" x2="100" y2="95" stroke={colors.charcoal} strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="75" x2="130" y2="75" stroke={colors.charcoal} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function getSVGComponent(type: string) {
  switch (type) {
    case "geometric": return <GeometricSVG />;
    case "table": return <TableSVG />;
    case "greenery": return <GreenerySVG />;
    case "branch": return <BranchSVG />;
    case "candle": return <CandleSVG />;
    case "frame": return <FrameSVG />;
    default: return <GeometricSVG />;
  }
}

export default function MoodboardPage() {
  return (
    <main 
      className="min-h-screen font-sans"
      style={{ backgroundColor: colors.ivory, color: colors.charcoal }}
    >
      {/* Header Section */}
      <motion.section 
        className="py-16 md:py-24 px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 
          className="font-serif text-6xl md:text-8xl italic font-light tracking-tight mb-4"
          style={{ color: colors.charcoal }}
        >
          M & L
        </h1>
        <p 
          className="font-serif text-xl md:text-2xl italic mb-6"
          style={{ color: colors.charcoal, opacity: 0.8 }}
        >
          Japandi Wedding Aesthetic
        </p>
        <p 
          className="text-xs uppercase tracking-[0.3em] mb-8"
          style={{ color: colors.emerald }}
        >
          01 August 2026 · Parkheuvel · Rotterdam
        </p>
        <div 
          className="w-24 h-px mx-auto"
          style={{ backgroundColor: colors.emerald }}
        />
      </motion.section>

      {/* Color Palette Section */}
      <motion.section 
        className="py-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-xs uppercase tracking-[0.3em] text-center mb-8"
            variants={fadeInUp}
            style={{ color: colors.charcoal }}
          >
            Color Palette
          </motion.h2>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 md:gap-6"
            variants={staggerContainer}
          >
            {colorSwatches.map((swatch) => (
              <motion.div 
                key={swatch.name}
                className="flex flex-col items-center"
                variants={fadeInUp}
              >
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-sm mb-2"
                  style={{ 
                    backgroundColor: swatch.color,
                    border: swatch.name === "Warm Ivory" ? `1px solid ${colors.greige}` : "none"
                  }}
                />
                <p className="text-xs font-medium mb-1">{swatch.name}</p>
                <p className="text-[10px] opacity-60">{swatch.hex}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* The Aesthetic Section */}
      <motion.section 
        className="py-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div 
          className="max-w-3xl mx-auto p-8 md:p-12 rounded-sm"
          style={{ backgroundColor: "white" }}
        >
          <h2 
            className="text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: colors.emerald }}
          >
            The Aesthetic: Japandi
          </h2>
          <p 
            className="font-serif text-xl md:text-2xl italic mb-8"
            style={{ color: colors.charcoal }}
          >
            Japanese minimalism meets Scandinavian warmth. Modern. Editorial. Quiet luxury.
          </p>
          <ul className="space-y-3">
            {designPrinciples.map((principle, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 text-sm"
              >
                <span style={{ color: colors.emerald }}>•</span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Think / Not Section */}
      <motion.section 
        className="py-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Think Column */}
          <motion.div 
            className="p-8 rounded-sm"
            style={{ backgroundColor: "white" }}
            variants={fadeInUp}
          >
            <h3 
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: colors.emerald }}
            >
              Think
            </h3>
            <ul className="space-y-3">
              {thinkList.map((item, index) => (
                <li key={index} className="text-sm flex items-start gap-3">
                  <span style={{ color: colors.emerald }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Column */}
          <motion.div 
            className="p-8 rounded-sm"
            style={{ backgroundColor: "white" }}
            variants={fadeInUp}
          >
            <h3 
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: colors.charcoal, opacity: 0.5 }}
            >
              Not
            </h3>
            <ul className="space-y-3">
              {notList.map((item, index) => (
                <li key={index} className="text-sm flex items-start gap-3 opacity-60">
                  <span>✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Visual Inspiration Grid */}
      <motion.section 
        className="py-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-xs uppercase tracking-[0.3em] text-center mb-4"
            variants={fadeInUp}
            style={{ color: colors.charcoal }}
          >
            Visual Inspiration
          </motion.h2>
          <motion.p 
            className="text-center text-sm italic mb-8 opacity-60"
            variants={fadeInUp}
          >
            Click any image to explore inspiration
          </motion.p>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {inspirationCards.map((card) => (
              <motion.a
                key={card.title}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ backgroundColor: "white" }}
                variants={fadeInUp}
              >
                <div 
                  className="aspect-[4/3] p-6"
                  style={{ backgroundColor: colors.ivory }}
                >
                  {getSVGComponent(card.svg)}
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-center">{card.title}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Bridesmaid Dress Guidance */}
      <motion.section 
        className="py-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div 
          className="max-w-3xl mx-auto p-8 md:p-12 rounded-sm text-center"
          style={{ backgroundColor: "rgba(212, 204, 196, 0.4)" }}
        >
          <h2 
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: colors.emerald }}
          >
            For Bridesmaids
          </h2>
          <p 
            className="font-serif text-lg md:text-xl italic"
            style={{ color: colors.charcoal }}
          >
            Emerald green · Column or sheath silhouette · Clean, minimal, refined
          </p>
        </div>
      </motion.section>

      {/* Curated Inspiration Links */}
      <motion.section 
        className="py-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-xs uppercase tracking-[0.3em] text-center mb-8"
            variants={fadeInUp}
            style={{ color: colors.charcoal }}
          >
            Curated Inspiration
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Wedding Style */}
            <motion.div variants={fadeInUp}>
              <h3 
                className="text-xs uppercase tracking-[0.2em] mb-4"
                style={{ color: colors.emerald }}
              >
                Wedding Style
              </h3>
              <ul className="space-y-3">
                {weddingStyleLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline underline-offset-4 decoration-1 transition-colors"
                      style={{ color: colors.charcoal, textDecorationColor: colors.greige }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = colors.emerald)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = colors.charcoal)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Florals & Details */}
            <motion.div variants={fadeInUp}>
              <h3 
                className="text-xs uppercase tracking-[0.2em] mb-4"
                style={{ color: colors.emerald }}
              >
                Florals & Details
              </h3>
              <ul className="space-y-3">
                {floralLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline underline-offset-4 decoration-1 transition-colors"
                      style={{ color: colors.charcoal, textDecorationColor: colors.greige }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = colors.emerald)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = colors.charcoal)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-16 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div 
          className="w-16 h-px mx-auto mb-8"
          style={{ backgroundColor: colors.emerald }}
        />
        <p className="text-xs uppercase tracking-[0.2em] opacity-50">
          M & L · 2026
        </p>
        <Link 
          href="/"
          className="inline-block mt-6 text-xs uppercase tracking-[0.2em] underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity"
        >
          Back to Wedding Website
        </Link>
      </motion.footer>
    </main>
  );
}
