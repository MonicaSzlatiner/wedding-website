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
              { hex: "#E8DDB8", name: "Warm Champagne", detail: "Eline · Chaima · Noura\njunior bridesmaids\nflower girl · 8 · classic ivory tulle dress", border: true },
              { hex: "#F5F0E4", name: "Bridal Ivory", detail: "Monica\nwarm bouquet · blush\nchampagne florals", border: true },
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
            <strong className="text-[#f7f3ec]">warm and soft at the back</strong> — champagne, bridal ivory. As guests watch the procession walk toward the altar, the colors tell a story that warms up as it reaches you.{" "}
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
            <text x="390" y="422" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8.5" fill="#2d5a2d">Option B ceremony (weather call · 15:00) · dancing post-dinner</text>
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
            <text x="208" y="213" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="8" fill="#7a5a20">too small for dancing</text>
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
        {/* Event cards — Ceremony · Dinner · Dancing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Ceremony card */}
          <div className="bg-[#111] border border-[#c47f2a]/50 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2a2a]" style={{ background: "linear-gradient(135deg, #1a1508, #111)" }}>
              <div className="text-[0.6rem] font-jost font-semibold tracking-[0.15em] uppercase text-[#c47f2a] mb-0.5">Step 1</div>
              <div className="font-serif text-[#f7f3ec] text-lg font-light">Ceremony</div>
              <span className="text-[0.6rem] font-jost font-medium px-2 py-0.5 rounded-full bg-[#1e1608] text-[#c47f2a] tracking-wide">&#9888; Not decided</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-[0.75rem] font-jost font-light text-[#777]">55 guests · American-style processional · ~45 min</div>
              <div className="bg-[#0d1a10] border border-[#2d5a45]/30 rounded-md p-3">
                <div className="text-[0.65rem] font-jost font-semibold tracking-[0.1em] uppercase text-[#2d5a45] mb-1">Option A — Recommended</div>
                <div className="text-[0.72rem] font-jost font-medium text-[#ccc] mb-1">Main dining room · aisle toward the Maas</div>
                <p className="text-[0.72rem] font-jost font-light text-[#777] leading-relaxed mb-1">9 perimeter dinner tables are pre-set before guests arrive. Ceremony chairs fill the center only. Wedding party enters through the 8m kitchen opening, walks toward the river. Luis Miguel at the curved glass wall. Flip takes ~30 min.</p>
                <span className="text-[0.6rem] font-jost text-[#555]">~8–9m aisle · river backdrop · flip ~30 min</span>
              </div>
              <div className="bg-[#1a1508] border border-[#c47f2a]/30 rounded-md p-3">
                <div className="text-[0.65rem] font-jost font-semibold tracking-[0.1em] uppercase text-[#c47f2a] mb-1">Option B — Weather-conditional upgrade</div>
                <div className="text-[0.72rem] font-jost font-medium text-[#ccc] mb-1">Terrace · curved crescent · Maas backdrop</div>
                <p className="text-[0.72rem] font-jost font-light text-[#777] leading-relaxed mb-1">The building is a full semicircle — the terrace wraps the river-facing arc. 80m² of open crescent. Wedding party walks through the dining room and out through the curved glass doors. Luis Miguel at the railing with the river behind him. Chairs follow the arc naturally. No flip needed: dinner is already set inside. Call it at 15:00 on the day.</p>
                <span className="text-[0.6rem] font-jost text-[#555]">~80m² crescent · Maas backdrop · weather call by 15:00</span>
              </div>
              <p className="text-[0.72rem] font-jost font-light text-[#9e3a3a] leading-relaxed italic">Critical April questions: does the kitchen opening feel like a proper entrance or a kitchen door? And on the terrace — how exposed is it to wind off the river? Stand there and feel it. Both of these can only be answered in person.</p>
            </div>
          </div>

          {/* Dinner card */}
          <div className="bg-[#111] border border-[#2d5a45]/50 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2a2a]" style={{ background: "linear-gradient(135deg, #0d1a10, #111)" }}>
              <div className="text-[0.6rem] font-jost font-semibold tracking-[0.15em] uppercase text-[#2d5a45] mb-0.5">Step 2</div>
              <div className="font-serif text-[#f7f3ec] text-lg font-light">Dinner</div>
              <span className="text-[0.6rem] font-jost font-medium px-2 py-0.5 rounded-full bg-[#0d2a14] text-[#5aaa70] tracking-wide">&#10003; Confirmed direction</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-[0.75rem] font-jost font-light text-[#777]">55 guests · 13 tables · 1 table of 6 + 12 tables of 4</div>
              <div className="bg-[#0d1a10] border border-[#2d5a45]/30 rounded-md p-3">
                <div className="text-[0.65rem] font-jost font-semibold tracking-[0.1em] uppercase text-[#2d5a45] mb-1">Confirmed</div>
                <p className="text-[0.72rem] font-jost font-light text-[#777] leading-relaxed">Main dining room only. 13 of 15 available tables in use. 2 tables spare. Room is full during dinner — that&apos;s correct and expected for Parkheuvel.</p>
              </div>
              <div className="bg-[#0d1a10] border border-[#2d5a45]/30 rounded-md p-3">
                <div className="text-[0.65rem] font-jost font-semibold tracking-[0.1em] uppercase text-[#2d5a45] mb-1">Seating</div>
                <div className="text-[0.72rem] font-jost font-medium text-[#ccc] mb-1">1 table of 6 + 12 tables of 4 = 54</div>
                <p className="text-[0.72rem] font-jost font-light text-[#777] leading-relaxed mb-1">One guest short. Seat them at the table of 6 (now 7), or ask if one 4-top can take a 5th chair.</p>
                <span className="text-[0.6rem] font-jost text-[#555]">13 tables used · 2 tables remain empty</span>
              </div>
              <div className="bg-[#0d1a10] border border-[#2d5a45]/30 rounded-md p-3">
                <div className="text-[0.65rem] font-jost font-semibold tracking-[0.1em] uppercase text-[#2d5a45] mb-1">Private dining room role</div>
                <div className="text-[0.72rem] font-jost font-medium text-[#ccc] mb-1">Available for overflow or kids</div>
                <p className="text-[0.72rem] font-jost font-light text-[#777] leading-relaxed mb-1">Even if dinner is main room only, the private dining room can hold a kids table, gift table, or overflow bar.</p>
                <span className="text-[0.6rem] font-jost text-[#555]">~30–35m² · separate room</span>
              </div>
              <p className="text-[0.72rem] font-jost font-light text-[#9e3a3a] leading-relaxed italic">One open question: does the private dining room stay available during dinner for secondary use, or does Parkheuvel need it for something else?</p>
            </div>
          </div>

          {/* Dancing card */}
          <div className="bg-[#111] border border-[#c47f2a]/50 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2a2a]" style={{ background: "linear-gradient(135deg, #1a1508, #111)" }}>
              <div className="text-[0.6rem] font-jost font-semibold tracking-[0.15em] uppercase text-[#c47f2a] mb-0.5">Step 3</div>
              <div className="font-serif text-[#f7f3ec] text-lg font-light">Dancing</div>
              <span className="text-[0.6rem] font-jost font-medium px-2 py-0.5 rounded-full bg-[#1e1608] text-[#c47f2a] tracking-wide">&#9888; Still unknown</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-[0.75rem] font-jost font-light text-[#777]">~20–25 dancing at once · DJ · post-dinner</div>
              <div className="bg-[#0d1a10] border border-[#2d5a45]/30 rounded-md p-3">
                <div className="text-[0.65rem] font-jost font-semibold tracking-[0.1em] uppercase text-[#2d5a45] mb-1">Option A — Most viable</div>
                <div className="text-[0.72rem] font-jost font-medium text-[#ccc] mb-1">Main dining room after flip</div>
                <p className="text-[0.72rem] font-jost font-light text-[#777] leading-relaxed mb-1">4 center tables cleared after dinner. Opens ~35–45m² in the middle of the half-moon. DJ sets up there. Perimeter tables stay for guests who want to sit. Terrace doors open for August overflow — guests drift in and out naturally.</p>
                <span className="text-[0.6rem] font-jost text-[#555]">~35–45m² after flip · needs 15–20 min</span>
              </div>
              <div className="bg-[#1a1508] border border-[#c47f2a]/30 rounded-md p-3">
                <div className="text-[0.65rem] font-jost font-semibold tracking-[0.1em] uppercase text-[#c47f2a] mb-1">Option B — August night on the river</div>
                <div className="text-[0.72rem] font-jost font-medium text-[#ccc] mb-1">Terrace · Maas at night · DJ near the doors</div>
                <p className="text-[0.72rem] font-jost font-light text-[#777] leading-relaxed mb-1">DJ sets up near the open terrace doors so sound carries both ways. Guests dance on the crescent with the Maas in front. Perimeter tables inside stay for anyone who wants to sit. Wind and noise curfew are the two things to confirm in April.</p>
                <span className="text-[0.6rem] font-jost text-[#555]">~80m² · weather dependent · confirm noise curfew</span>
              </div>
              <p className="text-[0.72rem] font-jost font-light text-[#9e3a3a] leading-relaxed italic">Ask in April: can the DJ set up near the terrace doors so sound works both inside and out? Is there a noise or music curfew given the park location?</p>
            </div>
          </div>
        </div>

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

{/* Option B — Terrace Ceremony Diagram */}
        <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6 mb-8">
          <div className="text-[0.68rem] tracking-[0.2em] uppercase font-jost font-semibold text-[#c9a96e] mb-4">
            Option B — Terrace ceremony · curved crescent · weather-conditional
          </div>
          <div className="rounded-md p-4 mb-4" style={{ background: "#fffbf2", border: "1px solid #e0c87a" }}>
            <p className="text-[0.8rem] font-jost font-light leading-relaxed" style={{ color: "#7a5c00" }}>
              <strong style={{ color: "#5a3c00" }}>The building is a full semicircle.</strong> The terrace wraps the river-facing arc &mdash; it&apos;s a curved crescent, not a rectangle. Chairs follow the arc naturally, so every seat curves inward toward the aisle. Option A (indoor) is the default plan; this is the upgrade if August cooperates. Rain call: 15:00 on the day.
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 960 700" width="100%" style="max-width:960px;display:block;margin:0 auto;">
        <defs>
          <marker id="tda" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#888"/>
          </marker>
          <marker id="tda-r" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
            <path d="M0,0 L6,3 L0,6 Z" fill="#888"/>
          </marker>
          <marker id="t-ag" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#2d5a45"/>
          </marker>
          <marker id="t-ab" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#5c4a3a"/>
          </marker>
          <marker id="t-agold" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#c9a96e"/>
          </marker>
          <marker id="t-ablue" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#5e8da8"/>
          </marker>
          <marker id="t-sight" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#9e3a3a" opacity="0.6"/>
          </marker>
          <g id="tch">
            <rect x="-4.5" y="-9" width="9" height="5.5" rx="1" fill="#b8ae9c"/>
            <rect x="-4.5" y="-3.5" width="9" height="5" rx="1" fill="#ccc5b8"/>
            <circle cx="0" cy="-13" r="3.5" fill="#cfc8ba"/>
          </g>
          <g id="t-spe">
            <circle cx="0" cy="-22" r="7" fill="#2d5a45"/>
            <rect x="-6" y="-15" width="12" height="15" rx="3" fill="#2d5a45"/>
          </g>
          <g id="t-spb">
            <circle cx="0" cy="-22" r="7" fill="#5c4a3a"/>
            <rect x="-6" y="-15" width="12" height="15" rx="3" fill="#5c4a3a"/>
          </g>
          <g id="t-spg">
            <circle cx="0" cy="-22" r="7" fill="#c9a96e"/>
            <rect x="-6" y="-15" width="12" height="15" rx="3" fill="#c9a96e"/>
          </g>
          <clipPath id="t-bottom">
            <rect x="0" y="230" width="960" height="470"/>
          </clipPath>
          <clipPath id="t-top">
            <rect x="0" y="0" width="960" height="230"/>
          </clipPath>
        </defs>

        <rect width="960" height="700" fill="#f8f6f0" rx="6"/>

        
        <rect x="0" y="620" width="960" height="80" fill="#d4eaf7"/>
        <text x="480" y="654" text-anchor="middle" font-family="Jost,sans-serif" font-size="13" fill="#5e8da8" letter-spacing="5">NIEUWE MAAS</text>
        <text x="480" y="672" text-anchor="middle" font-family="Jost,sans-serif" font-size="9" fill="#7ab4cc">river · open water · ships passing</text>

        
        <rect x="100" y="608" width="760" height="14" fill="#c8d8b0" stroke="#9ab880" stroke-width="1" rx="2"/>
        <text x="480" y="619" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#5a7a40">embankment edge</text>

        
        <ellipse cx="480" cy="230" rx="360" ry="300" fill="#edf5e8" clip-path="url(#t-bottom)"/>
        <ellipse cx="480" cy="230" rx="260" ry="218" fill="#f0ede4" clip-path="url(#t-bottom)"/>

        
        <ellipse cx="480" cy="230" rx="360" ry="300" fill="none" stroke="#7ab87a" stroke-width="2.5" clip-path="url(#t-bottom)"/>
        
        <ellipse cx="480" cy="230" rx="260" ry="218" fill="none" stroke="#5e8da8" stroke-width="2" stroke-dasharray="8,5" clip-path="url(#t-bottom)"/>

        
        <text x="185" y="530" text-anchor="middle" font-family="Jost,sans-serif" font-size="9" fill="#5a9a5a" font-style="italic">terrace · ~80m²</text>
        <text x="775" y="530" text-anchor="middle" font-family="Jost,sans-serif" font-size="9" fill="#5a9a5a" font-style="italic">terrace · ~80m²</text>
        <text x="480" y="598" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#5a9a5a">outer railing — river below</text>
        <text x="178" y="390" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#5e8da8" transform="rotate(-52 178 390)">curved glass wall</text>

        
        <ellipse cx="480" cy="230" rx="260" ry="218" fill="#f0ede4" stroke="#2d5a45" stroke-width="2.5" clip-path="url(#t-top)"/>
        <line x1="220" y1="230" x2="740" y2="230" stroke="#2d5a45" stroke-width="2.5"/>
        <text x="480" y="130" text-anchor="middle" font-family="Jost,sans-serif" font-size="11" fill="#2d5a45" font-weight="600">MAIN DINING ROOM</text>
        <text x="480" y="147" text-anchor="middle" font-family="Jost,sans-serif" font-size="8.5" fill="#4a8c6e">dinner tables pre-set · guests assemble here</text>

        
        <rect x="350" y="20" width="260" height="38" fill="#e8e4da" stroke="#a09880" stroke-width="1.5" rx="3"/>
        <text x="480" y="36" text-anchor="middle" font-family="Jost,sans-serif" font-size="9.5" fill="#555" font-weight="600">FOYER / ENTRANCE · Heuvellaan 21</text>
        <text x="480" y="50" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#888">guests arrive up the steps · park side</text>

        
        <text x="480" y="14" text-anchor="middle" font-family="Jost,sans-serif" font-size="9" fill="#888" font-style="italic">← Het Park · entrance via steps</text>

        
        <rect x="650" y="58" width="180" height="75" fill="#edf0ff" stroke="#6080c0" stroke-width="1.5" rx="4"/>
        <text x="740" y="80" text-anchor="middle" font-family="Jost,sans-serif" font-size="10" fill="#3050a0" font-weight="600">PRIVATE DINING</text>
        <text x="740" y="95" text-anchor="middle" font-family="Jost,sans-serif" font-size="8.5" fill="#5070b0">wedding party stages here</text>
        <text x="740" y="108" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#888">→ dining room → glass doors → terrace</text>
        <path d="M700,133 Q640,180 560,232" stroke="#6080c0" stroke-width="1.5" fill="none" stroke-dasharray="5,4" marker-end="url(#t-ablue)"/>

        
        <path d="M390,448 A260,218 0 0,1 570,448" fill="rgba(201,169,110,0.2)" stroke="#c9a96e" stroke-width="2" stroke-dasharray="5,3"/>
        <text x="480" y="444" text-anchor="middle" font-family="Jost,sans-serif" font-size="8.5" fill="#c9a96e" font-weight="500">curved glass doors · open · party enters here</text>

        
        <rect x="455" y="450" width="50" height="140" fill="rgba(201,169,110,0.12)"/>
        <line x1="455" y1="450" x2="455" y2="590" stroke="rgba(201,169,110,0.5)" stroke-width="1" stroke-dasharray="5,5"/>
        <line x1="505" y1="450" x2="505" y2="590" stroke="rgba(201,169,110,0.5)" stroke-width="1" stroke-dasharray="5,5"/>
        <text x="480" y="510" text-anchor="middle" font-family="Jost,sans-serif" font-size="8.5" fill="#c9a96e" font-style="italic" transform="rotate(-90 480 510)">aisle ~1.2m</text>

        
        
        

        
        <use href="#tch" transform="translate(194,273) rotate(80)"/>
        <use href="#tch" transform="translate(217,334) rotate(65)"/>
        <use href="#tch" transform="translate(258,387) rotate(50)"/>
        <use href="#tch" transform="translate(294,418) rotate(40)"/>
        <use href="#tch" transform="translate(335,442) rotate(30)"/>
        <use href="#tch" transform="translate(381,460) rotate(20)"/>
        <use href="#tch" transform="translate(410,466) rotate(12)"/>
        
        <use href="#tch" transform="translate(766,273) rotate(-80)"/>
        <use href="#tch" transform="translate(743,334) rotate(-65)"/>
        <use href="#tch" transform="translate(702,387) rotate(-50)"/>
        <use href="#tch" transform="translate(666,418) rotate(-40)"/>
        <use href="#tch" transform="translate(625,442) rotate(-30)"/>
        <use href="#tch" transform="translate(579,460) rotate(-20)"/>
        <use href="#tch" transform="translate(550,466) rotate(-12)"/>

        
        <use href="#tch" transform="translate(165,277) rotate(80)"/>
        <use href="#tch" transform="translate(190,344) rotate(65)"/>
        <use href="#tch" transform="translate(235,404) rotate(50)"/>
        <use href="#tch" transform="translate(274,437) rotate(40)"/>
        <use href="#tch" transform="translate(320,464) rotate(30)"/>
        <use href="#tch" transform="translate(371,484) rotate(20)"/>
        <use href="#tch" transform="translate(413,494) rotate(12)"/>
        
        <use href="#tch" transform="translate(795,277) rotate(-80)"/>
        <use href="#tch" transform="translate(770,344) rotate(-65)"/>
        <use href="#tch" transform="translate(725,404) rotate(-50)"/>
        <use href="#tch" transform="translate(686,437) rotate(-40)"/>
        <use href="#tch" transform="translate(640,464) rotate(-30)"/>
        <use href="#tch" transform="translate(589,484) rotate(-20)"/>
        <use href="#tch" transform="translate(547,494) rotate(-12)"/>

        
        <use href="#tch" transform="translate(135,281) rotate(80)"/>
        <use href="#tch" transform="translate(163,355) rotate(65)"/>
        <use href="#tch" transform="translate(212,420) rotate(50)"/>
        <use href="#tch" transform="translate(255,456) rotate(40)"/>
        <use href="#tch" transform="translate(305,486) rotate(30)"/>
        <use href="#tch" transform="translate(360,507) rotate(20)"/>
        <use href="#tch" transform="translate(407,519) rotate(12)"/>
        
        <use href="#tch" transform="translate(825,281) rotate(-80)"/>
        <use href="#tch" transform="translate(817,355) rotate(-65)"/>
        <use href="#tch" transform="translate(748,420) rotate(-50)"/>
        <use href="#tch" transform="translate(705,456) rotate(-40)"/>
        <use href="#tch" transform="translate(655,486) rotate(-30)"/>
        <use href="#tch" transform="translate(600,507) rotate(-20)"/>
        <use href="#tch" transform="translate(553,519) rotate(-12)"/>

        
        <text x="112" y="292" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#999" font-style="italic">row 3</text>
        <text x="143" y="360" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#999" font-style="italic">row 2</text>
        <text x="174" y="430" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#999" font-style="italic">row 1</text>
        <text x="838" y="292" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#999" font-style="italic">row 3</text>
        <text x="808" y="360" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#999" font-style="italic">row 2</text>
        <text x="787" y="430" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#999" font-style="italic">row 1</text>

        
        <use href="#t-spe" transform="translate(340,555) rotate(30)"/>
        <use href="#t-spe" transform="translate(372,565) rotate(20)"/>
        <use href="#t-spe" transform="translate(407,570) rotate(10)"/>
        <text x="365" y="590" text-anchor="middle" font-family="Jost,sans-serif" font-size="9.5" fill="#2d5a45" font-weight="600">bridesmaids</text>

        <use href="#t-spb" transform="translate(620,555) rotate(-30)"/>
        <use href="#t-spb" transform="translate(588,565) rotate(-20)"/>
        <use href="#t-spb" transform="translate(553,570) rotate(-10)"/>
        <text x="595" y="590" text-anchor="middle" font-family="Jost,sans-serif" font-size="9.5" fill="#5c4a3a" font-weight="600">groomsmen</text>

        <use href="#t-spg" transform="translate(435,543)"/>
        <use href="#t-spg" transform="translate(525,543)"/>
        <text x="480" y="530" text-anchor="middle" font-family="Jost,sans-serif" font-size="9" fill="#a08040">flower girls</text>

        
        <rect x="425" y="558" width="110" height="24" fill="rgba(201,169,110,0.1)" stroke="#c9a96e" stroke-width="1.8" stroke-dasharray="5,3" rx="4"/>
        <text x="480" y="574" text-anchor="middle" font-family="Jost,sans-serif" font-size="9" fill="#c9a96e" font-weight="500">Monica + Laurens</text>

        
        <circle cx="480" cy="596" r="10" fill="#2d5a45"/>
        <rect x="474" y="606" width="12" height="13" rx="3" fill="#2d5a45"/>
        <text x="480" y="593" text-anchor="middle" font-family="Jost,sans-serif" font-size="7" fill="white" font-weight="700">L.M.</text>
        <rect x="506" y="582" width="140" height="34" fill="white" stroke="#2d5a45" stroke-width="1" rx="3" opacity="0.92"/>
        <text x="576" y="597" text-anchor="middle" font-family="Jost,sans-serif" font-size="9" fill="#2d5a45" font-weight="600">Luis Miguel · officiant</text>
        <text x="576" y="609" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#4a8c6e">at the railing · Maas behind him</text>
        <line x1="506" y1="596" x2="490" y2="596" stroke="#2d5a45" stroke-width="1"/>

        
        <path d="M452,450 Q400,490 372,540" stroke="#2d5a45" stroke-width="2" fill="none" stroke-dasharray="7,5" marker-end="url(#t-ag)"/>
        <path d="M508,450 Q560,490 588,540" stroke="#5c4a3a" stroke-width="2" fill="none" stroke-dasharray="7,5" marker-end="url(#t-ab)"/>
        <path d="M466,450 L435,520" stroke="#c9a96e" stroke-width="1.5" fill="none" stroke-dasharray="5,5"/>
        <path d="M494,450 L525,520" stroke="#c9a96e" stroke-width="1.5" fill="none" stroke-dasharray="5,5"/>
        <path d="M480,450 L480,550" stroke="#c9a96e" stroke-width="3" fill="none" marker-end="url(#t-agold)"/>

        
        <rect x="516" y="466" width="138" height="36" fill="white" stroke="#c9a96e" stroke-width="1.2" rx="3"/>
        <text x="585" y="481" text-anchor="middle" font-family="Jost,sans-serif" font-size="10" fill="#c9a96e" font-weight="600">Monica + Cesar</text>
        <text x="585" y="495" text-anchor="middle" font-family="Jost,sans-serif" font-size="8.5" fill="#c9a96e">enter last · center</text>
        <line x1="516" y1="484" x2="506" y2="484" stroke="#c9a96e" stroke-width="1"/>

        
        <line x1="135" y1="281" x2="480" y2="566" stroke="#9e3a3a" stroke-width="1.3" stroke-dasharray="8,5" opacity="0.45" marker-end="url(#t-sight)"/>
        <line x1="825" y1="281" x2="480" y2="566" stroke="#9e3a3a" stroke-width="1.3" stroke-dasharray="8,5" opacity="0.45" marker-end="url(#t-sight)"/>

        <rect x="14" y="270" width="120" height="52" fill="white" stroke="#9e3a3a" stroke-width="1" rx="3" opacity="0.92"/>
        <text x="74" y="288" text-anchor="middle" font-family="Jost,sans-serif" font-size="9" fill="#9e3a3a" font-weight="600">Worst corner seat</text>
        <text x="74" y="302" text-anchor="middle" font-family="Jost,sans-serif" font-size="8.5" fill="#9e3a3a">clear open-air view</text>
        <text x="74" y="315" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#888">arc rows curve inward —</text>
        <text x="74" y="326" text-anchor="middle" font-family="Jost,sans-serif" font-size="8" fill="#888">no angle problem</text>

        
        <rect x="814" y="42" width="140" height="158" fill="white" stroke="#e0d8cc" stroke-width="1.2" rx="5"/>
        <text x="824" y="62" font-family="Jost,sans-serif" font-size="8" fill="#aaa" font-weight="600" letter-spacing="0.1em">PROCESSIONAL ORDER</text>
        <line x1="824" y1="68" x2="944" y2="68" stroke="#eee" stroke-width="1"/>
        <circle cx="832" cy="86" r="5" fill="#5c4a3a"/>
        <text x="844" y="90" font-family="Jost,sans-serif" font-size="9.5" fill="#555">1. Groomsmen</text>
        <circle cx="832" cy="110" r="5" fill="#2d5a45"/>
        <text x="844" y="114" font-family="Jost,sans-serif" font-size="9.5" fill="#555">2. Bridesmaids</text>
        <circle cx="832" cy="134" r="5" fill="#c9a96e"/>
        <text x="844" y="138" font-family="Jost,sans-serif" font-size="9.5" fill="#555">3. Flower girls</text>
        <circle cx="832" cy="158" r="5" fill="#5c4a3a"/>
        <text x="844" y="162" font-family="Jost,sans-serif" font-size="9.5" fill="#555">4. Best man</text>
        <circle cx="832" cy="182" r="6" fill="#c9a96e" stroke="#a08040" stroke-width="1.5"/>
        <text x="844" y="186" font-family="Jost,sans-serif" font-size="9.5" fill="#c9a96e" font-weight="700">5. Monica + Cesar ✦</text>

      </svg>` }} />
          <div className="rounded-md p-4 mt-4" style={{ background: "#fffbf2", border: "1px solid #e8c870" }}>
            <div className="text-[0.7rem] font-jost font-semibold tracking-[0.12em] uppercase mb-1" style={{ color: "#b07820" }}>Weather protocol</div>
            <p className="text-[0.84rem] font-jost font-light leading-relaxed" style={{ color: "#333" }}>
              Option A (indoor) is the default and requires no decision. Option B (terrace) is the upgrade &mdash; call it at <strong>15:00 on the day</strong>. If it&apos;s clear and calm, step outside. If there&apos;s any doubt, the indoor ceremony is already set and ready. Discuss with Parkheuvel in April how quickly chairs can move from inside to terrace if you decide late.
            </p>
          </div>
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
            { name: "2 — Terrace upgrade", ceremony: "Terrace · curved crescent · party exits through glass doors · Luis Miguel at railing · Maas behind him · call at 15:00", dinner: "Main dining room (already set — no flip needed)", dancing: "Main dining room (4 tables cleared) + terrace doors open", verdict: "Weather call", verdictStyle: "bg-[#1e1608] text-[#c47f2a]", rowStyle: "bg-[#111]" },
            { name: "3 — No flip", ceremony: "Private dining room (too small for 55 guests)", dinner: "Main dining room", dancing: "Main dining room (4 tables cleared) + terrace", verdict: "Too small", verdictStyle: "bg-[#1e0808] text-[#aa4a4a]", rowStyle: "bg-[#111]" },
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
            title="Option A — Indoor ceremony"
            items={[
              "Stand in the kitchen opening and feel it. Does it read as a proper entrance or does it feel like walking out of a kitchen? This is the most important thing to verify in person — the whole processional concept depends on this one answer.",
              "Can 9 perimeter dinner tables be pre-set and dressed before guests arrive, with ceremony chairs in the center only?",
              "Can the wedding party access the private dining room before the ceremony without crossing through the main dining room in front of guests?",
              "How wide is the kitchen opening exactly? ~8m is estimated — confirm. Wide enough for Monica + Cesar side by side?",
              "Flip timing: with 3–4 staff removing ~56 chairs and bringing in 4 tables, is 30 minutes realistic or do they need 45?",
            ]}
          />
          <CheckGroup
            title="Option B — Terrace ceremony"
            items={[
              "Stand at the terrace railing and feel the wind. It comes off the Maas — is it manageable in August, or does it make vows and music difficult?",
              "How wide is the crescent at its deepest point? 80m² total, but usable depth at the outer edges may be tighter than the center.",
              "How quickly can chairs move from indoors to the terrace? If you call it at 15:00, when can it be set?",
              "Where do the glass doors open onto the terrace — one central opening or multiple points across the arc?",
              "Is there any sound or noise curfew for the park location?",
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
              "Can the DJ set up near the terrace doors so sound carries both ways — inside and out?",
              "Is there a sound curfew or music cutoff time given the park location?",
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
