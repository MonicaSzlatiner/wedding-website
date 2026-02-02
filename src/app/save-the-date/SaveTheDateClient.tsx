"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { weddingConfig } from "@/config/content";
import { generateGoogleCalendarUrl, downloadICSFile } from "@/lib/calendar";
import { recordSaveTheDateView } from "@/lib/supabase";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

interface SaveTheDateClientProps {
  guestName: string | null;
  hasPlusOne: boolean;
  code: string;
  isAdmin: boolean;
  isValidCode: boolean;
  guestId: string | null;
}

// Decorative flourish SVG component
function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 20" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0 10 H85 M115 10 H200" 
        stroke="currentColor" 
        strokeWidth="0.5"
        opacity="0.3"
      />
      <path 
        d="M90 10 C90 5, 95 2, 100 2 C105 2, 110 5, 110 10 C110 15, 105 18, 100 18 C95 18, 90 15, 90 10" 
        stroke="currentColor" 
        strokeWidth="0.5"
        opacity="0.4"
      />
      <circle cx="100" cy="10" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function SaveTheDateClient({
  guestName,
  hasPlusOne,
  code,
  isAdmin,
  isValidCode,
  guestId,
}: SaveTheDateClientProps) {
  const [animationPhase, setAnimationPhase] = useState<"closed" | "opening" | "open">("closed");
  const [copied, setCopied] = useState(false);

  // Extract first name only
  const fullName = guestName || "Friend";
  const firstName = fullName.split(" ")[0];
  
  const { calendarEvent, couple, date, venue } = weddingConfig;

  // Record view when page loads (only once per session)
  useEffect(() => {
    if (guestId && isValidCode) {
      const viewKey = `std_viewed_${guestId}`;
      if (!sessionStorage.getItem(viewKey)) {
        recordSaveTheDateView(guestId).then((success) => {
          if (success) {
            sessionStorage.setItem(viewKey, "true");
          }
        });
      }
    }
  }, [guestId, isValidCode]);

  // Handle opening the envelope
  const handleOpen = useCallback(() => {
    if (animationPhase !== "closed") return;
    setAnimationPhase("opening");
    setTimeout(() => {
      setAnimationPhase("open");
    }, 1800);
  }, [animationPhase]);

  // Copy invite link
  const handleCopyLink = useCallback(() => {
    const url = `${window.location.origin}/save-the-date?code=${code}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  // Calendar actions
  const handleGoogleCalendar = () => {
    window.open(generateGoogleCalendarUrl(calendarEvent), "_blank");
  };

  const handleDownloadICS = () => {
    downloadICSFile(calendarEvent, "save-the-date-laurens-monica.ics");
  };

  // Envelope dimensions
  const FLAP_HEIGHT_PERCENT = 35;

  // Luxurious paper texture pattern (subtle)
  const paperTextureStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundBlendMode: "soft-light" as const,
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8"
      style={{ backgroundColor: "#E8E6E1" }}
    >
      {/* Admin Panel */}
      {isAdmin && (
        <div 
          className="fixed bottom-4 left-4 z-50 p-4 rounded-xl text-xs font-sans max-w-xs backdrop-blur-sm"
          style={{ backgroundColor: "rgba(26, 26, 26, 0.85)", color: "#F8F9FA" }}
        >
          <p className="font-medium mb-2 uppercase" style={{ letterSpacing: "0.1em" }}>
            Admin Panel
          </p>
          <div className="space-y-1 mb-3 opacity-80">
            <p>Code: <span className="font-mono">{code || "(none)"}</span></p>
            <p>Guest: {isValidCode ? guestName : "Not found"}</p>
            <p>Plus One: {isValidCode ? (hasPlusOne ? "Yes" : "No") : "N/A"}</p>
          </div>
          {code && (
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-xs uppercase transition-all w-full justify-center"
              style={{ 
                backgroundColor: copied ? "#6B705C" : "rgba(255, 255, 255, 0.1)",
                letterSpacing: "0.05em"
              }}
            >
              {copied ? (
                <>
                  <CheckIcon className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="h-3.5 w-3.5" />
                  Copy Invite Link
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {animationPhase === "closed" && (
            /* ============================================
               CLOSED ENVELOPE STATE
               ============================================ */
            <motion.div
              key="envelope-closed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              {/* Envelope Container */}
              <div className="relative mb-10" style={{ perspective: "1200px" }}>
                {/* Envelope body with luxurious shadow */}
                <div 
                  className="relative rounded-sm overflow-visible"
                  style={{ 
                    backgroundColor: "#FDFCFA",
                    paddingTop: `${FLAP_HEIGHT_PERCENT}%`,
                    boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.15), 0 10px 30px -10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Envelope liner (visible at edges) */}
                  <div 
                    className="absolute inset-0 rounded-sm"
                    style={{ 
                      background: "linear-gradient(135deg, #6B705C 0%, #5A5F4E 100%)",
                      padding: "3px",
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-sm"
                      style={{ backgroundColor: "#FDFCFA" }}
                    />
                  </div>

                  {/* Envelope body content area */}
                  <div 
                    className="relative aspect-[4/3] flex flex-col items-center justify-center p-10"
                    style={{ backgroundColor: "#FDFCFA" }}
                  >
                    {/* Subtle decorative border */}
                    <div 
                      className="absolute inset-4 border rounded-sm pointer-events-none"
                      style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}
                    />

                    {/* Guest name with gold accent */}
                    <p 
                      className="font-serif text-2xl sm:text-3xl md:text-4xl text-center mb-2"
                      style={{ 
                        color: "#1A1A1A", 
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {fullName}
                    </p>

                    {/* Plus one indicator */}
                    {hasPlusOne && (
                      <p 
                        className="font-sans text-xs uppercase"
                        style={{ 
                          color: "#D4AF37", 
                          letterSpacing: "0.2em",
                          fontWeight: 500,
                        }}
                      >
                        & Guest
                      </p>
                    )}
                  </div>

                  {/* Triangular flap */}
                  <div 
                    className="absolute top-0 left-0 right-0 z-10"
                    style={{ 
                      height: `${FLAP_HEIGHT_PERCENT}%`,
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background: "linear-gradient(180deg, #E5E3DE 0%, #ECEAE5 100%)",
                    }}
                  />

                  {/* Wax seal */}
                  <div 
                    className="absolute left-1/2 z-30"
                    style={{ 
                      top: `${FLAP_HEIGHT_PERCENT}%`,
                      transform: "translateX(-50%) translateY(-50%)",
                    }}
                  >
                    {/* Outer gold ring with subtle glow */}
                    <div 
                      className="rounded-full flex items-center justify-center p-1.5"
                      style={{ 
                        background: "linear-gradient(135deg, #D4AF37 0%, #F4E4A6 25%, #D4AF37 50%, #C5A028 75%, #D4AF37 100%)",
                        width: "76px",
                        height: "76px",
                        boxShadow: "0 8px 25px rgba(212, 175, 55, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {/* Inner seal */}
                      <div 
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ 
                          backgroundColor: "#6B705C",
                          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <span 
                          className="text-white font-serif text-xl" 
                          style={{ fontWeight: 500, letterSpacing: "0.05em" }}
                        >
                          L&M
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tap to open button - refined */}
              <motion.button
                onClick={handleOpen}
                className="px-10 py-4 rounded-full font-sans text-xs uppercase tracking-widest"
                style={{ 
                  backgroundColor: "#6B705C", 
                  color: "#F8F9FA",
                  letterSpacing: "0.2em",
                  boxShadow: "0 4px 15px rgba(107, 112, 92, 0.3)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(107, 112, 92, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Tap to Open
              </motion.button>
            </motion.div>
          )}

          {animationPhase === "opening" && (
            /* ============================================
               OPENING ANIMATION STATE
               ============================================ */
            <motion.div
              key="envelope-opening"
              className="text-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-10" style={{ perspective: "1200px" }}>
                <motion.div 
                  className="relative rounded-sm overflow-visible"
                  style={{ 
                    backgroundColor: "#FDFCFA",
                    paddingTop: `${FLAP_HEIGHT_PERCENT}%`,
                    boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.15)",
                  }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  {/* Envelope liner reveal */}
                  <motion.div 
                    className="absolute inset-0 rounded-sm"
                    style={{ 
                      background: "linear-gradient(135deg, #6B705C 0%, #5A5F4E 100%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  />

                  <div 
                    className="relative aspect-[4/3] flex flex-col items-center justify-center p-10"
                    style={{ backgroundColor: "#FDFCFA" }}
                  >
                    <p className="font-serif text-2xl text-center" style={{ color: "#1A1A1A" }}>
                      {fullName}
                    </p>
                  </div>

                  {/* Flap opening */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 z-10"
                    style={{ 
                      height: `${FLAP_HEIGHT_PERCENT}%`,
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background: "linear-gradient(180deg, #E5E3DE 0%, #ECEAE5 100%)",
                      transformOrigin: "top center",
                      transformStyle: "preserve-3d",
                    }}
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: 180 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />

                  {/* Seal halves */}
                  <motion.div 
                    className="absolute left-1/2 z-30"
                    style={{ top: `${FLAP_HEIGHT_PERCENT}%`, transform: "translateX(-50%) translateY(-50%)" }}
                    initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 1 }}
                    animate={{ x: "-80%", y: "-50%", rotate: -25, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div 
                      className="rounded-full p-1.5 overflow-hidden"
                      style={{ 
                        background: "linear-gradient(135deg, #D4AF37 0%, #F4E4A6 25%, #D4AF37 50%, #C5A028 75%, #D4AF37 100%)",
                        width: "76px",
                        height: "76px",
                        clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                      }}
                    >
                      <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: "#6B705C" }}>
                        <span className="text-white font-serif text-xl">L&M</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="absolute left-1/2 z-30"
                    style={{ top: `${FLAP_HEIGHT_PERCENT}%`, transform: "translateX(-50%) translateY(-50%)" }}
                    initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 1 }}
                    animate={{ x: "-20%", y: "-50%", rotate: 25, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div 
                      className="rounded-full p-1.5 overflow-hidden"
                      style={{ 
                        background: "linear-gradient(135deg, #D4AF37 0%, #F4E4A6 25%, #D4AF37 50%, #C5A028 75%, #D4AF37 100%)",
                        width: "76px",
                        height: "76px",
                        clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                      }}
                    >
                      <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: "#6B705C" }}>
                        <span className="text-white font-serif text-xl">L&M</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {animationPhase === "open" && (
            /* ============================================
               FULLY OPEN / INVITATION STATE - LUXURIOUS
               ============================================ */
            <motion.div
              key="invitation-open"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              {/* Card with paper texture and luxurious shadow */}
              <div
                className="relative rounded-sm p-10 sm:p-14 md:p-16"
                style={{ 
                  backgroundColor: "#FDFCFA",
                  boxShadow: "0 30px 70px -20px rgba(0, 0, 0, 0.12), 0 15px 35px -15px rgba(0, 0, 0, 0.08)",
                  ...paperTextureStyle,
                }}
              >
                {/* Decorative gold border */}
                <div 
                  className="absolute inset-5 sm:inset-7 border pointer-events-none"
                  style={{ borderColor: "rgba(212, 175, 55, 0.2)" }}
                />

                {/* Corner flourishes */}
                <div className="absolute top-6 left-6 w-8 h-8 border-t border-l" style={{ borderColor: "rgba(212, 175, 55, 0.25)" }} />
                <div className="absolute top-6 right-6 w-8 h-8 border-t border-r" style={{ borderColor: "rgba(212, 175, 55, 0.25)" }} />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l" style={{ borderColor: "rgba(212, 175, 55, 0.25)" }} />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r" style={{ borderColor: "rgba(212, 175, 55, 0.25)" }} />

                {/* Header with gold accent */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-sans text-[10px] sm:text-xs uppercase mb-8"
                  style={{ 
                    color: "#D4AF37", 
                    letterSpacing: "0.3em",
                    fontWeight: 500,
                  }}
                >
                  Save the Date
                </motion.p>

                {/* Ornamental divider */}
                <OrnamentalDivider className="w-40 h-4 mx-auto mb-8 text-charcoal" />

                {/* Guest greeting */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-lg sm:text-xl mb-10"
                  style={{ color: "rgba(26, 26, 26, 0.7)", fontWeight: 400, fontStyle: "italic" }}
                >
                  Dear {firstName}{hasPlusOne ? " & Guest" : ""}
                </motion.p>

                {/* Couple names - larger, more prominent */}
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-serif text-5xl sm:text-6xl md:text-7xl mb-3"
                  style={{ 
                    color: "#1A1A1A", 
                    fontWeight: 400, 
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {couple.person1}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="font-serif text-2xl sm:text-3xl mb-3"
                  style={{ color: "#D4AF37", fontWeight: 400 }}
                >
                  &
                </motion.p>

                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-serif text-5xl sm:text-6xl md:text-7xl mb-8"
                  style={{ 
                    color: "#1A1A1A", 
                    fontWeight: 400, 
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {couple.person2}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="font-sans text-[10px] sm:text-xs uppercase mb-10"
                  style={{ color: "rgba(26, 26, 26, 0.5)", letterSpacing: "0.25em" }}
                >
                  Request the pleasure of your company
                </motion.p>

                {/* Date - refined */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <p 
                    className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2"
                    style={{ color: "#1A1A1A", fontWeight: 400 }}
                  >
                    {date.full}
                  </p>
                  <p 
                    className="font-sans text-xs sm:text-sm uppercase"
                    style={{ color: "rgba(26, 26, 26, 0.4)", letterSpacing: "0.15em" }}
                  >
                    {date.timeDisplay}
                  </p>
                </motion.div>

                {/* Venue */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="mb-10"
                >
                  <p 
                    className="font-serif text-xl sm:text-2xl mb-1"
                    style={{ color: "#1A1A1A", fontWeight: 400 }}
                  >
                    {venue.name}
                  </p>
                  <p 
                    className="font-sans text-xs sm:text-sm"
                    style={{ color: "rgba(26, 26, 26, 0.4)" }}
                  >
                    {venue.city}
                  </p>
                </motion.div>

                {/* Ornamental divider */}
                <OrnamentalDivider className="w-32 h-4 mx-auto mb-10 text-charcoal" />

                {/* Message */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="font-serif text-sm sm:text-base italic leading-relaxed mb-12 max-w-md mx-auto"
                  style={{ color: "rgba(26, 26, 26, 0.55)" }}
                >
                  We would be honored to have you celebrate this special day with us.
                  <br />
                  <span className="text-xs sm:text-sm not-italic" style={{ color: "rgba(26, 26, 26, 0.4)" }}>
                    Formal invitation to follow.
                  </span>
                </motion.p>

                {/* Action buttons - more understated */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleGoogleCalendar}
                      className="px-6 py-3 rounded-full font-sans text-[10px] sm:text-xs uppercase transition-all duration-300 hover:opacity-90"
                      style={{ 
                        backgroundColor: "#6B705C", 
                        color: "#F8F9FA",
                        letterSpacing: "0.15em",
                        boxShadow: "0 2px 10px rgba(107, 112, 92, 0.2)",
                      }}
                    >
                      Add to Google Calendar
                    </button>

                    <button
                      onClick={handleDownloadICS}
                      className="px-6 py-3 rounded-full font-sans text-[10px] sm:text-xs uppercase transition-all duration-300 hover:bg-charcoal/5"
                      style={{ 
                        border: "1px solid rgba(26, 26, 26, 0.2)",
                        color: "rgba(26, 26, 26, 0.7)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      Download .ics
                    </button>
                  </div>

                  <Link
                    href="/"
                    className="inline-block font-sans text-[10px] sm:text-xs uppercase transition-opacity hover:opacity-70 pt-4"
                    style={{ 
                      color: "#D4AF37", 
                      letterSpacing: "0.15em",
                    }}
                  >
                    View Wedding Website
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
