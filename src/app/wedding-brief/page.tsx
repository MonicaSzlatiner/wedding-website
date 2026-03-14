/**
 * WEDDING BRIEF — src/app/wedding-brief/page.tsx
 *
 * ─── CURSOR: HOW TO BUILD & TEST THIS ────────────────────────────────────────
 *
 * 1. CREATE the file:
 *    Drop this file at: src/app/wedding-brief/page.tsx
 *
 * 2. DELETE the old moodboard (it's been folded into this page):
 *    Delete the entire folder: src/app/moodboard/
 *    (Confirmed: it's not linked from anywhere else in the codebase)
 *
 * 3. RUN locally first — do not deploy until you've verified in the browser:
 *    npm run dev
 *    Then open: http://localhost:3000/wedding-brief
 *
 * 4. CHECK these things before deploying:
 *    - Sticky nav scrolls to each section correctly
 *    - All 5 sections visible: Moodboard, Venue, Ceremony, Flip, Open Questions
 *    - SVG diagrams render (ceremony sizing + venue floor plan)
 *    - Inspiration card grid opens Pinterest/Instagram in new tab
 *    - Scenario table header appears ABOVE the rows
 *    - Nav doesn't overflow on mobile
 *
 * 5. DEPLOY only after local check passes:
 *    git add src/app/wedding-brief/page.tsx
 *    git rm -r src/app/moodboard/
 *    git commit -m "Add wedding brief, remove standalone moodboard"
 *    git push
 *
 * This page is intentionally NOT linked from the main nav.
 * Share the URL directly: laurensandmonica.com/wedding-brief
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Brief nav ────────────────────────────────────────────────────────────────
const briefSections = [
  { id: "moodboard", label: "Moodboard" },
  { id: "venue", label: "The Venue" },
  { id: "ceremony", label: "Ceremony" },
  { id: "flip", label: "The Flip" },
  { id: "questions", label: "Open Questions" },
];

function BriefNav() {
  const [active, setActive] = useState("moodboard");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#252525] border-b border-[#c9a96e]/40">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/" className="font-serif text-[#c9a96e] text-lg tracking-widest shrink-0">
          L&M
        </Link>
        <ul className="flex gap-5 overflow-x-auto">
          {briefSections.map((s) => (
            <li key={s.id} className="shrink-0">
              <button
                onClick={() => scrollTo(s.id)}
                className={`text-[0.65rem] tracking-[0.18em] uppercase font-jost font-medium transition-colors whitespace-nowrap ${
                  active === s.id ? "text-[#c9a96e]" : "text-[#aaa] hover:text-[#f7f3ec]"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="text-[0.65rem] tracking-[0.18em] uppercase font-jost text-[#555] hover:text-[#aaa] transition-colors shrink-0 ml-4"
        >
          ← Main Site
        </Link>
      </div>
    </nav>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-14 py-16 px-6 ${dark ? "bg-[#1a1a1a]" : "bg-[#f7f3ec]"}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-[0.68rem] tracking-[0.25em] uppercase font-jost font-semibold text-[#c9a96e] mb-2">
            {eyebrow}
          </p>
          <h2 className={`font-serif font-light text-3xl leading-tight ${dark ? "text-[#f7f3ec]" : "text-[#252525]"}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-2 text-sm font-jost font-light leading-relaxed ${dark ? "text-[#666]" : "text-[#888]"}`}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ num, label, note }: { num: string; label: string; note: string }) {
  return (
    <div className="bg-white border border-[#e0d8cc] rounded-lg p-5">
      <div className="font-serif text-4xl text-[#2d5a45] leading-none">{num}</div>
      <div className="text-[0.7rem] font-jost font-semibold tracking-[0.1em] uppercase text-[#888] mt-2">{label}</div>
      <div className="text-[0.82rem] font-jost font-light text-[#666] mt-2 leading-relaxed">{note}</div>
    </div>
  );
}

// ─── Checklist group ──────────────────────────────────────────────────────────
function CheckGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="text-[0.68rem] font-jost font-semibold tracking-[0.18em] uppercase text-[#c9a96e] mb-3">
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[0.85rem] font-jost font-light text-[#ccc] leading-relaxed">
            <span className="text-[#c9a96e] mt-0.5 shrink-0">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WeddingBriefPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      <BriefNav />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#252525] border-b-4 border-[#c9a96e] px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-[0.68rem] tracking-[0.28em] uppercase font-jost font-semibold text-[#c9a96e] mb-3">
            Parkheuvel Rotterdam · August 1, 2026 · Internal Use Only
          </p>
          <h1 className="font-serif font-light text-5xl text-[#f7f3ec] leading-tight mb-4">
            Wedding Brief
          </h1>
          <p className="font-jost font-light text-[#888] text-sm max-w-xl leading-relaxed">
            Everything in one place — the aesthetic, the venue, how the day flows, and what still
            needs an answer at the April walkthrough. Not for the main site. Share the link, not the URL.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 01 — MOODBOARD                                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Section
        id="moodboard"
        eyebrow="Section 01 · Aesthetic"
        title="Japandi Wedding Aesthetic"
        subtitle="Japanese minimalism meets Scandinavian warmth. Modern. Editorial. Quiet luxury."
      >
        {/* Full palette strip */}
        <div className="mb-6">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#252525] mb-4">
            Color Palette
          </div>
          <div className="flex rounded-lg overflow-hidden h-24 mb-6 shadow-sm">
            {[
              { hex: "#1B2A4A", nameColor: "#8BA0C8", roleColor: "#5A7098", name: "midnight navy", role: "groom & groomsmen" },
              { hex: "#2D5A3D", nameColor: "#7AAF8A", roleColor: "#4A8A5A", name: "deep emerald", role: "bridesmaids" },
              { hex: "#C46A3A", nameColor: "#E8C4A0", roleColor: "#C8A080", name: "burnt terracotta", role: "junior group" },
              { hex: "#E2D4B0", nameColor: "#8A7A50", roleColor: "#9A8A60", name: "warm champagne", role: "flower girls" },
              { hex: "#F5F0E4", nameColor: "#8A7A60", roleColor: "#AAA090", name: "bridal ivory", role: "the bride", border: true },
            ].map((c) => (
              <div
                key={c.name}
                className={`flex-1 flex flex-col justify-end p-3 transition-all duration-300 hover:flex-[1.4] ${c.border ? "border border-[#ddd]" : ""}`}
                style={{ backgroundColor: c.hex }}
              >
                <div className="font-serif text-sm italic" style={{ color: c.nameColor }}>{c.name}</div>
                <div className="text-[0.55rem] tracking-[0.12em] uppercase mt-0.5" style={{ color: c.roleColor }}>{c.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Who wears what */}
        <div className="mb-6">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#252525] mb-4">
            Who Wears What
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { hex: "#1B2A4A", name: "Midnight Navy", detail: "Laurens · slim fit suit · gold tie\n2 groomsmen · navy suit" },
              { hex: "#2D5A3D", name: "Deep Emerald", detail: "Rosa · Cori · Lauren / Ujaz\none-shoulder satin gown" },
              { hex: "#C46A3A", name: "Burnt Terracotta", detail: "Laurens' sister · Chaima · girl 13\nmuted, dusty tone — not bright" },
              { hex: "#E8DDB8", name: "Warm Champagne", detail: "Flower girl · 8\nclassic ivory tulle dress", border: true },
              { hex: "#F5F0E4", name: "Bridal Ivory", detail: "Monica\nwarm bouquet · terracotta\nblush · champagne florals", border: true },
              { hex: "#C9A96E", name: "Warm Gold", detail: "Laurens' tie · invitation accent\ncandles · Parkheuvel detail\nthe thread that ties it all" },
            ].map((c) => (
              <div key={c.name} className="bg-white border border-[#e0d8cc] rounded-lg overflow-hidden">
                <div className={`h-16 ${c.border ? "border-b border-[#e8e0d4]" : ""}`} style={{ backgroundColor: c.hex }} />
                <div className="p-3">
                  <div className="font-serif italic text-[#252525] text-base">{c.name}</div>
                  <div className="text-[0.65rem] tracking-[0.08em] uppercase text-[#aaa] mt-1 leading-relaxed whitespace-pre-line">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why this works */}
        <div className="bg-[#252525] rounded-lg p-6 mb-6">
          <div className="font-serif text-[#c9a96e] text-lg italic font-light mb-3">why this works</div>
          <p className="text-[0.85rem] font-jost font-light text-[#ccc] leading-relaxed">
            The palette moves from <strong className="text-[#f7f3ec]">cool and deep at the front</strong> — navy, emerald — to{" "}
            <strong className="text-[#f7f3ec]">warm and soft at the back</strong> — terracotta, champagne, bridal ivory. As guests watch the procession walk toward the altar, the colors tell a story that warms up as it reaches you. The terracotta bridges the cool jewel tones to the warm invitation palette, so nothing feels accidental.{" "}
            <strong className="text-[#f7f3ec]">The gold thread</strong> — Laurens&apos; tie, the candles, the invitation accent — runs through everything and anchors it as one considered aesthetic. Quiet. Rich. Intentional.
          </p>
        </div>

        {/* Aesthetic principles */}
        <div className="bg-white border border-[#e0d8cc] rounded-lg p-6 mb-6">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#252525] mb-3">
            The Aesthetic: Japandi
          </div>
          <p className="text-sm font-jost font-light text-[#666] mb-4 leading-relaxed">
            Japanese minimalism meets Scandinavian warmth. Modern. Editorial. Quiet luxury.
          </p>
          <ul className="space-y-1">
            {[
              "Clean lines, organic textures",
              "Structured silhouettes with natural elements",
              "Matte finishes, quality materials",
              "Intentional color — emerald as the accent",
              "Timeless elegance, not trends",
            ].map((t) => (
              <li key={t} className="flex gap-2 text-[0.85rem] font-jost font-light text-[#444]">
                <span className="text-[#2d5a45]">•</span> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Think / Not */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-[#e0d8cc] rounded-lg p-6">
            <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#2d5a45] mb-4">Think</div>
            <ul className="space-y-2">
              {["The Row showroom", "Kinfolk magazine editorial", "Contemporary art gallery", "Laurens' menswear aesthetic", "Natural textures, intentional details"].map((t) => (
                <li key={t} className="flex gap-2 text-[0.85rem] font-jost font-light text-[#444]">
                  <span className="text-[#2d5a45] font-medium">✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-[#e0d8cc] rounded-lg p-6">
            <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#9e3a3a] mb-4">Not</div>
            <ul className="space-y-2">
              {["Traditional bridal party", "Nightclub or party aesthetic", "Instagram trends", "Heavy embellishment", "Maximum sparkle or shine"].map((t) => (
                <li key={t} className="flex gap-2 text-[0.85rem] font-jost font-light text-[#444]">
                  <span className="text-[#9e3a3a] font-medium">✗</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual inspiration cards */}
        <div className="mb-6">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#252525] mb-1">
            Visual Inspiration
          </div>
          <p className="text-[0.75rem] font-jost font-light text-[#aaa] mb-4">
            Click any card to explore on Pinterest
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Clean Lines & Natural Materials", url: "https://www.pinterest.com/search/pins/?q=japandi%20wedding%20minimal" },
              { label: "Minimal Table Settings", url: "https://www.pinterest.com/search/pins/?q=minimal%20wedding%20table%20setting%20ivory%20greenery" },
              { label: "Architectural Greenery", url: "https://www.pinterest.com/search/pins/?q=architectural%20greenery%20wedding%20minimal" },
              { label: "Olive & Eucalyptus", url: "https://www.pinterest.com/search/pins/?q=olive%20branch%20eucalyptus%20wedding%20minimal" },
              { label: "Candlelight", url: "https://www.pinterest.com/search/pins/?q=brass%20candlesticks%20minimal%20wedding" },
              { label: "Quiet Luxury", url: "https://www.pinterest.com/search/pins/?q=quiet%20luxury%20wedding%20minimal%20editorial" },
            ].map((card) => (
              <a
                key={card.label}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#252525] hover:bg-[#2d5a45] transition-colors duration-300 rounded-lg p-5 group"
              >
                <div className="text-[0.85rem] font-jost font-light text-[#ccc] group-hover:text-white leading-snug mb-2">
                  {card.label}
                </div>
                <div className="text-[0.65rem] font-jost text-[#555] group-hover:text-[#a8d0b8] tracking-[0.1em] uppercase">
                  Pinterest →
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bridesmaids */}
        <div className="bg-[#252525] rounded-lg p-6 flex items-center justify-between mb-6">
          <div>
            <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#c9a96e] mb-1">
              For Bridesmaids — Rosa · Cori · Lauren / Ujaz
            </div>
            <div className="font-serif text-[#f7f3ec] text-xl font-light">
              Deep emerald · One-shoulder satin gown · Clean, minimal, refined
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#2D5A3D] shrink-0 ml-6" />
        </div>

        {/* Curated inspiration links */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-[#e0d8cc] rounded-lg p-5">
            <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#252525] mb-3">
              Wedding Style
            </div>
            <ul className="space-y-2">
              {[
                { label: "Japandi Wedding Receptions", url: "https://www.pinterest.com/search/pins/?q=japandi%20wedding%20reception" },
                { label: "Modern Natural Weddings", url: "https://www.pinterest.com/search/pins/?q=minimal%20modern%20wedding%20natural%20greenery" },
                { label: "Quiet Luxury Weddings", url: "https://www.instagram.com/explore/tags/quietluxurywedding/" },
                { label: "Kinfolk Wedding Editorials", url: "https://kinfolk.com/tag/weddings/" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer"
                    className="text-[0.85rem] font-jost font-light text-[#2d5a45] hover:text-[#1a3a25] transition-colors">
                    {l.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-[#e0d8cc] rounded-lg p-5">
            <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#252525] mb-3">
              Florals & Details
            </div>
            <ul className="space-y-2">
              {[
                { label: "Architectural Greenery", url: "https://www.pinterest.com/search/pins/?q=architectural%20wedding%20greenery" },
                { label: "Olive Branch Centerpieces", url: "https://www.pinterest.com/search/pins/?q=olive%20branch%20wedding%20centerpiece" },
                { label: "Taper Candle Tablescapes", url: "https://www.pinterest.com/search/pins/?q=minimal%20wedding%20table%20taper%20candles" },
                { label: "Emerald Accent Weddings", url: "https://www.pinterest.com/search/pins/?q=emerald%20green%20wedding%20minimal" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer"
                    className="text-[0.85rem] font-jost font-light text-[#2d5a45] hover:text-[#1a3a25] transition-colors">
                    {l.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 02 — VENUE                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Section
        id="venue"
        eyebrow="Section 02 · Venue"
        title="All Spaces at Parkheuvel"
        subtitle="Heuvellaan 21, Rotterdam · Michelin-starred · Newly renovated · No prior wedding experience post-reno — we're figuring this out together with them."
        dark
      >
        <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6 mb-8">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#c9a96e] mb-4">
            Full Floor Plan
          </div>
          <svg viewBox="0 0 780 500" width="100%" style={{ maxWidth: 780, display: "block", margin: "0 auto" }}>
            <rect width="780" height="500" fill="#111" rx="6" />
            <rect x="0" y="438" width="780" height="62" fill="#0d1e28" />
            <text x="390" y="462" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="11" fill="#5e8da8" letterSpacing="4">NIEUWE MAAS</text>
            <text x="390" y="478" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9" fill="#2a5a78">river views · terrace faces this direction</text>
            <rect x="110" y="385" width="560" height="50" fill="#0d200d" stroke="#2d4a2d" strokeWidth="1.5" rx="3" />
            <text x="390" y="406" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="10" fill="#4a8a4a" fontWeight="500">TERRACE  ~80m²</text>
            <text x="390" y="422" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#2d5a2d">ceremony option (weather risk) · dancing option (August, weather dependent)</text>
            <ellipse cx="390" cy="230" rx="260" ry="160" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            <rect x="308" y="80" width="165" height="55" fill="#252525" stroke="#555" strokeWidth="1.5" rx="3" />
            <text x="390" y="101" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="10" fill="#bbb" fontWeight="500">FOYER / ENTRANCE</text>
            <text x="390" y="116" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#777">~25–40m²</text>
            <text x="390" y="128" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#555">stairs up from Heuvellaan 21</text>
            <polygon points="390,74 383,82 397,82" fill="#444" />
            <rect x="128" y="135" width="160" height="100" fill="#1e1a0a" stroke="#7a5a10" strokeWidth="1.5" rx="3" />
            <text x="208" y="172" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="10" fill="#c9a96e" fontWeight="500">CHAMPAGNE LOUNGE</text>
            <text x="208" y="187" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#9a7a30">~35m² · new post-renovation</text>
            <text x="208" y="200" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#7a5a20">alone: too small for dancing</text>
            <text x="208" y="213" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#7a5a20">with foyer: possibly 55–75m²</text>
            <rect x="122" y="74" width="172" height="168" fill="none" stroke="#c47f2a" strokeWidth="1.2" strokeDasharray="5,3" rx="4" />
            <text x="128" y="70" fontFamily="Jost,sans-serif" fontSize="8" fill="#c47f2a" fontWeight="500">Option B dance zone (unconfirmed)</text>
            <rect x="308" y="135" width="165" height="50" fill="#1e1e1e" stroke="#444" strokeWidth="1" rx="2" />
            <text x="390" y="156" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9.5" fill="#777" fontWeight="500">OPEN KITCHEN</text>
            <text x="390" y="170" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#555">8m opening into dining room</text>
            <rect x="490" y="135" width="158" height="100" fill="#0d1020" stroke="#3050a0" strokeWidth="1.5" rx="3" />
            <text x="569" y="172" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="10" fill="#7080c0" fontWeight="500">PRIVATE DINING</text>
            <text x="569" y="187" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#5060a0">green room for ceremony</text>
            <text x="569" y="200" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#404880">overflow / kids during dinner</text>
            <path d="M138,268 Q135,382 258,385 L522,385 Q645,382 642,268 L642,262 L138,262 Z" fill="#161e14" stroke="#2d5a45" strokeWidth="2" />
            <text x="390" y="278" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9" fill="#2d5a45" fontWeight="600">MAIN DINING ROOM  ~170m²</text>
            <line x1="148" y1="382" x2="632" y2="382" stroke="#5e8da8" strokeWidth="2" strokeDasharray="8,4" />
            <text x="390" y="396" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#5e8da8">new terrace doors — open in August</text>
            <ellipse cx="390" cy="290" rx="38" ry="15" fill="#0d200d" stroke="#2d5a45" strokeWidth="2" />
            <text x="390" y="294" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#2d5a45" fontWeight="600">your table · 6</text>
            {([[178,310],[178,345],[240,370],[390,373],[540,370],[602,345],[602,310]] as [number,number][]).map(([cx,cy],i) => (
              <ellipse key={`peri-${i}`} cx={cx} cy={cy} rx="28" ry="13" fill="#111" stroke="#2d5a45" strokeWidth="1.2" />
            ))}
            {([[320,330],[390,345],[460,330],[390,315]] as [number,number][]).map(([cx,cy],i) => (
              <ellipse key={`center-${i}`} cx={cx} cy={cy} rx="28" ry="13" fill="rgba(196,127,42,0.05)" stroke="#c47f2a" strokeWidth="1.5" strokeDasharray="5,3" />
            ))}
            <rect x="340" y="323" width="100" height="16" fill="rgba(17,17,17,0.95)" rx="2" />
            <text x="390" y="334" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#c47f2a" fontStyle="italic">cleared for dancing</text>
          </svg>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Main Dining Room", size: "~170m²", role: "Ceremony → Dinner → Dancing", color: "#2d5a45" },
            { name: "Private Dining", size: "~30–35m²", role: "Green room · overflow · kids", color: "#6080c0" },
            { name: "Champagne Lounge", size: "~35m²", role: "Secondary bar · too small for full guest cocktail hour", color: "#c9a96e" },
            { name: "Foyer / Entrance", size: "~25–40m²", role: "Cocktail hour · arrival · main indoor overflow", color: "#777" },
            { name: "Terrace", size: "~80m²", role: "August overflow · dancing wildcard", color: "#4a8a4a" },
            { name: "Kitchen Opening", size: "~8m wide", role: "Processional entrance — the key question for April", color: "#9e3a3a" },
          ].map((s) => (
            <div key={s.name} className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
              <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: s.color }} />
              <div className="font-jost font-medium text-[#f7f3ec] text-sm">{s.name}</div>
              <div className="font-serif text-[#c9a96e] text-2xl mt-1">{s.size}</div>
              <div className="text-[0.75rem] font-jost font-light text-[#555] mt-1 leading-relaxed">{s.role}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 03 — CEREMONY                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Section
        id="ceremony"
        eyebrow="Section 03 · Ceremony"
        title="Will 45 people fit? Can everyone see?"
        subtitle="Scale diagram · sightlines from worst seats · spacing around the wedding party"
      >
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard num="8.2m" label="Worst-case sightline" note="Distance from the far corner seat to the altar. Clear line of sight — no obstructions." />
          <StatCard num="~2.5m" label="Gap: front row → wedding party" note="Enough breathing room between the last guest row and where the bridesmaids stand." />
          <StatCard num="~6m" label="Space for wedding party + altar" note="From front of seating to the river wall. Comfortable for the full lineup." />
        </div>

        <div className="bg-white border border-[#e0d8cc] rounded-lg p-6 mb-6">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#c9a96e] mb-4 pb-3 border-b border-[#e8e0d4]">
            Scale floor plan · 1 square = 1m × 1m
          </div>
          <svg viewBox="0 0 960 680" width="100%" style={{ maxWidth: 960, display: "block", margin: "0 auto" }}>
            <defs>
              <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#e8e3da" strokeWidth="0.5" />
              </pattern>
              <marker id="dim-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#888" />
              </marker>
              <marker id="dim-arrow-rev" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                <path d="M0,0 L6,3 L0,6 Z" fill="#888" />
              </marker>
              <marker id="sight-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#9e3a3a" opacity="0.6" />
              </marker>
              <g id="ch">
                <rect x="-4.5" y="-9" width="9" height="5.5" rx="1" fill="#b8ae9c" />
                <rect x="-4.5" y="-3.5" width="9" height="5" rx="1" fill="#ccc5b8" />
                <circle cx="0" cy="-13" r="3.5" fill="#cfc8ba" />
              </g>
            </defs>
            <rect width="960" height="680" fill="#f8f6f0" rx="6" />
            <clipPath id="roomclip">
              <rect x="0" y="148" width="960" height="532" />
            </clipPath>
            <ellipse cx="480" cy="400" rx="294" ry="252" fill="#f0ede4" stroke="#2d5a45" strokeWidth="2.5" clipPath="url(#roomclip)" />
            <line x1="186" y1="148" x2="774" y2="148" stroke="#2d5a45" strokeWidth="2.5" />
            <rect x="0" y="628" width="960" height="52" fill="#dceef7" />
            <text x="480" y="652" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="11" fill="#5e8da8" letterSpacing="4">NIEUWE MAAS</text>
            <rect x="186" y="594" width="588" height="32" fill="#e3f2e3" stroke="#7ab87a" strokeWidth="1.2" rx="2" />
            <text x="480" y="614" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9" fill="#4a8a4a">TERRACE  ~80m²</text>
            <ellipse cx="480" cy="400" rx="275" ry="233" fill="none" stroke="#5e8da8" strokeWidth="2" strokeDasharray="10,5" clipPath="url(#roomclip)" />
            <text x="480" y="590" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#5e8da8">curved glass wall — river</text>
            <rect x="384" y="118" width="192" height="32" fill="#e8e4da" stroke="#a09880" strokeWidth="1.5" rx="3" />
            <text x="480" y="133" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9.5" fill="#555" fontWeight="600">KITCHEN OPENING  ~8m</text>
            <text x="480" y="146" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#888">wedding party enters</text>
            <rect x="455" y="148" width="50" height="232" fill="rgba(201,169,110,0.12)" />
            <line x1="455" y1="148" x2="455" y2="380" stroke="rgba(201,169,110,0.5)" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="505" y1="148" x2="505" y2="380" stroke="rgba(201,169,110,0.5)" strokeWidth="1" strokeDasharray="5,5" />
            {[200,222,244,266,288,310,332,354,376,398,420].map(x => <use key={`r1l${x}`} href="#ch" transform={`translate(${x},172)`} />)}
            {[520,542,564,586,608,630,652,674,696,718,740].map(x => <use key={`r1r${x}`} href="#ch" transform={`translate(${x},172)`} />)}
            {[200,222,244,266,288,310,332,354,376,398,420].map(x => <use key={`r2l${x}`} href="#ch" transform={`translate(${x},210)`} />)}
            {[520,542,564,586,608,630,652,674,696,718,740].map(x => <use key={`r2r${x}`} href="#ch" transform={`translate(${x},210)`} />)}
            {[210,232,254,276,298,320,342,364,386,408,430].map(x => <use key={`r3l${x}`} href="#ch" transform={`translate(${x},248)`} />)}
            {[520,542,564,586,608,630,652,674,696,718,740].map(x => <use key={`r3r${x}`} href="#ch" transform={`translate(${x},248)`} />)}
            <circle cx="340" cy="430" r="9" fill="#2d5a45" /><rect x="334" y="439" width="12" height="15" rx="3" fill="#2d5a45" />
            <circle cx="370" cy="448" r="9" fill="#2d5a45" opacity=".85" /><rect x="364" y="457" width="12" height="15" rx="3" fill="#2d5a45" opacity=".85" />
            <circle cx="400" cy="456" r="9" fill="#2d5a45" opacity=".7" /><rect x="394" y="465" width="12" height="15" rx="3" fill="#2d5a45" opacity=".7" />
            <text x="370" y="485" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9.5" fill="#2d5a45" fontWeight="600">bridesmaids</text>
            <circle cx="620" cy="430" r="9" fill="#5c4a3a" /><rect x="614" y="439" width="12" height="15" rx="3" fill="#5c4a3a" />
            <circle cx="590" cy="448" r="9" fill="#5c4a3a" opacity=".85" /><rect x="584" y="457" width="12" height="15" rx="3" fill="#5c4a3a" opacity=".85" />
            <circle cx="560" cy="456" r="9" fill="#5c4a3a" opacity=".7" /><rect x="554" y="465" width="12" height="15" rx="3" fill="#5c4a3a" opacity=".7" />
            <text x="590" y="485" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9.5" fill="#5c4a3a" fontWeight="600">best man + groomsmen</text>
            <circle cx="432" cy="400" r="8" fill="#c9a96e" /><rect x="426" y="408" width="12" height="12" rx="3" fill="#c9a96e" />
            <circle cx="528" cy="400" r="8" fill="#c9a96e" /><rect x="522" y="408" width="12" height="12" rx="3" fill="#c9a96e" />
            <text x="480" y="393" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#a08040">flower girls</text>
            <rect x="428" y="478" width="104" height="26" fill="rgba(201,169,110,0.1)" stroke="#c9a96e" strokeWidth="1.8" strokeDasharray="5,3" rx="4" />
            <text x="480" y="495" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9" fill="#c9a96e" fontWeight="500">Monica + Laurens</text>
            <circle cx="480" cy="534" r="11" fill="#2d5a45" />
            <rect x="474" y="545" width="12" height="16" rx="3" fill="#2d5a45" />
            <text x="480" y="531" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="white" fontWeight="700">L.M.</text>
            <text x="480" y="572" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9" fill="#2d5a45" fontWeight="600">Luis Miguel</text>
            <line x1="210" y1="248" x2="478" y2="488" stroke="#9e3a3a" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.55" markerEnd="url(#sight-arrow)" />
            <line x1="740" y1="248" x2="482" y2="488" stroke="#9e3a3a" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.55" markerEnd="url(#sight-arrow)" />
            <rect x="148" y="272" width="115" height="48" fill="white" stroke="#9e3a3a" strokeWidth="1" rx="3" opacity="0.92" />
            <text x="205" y="289" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9" fill="#9e3a3a" fontWeight="600">Worst corner seat</text>
            <text x="205" y="303" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#9e3a3a">~8.2m to altar · ~62°</text>
            <text x="205" y="315" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#888">angled but clear view</text>
            <line x1="186" y1="64" x2="774" y2="64" stroke="#888" strokeWidth="1.2" markerStart="url(#dim-arrow-rev)" markerEnd="url(#dim-arrow)" />
            <rect x="430" y="54" width="100" height="18" fill="#f8f6f0" />
            <text x="480" y="67" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="10" fill="#666" fontWeight="500">14m wide</text>
            <line x1="840" y1="148" x2="840" y2="620" stroke="#888" strokeWidth="1.2" markerStart="url(#dim-arrow-rev)" markerEnd="url(#dim-arrow)" />
            <rect x="843" y="370" width="60" height="18" fill="#f8f6f0" />
            <text x="873" y="383" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="10" fill="#666" fontWeight="500">12m deep</text>
            <text x="300" y="195" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#999" fontStyle="italic">guest seating · 45 chairs</text>
            <text x="300" y="340" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#999" fontStyle="italic">open — no obstruction</text>
            <text x="300" y="460" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#999" fontStyle="italic">wedding party zone</text>
          </svg>
        </div>

        <div className="bg-[#252525] rounded-lg p-6 mb-6">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#c9a96e] mb-4">
            Processional Order
          </div>
          <div className="space-y-3 mb-4">
            {[
              { n: "1", label: "Groomsmen", color: "#5c4a3a" },
              { n: "2", label: "Bridesmaids", color: "#2d5a45" },
              { n: "3", label: "Flower girls", color: "#c9a96e" },
              { n: "4", label: "Best man", color: "#5c4a3a" },
              { n: "5", label: "Monica + Cesar ✦", color: "#c9a96e", bold: true },
            ].map((p) => (
              <div key={p.n} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: p.color }}>
                  <span className="text-white text-[0.65rem] font-bold">{p.n}</span>
                </div>
                <span className={`font-jost text-sm ${p.bold ? "text-[#c9a96e] font-medium" : "text-[#ccc] font-light"}`}>
                  {p.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[0.78rem] font-jost font-light text-[#666] pt-4 border-t border-[#333] leading-relaxed">
            Wedding party stages in the private dining room. Enters through the ~8m kitchen opening into the main dining room. Walks toward Luis Miguel at the curved glass river wall. Bridesmaids peel left, groomsmen right, flower girls flank the aisle. Monica and Cesar enter last.
          </p>
        </div>

        <div className="bg-[#252525] rounded-lg p-6">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#c9a96e] mb-3">
            The Verdict on Spacing
          </div>
          <p className="text-[0.88rem] font-jost font-light text-[#ccc] leading-relaxed">
            The half-moon works in our favor. The room is widest exactly where the seating rows are —
            45 chairs in 3 rows fit without squeezing. The worst seat is the far corner of row 3, about{" "}
            <strong className="text-[#f7f3ec]">8.2m from the altar at roughly 62°</strong>. That&apos;s a real
            angle, but not a wall — everyone still has a clear sightline to Luis Miguel, the altar, and
            the processional. The 2.5m gap between the last row and the wedding party means guests don&apos;t
            feel like the bridesmaids are in their laps.{" "}
            <strong className="text-[#f7f3ec]">It won&apos;t feel cramped.</strong>
          </p>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 04 — THE FLIP                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Section
        id="flip"
        eyebrow="Section 04 · Logistics"
        title="Ceremony → Dinner → Dancing"
        subtitle="How the same room does three different jobs in one evening"
        dark
      >
        <div className="relative mb-10 pl-10 border-l border-[#2a2a2a]">
          {[
            { time: "16:30", label: "Guests Arrive", detail: "9 perimeter dinner tables already dressed and set. Ceremony chairs in the center only. The room looks beautiful from the moment people walk in — not like a room mid-setup.", confirmed: true },
            { time: "17:00", label: "Ceremony", detail: "~45 minutes. Full 45-person seating. Wedding party at the river wall. Luis Miguel at the glass. Maas behind them.", confirmed: true },
            { time: "17:45", label: "Cocktail Hour — The Flip", detail: "Guests move to the foyer and terrace (weather permitting). Venue team removes ~56 chairs from the center, brings in 4 tables. Estimated: ~30 minutes. The 45-minute cocktail hour covers it with room to spare.", confirmed: true },
            { time: "18:30", label: "Dinner", detail: "Main dining room: 13 tables, 54 guests. 1 table of 6 + 12 tables of 4. 2 tables remain spare. Room is full — which is exactly right for Parkheuvel.", confirmed: true },
            { time: "20:00", label: "Dancing", detail: "4 center tables cleared (~15 min). ~35–45m² opens in the middle of the half-moon. DJ in there. Perimeter tables stay for guests who want to sit. Terrace doors open for August overflow.", confirmed: false },
          ].map((item, i) => (
            <div key={i} className="relative pb-8 last:pb-0">
              <div className={`absolute -left-[2.85rem] top-0.5 w-4 h-4 rounded-full border-2 ${item.confirmed ? "bg-[#2d5a45] border-[#2d5a45]" : "bg-[#1a1a1a] border-[#c47f2a]"}`} />
              <div className="text-[0.68rem] font-jost font-semibold tracking-[0.15em] text-[#c9a96e] mb-1">{item.time}</div>
              <div className="font-serif text-[#f7f3ec] text-xl font-light mb-1">{item.label}</div>
              <p className="text-[0.82rem] font-jost font-light text-[#777] leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0d1e14] border border-[#2d5a45]/40 rounded-lg p-6 mb-8">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#2d5a45] mb-2">
            The Minimum-Disruption Flip
          </div>
          <p className="text-[0.85rem] font-jost font-light text-[#aaa] leading-relaxed">
            9 perimeter dinner tables are pre-set and dressed <em>before</em> guests arrive. After the ceremony,
            the venue team removes ~56 chairs from the center and brings in just 4 tables to complete the setup.
            Estimated time: <strong className="text-[#f7f3ec]">~30 minutes</strong>. A 45-minute cocktail hour
            covers this comfortably — even if it rains.
          </p>
        </div>

        {/* Scenario table — header is first element in DOM, no CSS tricks */}
        <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#c9a96e] mb-4">
          All Possible Combinations
        </div>
        <div className="rounded-lg overflow-hidden border border-[#2a2a2a]">
          <div className="grid grid-cols-[140px_1fr_1fr_1fr_90px] bg-[#0a0a0a]">
            {["Scenario", "Ceremony", "Dinner", "Dancing", "Verdict"].map((h) => (
              <div key={h} className="p-3 text-[0.65rem] font-jost font-semibold tracking-[0.12em] uppercase text-[#555] border-r border-[#1a1a1a] last:border-0">
                {h}
              </div>
            ))}
          </div>
          {[
            { name: "1 — Recommended", ceremony: "Main dining room · 9 pre-set tables · ceremony chairs in center · kitchen opening processional", dinner: "Main dining room · 4 center tables added during cocktail flip", dancing: "Main dining room (4 tables cleared) + terrace", verdict: "Best", verdictStyle: "bg-[#0d2a14] text-[#5aaa70]", rowStyle: "bg-[#0d1a10]" },
            { name: "2 — No flip needed", ceremony: "Private dining room (tight for 55 guests)", dinner: "Main dining room", dancing: "Main dining room (4 tables cleared) + terrace", verdict: "Possible", verdictStyle: "bg-[#1e1608] text-[#c47f2a]", rowStyle: "bg-[#111]" },
            { name: "3 — Foyer unlock", ceremony: "Main dining room", dinner: "Main dining room", dancing: "Foyer + champagne lounge combined (~55–75m²) — unconfirmed if they connect", verdict: "Unconfirmed", verdictStyle: "bg-[#1e1608] text-[#c47f2a]", rowStyle: "bg-[#111]" },
            { name: "4 — Outdoor", ceremony: "Terrace (August, beautiful)", dinner: "Main dining room", dancing: "Terrace after dinner · DJ near doors", verdict: "Weather risk", verdictStyle: "bg-[#1e0808] text-[#aa4a4a]", rowStyle: "bg-[#111]" },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-[140px_1fr_1fr_1fr_90px] border-t border-[#1a1a1a] ${row.rowStyle}`}>
              <div className="p-3 font-jost font-medium text-[0.8rem] text-[#f7f3ec] border-r border-[#1a1a1a]">{row.name}</div>
              <div className="p-3 text-[0.78rem] font-jost font-light text-[#777] border-r border-[#1a1a1a] leading-relaxed">{row.ceremony}</div>
              <div className="p-3 text-[0.78rem] font-jost font-light text-[#777] border-r border-[#1a1a1a] leading-relaxed">{row.dinner}</div>
              <div className="p-3 text-[0.78rem] font-jost font-light text-[#777] border-r border-[#1a1a1a] leading-relaxed">{row.dancing}</div>
              <div className="p-3 flex items-start">
                <span className={`text-[0.65rem] font-jost font-semibold px-2 py-0.5 rounded-full tracking-wide ${row.verdictStyle}`}>{row.verdict}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 05 — OPEN QUESTIONS                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Section
        id="questions"
        eyebrow="Section 05 · April Walkthrough"
        title="What We Still Need to Answer"
        subtitle="These are the questions that can only be resolved in person at Parkheuvel. Everything else is already figured out."
      >
        <div className="bg-[#252525] rounded-lg p-8">
          <CheckGroup
            title="Ceremony + Processional"
            items={[
              "Stand in the kitchen opening and feel it. Does it read as a proper entrance or does it feel like walking out of a kitchen? This is the most important thing to verify in person — the whole processional concept depends on this one answer.",
              "Can 9 perimeter dinner tables be pre-set and dressed before guests arrive, with ceremony chairs in the center only?",
              "Can the wedding party access the private dining room before the ceremony without crossing through the main dining room in front of guests?",
              "How wide is the kitchen opening exactly? ~8m is estimated — confirm. Wide enough for Monica + Cesar side by side?",
              "Flip timing: with 3–4 staff removing ~56 chairs and bringing in 4 tables, is 30 minutes realistic or do they need 45?",
            ]}
          />
          <CheckGroup
            title="Dinner"
            items={[
              "Can the 55th guest be accommodated — either 7 at the table of 6, or a 5th chair at one 4-top?",
              "Is the private dining room available during dinner for a kids table, gift table, or overflow bar?",
            ]}
          />
          <CheckGroup
            title="Dancing"
            items={[
              "For Option A: where do the 4 cleared tables go, and how fast can the team clear them post-dinner?",
              "For Option B: do the foyer and champagne lounge connect openly? If yes, can that combined space work for dancing?",
              "What is the rain or wind backup if the terrace is ruled out on the night?",
              "Is there a sound curfew or music policy given the park location?",
            ]}
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-[0.75rem] font-jost font-light text-[#aaa]">
            All dimensions estimated · Confirm at April walkthrough
          </p>
          <p className="text-[0.72rem] font-jost font-light text-[#666] mt-1">
            parkheuvel.nl · +31 10 436 0766 · Heuvellaan 21, 3016 GL Rotterdam
          </p>
        </div>
      </Section>

      {/* ── PAGE FOOTER ────────────────────────────────────────────────────── */}
      <div className="bg-[#252525] border-t border-[#c9a96e]/30 py-8 text-center">
        <p className="font-serif text-[#c9a96e] text-2xl tracking-widest">L & M</p>
        <p className="text-[0.7rem] font-jost font-light text-[#444] tracking-[0.15em] mt-2 uppercase">
          August 1, 2026 · Internal Use Only
        </p>
      </div>
    </div>
  );
}
