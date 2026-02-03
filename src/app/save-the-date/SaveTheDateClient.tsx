"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { weddingConfig } from "@/config/content";
import { generateGoogleCalendarUrl, downloadICSFile } from "@/lib/calendar";
import { recordSaveTheDateView } from "@/lib/supabase";
import { CalendarDaysIcon, ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

interface SaveTheDateClientProps {
  guestName: string | null;
  hasPlusOne: boolean;
  code: string;
  isAdmin: boolean;
  isValidCode: boolean;
  guestId: string | null;
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
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Admin Panel */}
      {isAdmin && (
        <div 
          className="fixed bottom-4 left-4 z-50 p-4 rounded-xl text-xs font-sans max-w-xs"
          style={{ backgroundColor: "rgba(26, 26, 26, 0.9)", color: "#F8F9FA" }}
        >
          <p className="font-medium mb-2 uppercase" style={{ letterSpacing: "0.1em" }}>
            Admin Panel
          </p>
          <div className="space-y-1 mb-3">
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
      <div className="w-full max-w-md mx-auto pt-12 sm:pt-0">
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
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Envelope Container */}
              <div className="relative mb-8" style={{ perspective: "1000px" }}>
                {/* Envelope body (rectangular bottom part) */}
                <div 
                  className="relative rounded-lg shadow-2xl overflow-visible"
                  style={{ 
                    backgroundColor: "#F8F9FA",
                    paddingTop: `${FLAP_HEIGHT_PERCENT}%`,
                  }}
                >
                  {/* Actual envelope body content area */}
                  <div 
                    className="aspect-[4/3] flex flex-col items-center justify-center p-8"
                    style={{ backgroundColor: "#F8F9FA" }}
                  >
                    {/* Guest name */}
                    <p 
                      className="font-serif text-xl sm:text-2xl md:text-3xl text-center mb-1"
                      style={{ color: "#1A1A1A", fontWeight: 400 }}
                    >
                      {fullName}
                    </p>

                    {/* Plus one indicator */}
                    {hasPlusOne && (
                      <p 
                        className="font-sans text-xs sm:text-sm uppercase"
                        style={{ color: "rgba(26, 26, 26, 0.5)", letterSpacing: "0.15em" }}
                      >
                        + Guest
                      </p>
                    )}
                  </div>

                  {/* Triangular flap - positioned at top */}
                  <div 
                    className="absolute top-0 left-0 right-0 z-10"
                    style={{ 
                      height: `${FLAP_HEIGHT_PERCENT}%`,
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background: "linear-gradient(180deg, #D8D6D1 0%, #E5E3DE 100%)",
                    }}
                  />

                  {/* Wax seal - positioned exactly at flap tip */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 z-30"
                    style={{ 
                      top: `${FLAP_HEIGHT_PERCENT}%`,
                      transform: "translateX(-50%) translateY(-50%)",
                    }}
                  >
                    {/* Gold trim ring */}
                    <div 
                      className="rounded-full flex items-center justify-center p-1 shadow-xl"
                      style={{ 
                        background: "linear-gradient(135deg, #D4AF37 0%, #F4E4A6 25%, #D4AF37 50%, #C5A028 75%, #D4AF37 100%)",
                        width: "68px",
                        height: "68px",
                      }}
                    >
                      {/* Inner seal */}
                      <div 
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#6B705C" }}
                      >
                        <span className="text-white font-serif text-lg" style={{ fontWeight: 500 }}>
                          L&M
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tap to open button */}
              <motion.button
                onClick={handleOpen}
                className="w-full py-4 rounded-full font-sans text-sm uppercase"
                style={{ 
                  backgroundColor: "#6B705C", 
                  color: "#F8F9FA",
                  letterSpacing: "0.15em"
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Tap to Open
              </motion.button>
            </motion.div>
          )}

          {animationPhase === "opening" && (
            /* ============================================
               OPENING ANIMATION STATE
               Seal splits, flap opens, then fades out
               ============================================ */
            <motion.div
              key="envelope-opening"
              className="text-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Envelope Container */}
              <div className="relative mb-8" style={{ perspective: "1000px" }}>
                {/* Envelope body */}
                <motion.div 
                  className="relative rounded-lg shadow-2xl overflow-visible"
                  style={{ 
                    backgroundColor: "#F8F9FA",
                    paddingTop: `${FLAP_HEIGHT_PERCENT}%`,
                  }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  {/* Envelope body content */}
                  <div 
                    className="aspect-[4/3] flex flex-col items-center justify-center p-8"
                    style={{ backgroundColor: "#F8F9FA" }}
                  >
                    <p className="font-serif text-xl text-center" style={{ color: "#1A1A1A" }}>
                      {fullName}
                    </p>
                  </div>

                  {/* Triangular flap - opening animation */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 z-10"
                    style={{ 
                      height: `${FLAP_HEIGHT_PERCENT}%`,
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background: "linear-gradient(180deg, #D8D6D1 0%, #E5E3DE 100%)",
                      transformOrigin: "top center",
                      transformStyle: "preserve-3d",
                    }}
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: 180 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />

                  {/* Seal - Left half */}
                  <motion.div 
                    className="absolute left-1/2 z-30"
                    style={{ 
                      top: `${FLAP_HEIGHT_PERCENT}%`,
                      transform: "translateX(-50%) translateY(-50%)",
                    }}
                    initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 1 }}
                    animate={{ x: "-75%", y: "-50%", rotate: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div 
                      className="rounded-full flex items-center justify-center p-1 shadow-xl overflow-hidden"
                      style={{ 
                        background: "linear-gradient(135deg, #D4AF37 0%, #F4E4A6 25%, #D4AF37 50%, #C5A028 75%, #D4AF37 100%)",
                        width: "68px",
                        height: "68px",
                        clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                      }}
                    >
                      <div 
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#6B705C" }}
                      >
                        <span className="text-white font-serif text-lg" style={{ fontWeight: 500 }}>
                          L&M
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Seal - Right half */}
                  <motion.div 
                    className="absolute left-1/2 z-30"
                    style={{ 
                      top: `${FLAP_HEIGHT_PERCENT}%`,
                      transform: "translateX(-50%) translateY(-50%)",
                    }}
                    initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 1 }}
                    animate={{ x: "-25%", y: "-50%", rotate: 20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div 
                      className="rounded-full flex items-center justify-center p-1 shadow-xl overflow-hidden"
                      style={{ 
                        background: "linear-gradient(135deg, #D4AF37 0%, #F4E4A6 25%, #D4AF37 50%, #C5A028 75%, #D4AF37 100%)",
                        width: "68px",
                        height: "68px",
                        clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                      }}
                    >
                      <div 
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#6B705C" }}
                      >
                        <span className="text-white font-serif text-lg" style={{ fontWeight: 500 }}>
                          L&M
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {animationPhase === "open" && (
            /* ============================================
               FULLY OPEN / INVITATION STATE
               ============================================ */
            <motion.div
              key="invitation-open"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              {/* Card content with paper texture */}
              <div
                className="rounded-2xl p-8 sm:p-10 shadow-2xl"
                style={{ 
                  backgroundColor: "#F8F9FA",
                  ...paperTextureStyle,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
              >
                {/* Header */}
                <p 
                  className="font-sans text-xs uppercase mb-4"
                  style={{ color: "#6B705C", letterSpacing: "0.2em" }}
                >
                  Save the Date
                </p>

                {/* Guest greeting */}
                <p 
                  className="font-serif text-xl sm:text-2xl mb-6"
                  style={{ color: "#2C2C2C", fontWeight: 400 }}
                >
                  Dear {firstName}{hasPlusOne ? " & Guest" : ""}
                </p>

                {/* Couple names - LARGER */}
                <h1 
                  className="font-serif text-5xl sm:text-6xl mb-2"
                  style={{ color: "#2C2C2C", fontWeight: 400, lineHeight: 1.1 }}
                >
                  {couple.person1}
                  <span style={{ color: "rgba(44, 44, 44, 0.35)" }}> & </span>
                  {couple.person2}
                </h1>

                <p 
                  className="font-sans text-xs uppercase mb-8"
                  style={{ 
                    color: "rgba(44, 44, 44, 0.6)", 
                    letterSpacing: "0.15em",
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  Are getting married
                </p>

                {/* Date */}
                <div className="mb-6">
                  <p 
                    className="font-serif text-2xl sm:text-3xl mb-1"
                    style={{ color: "#2C2C2C", fontWeight: 400 }}
                  >
                    {date.full}
                  </p>
                  <p 
                    className="font-sans text-sm"
                    style={{ color: "rgba(44, 44, 44, 0.6)" }}
                  >
                    {date.timeDisplay}
                  </p>
                </div>

                {/* Venue */}
                <div className="mb-8">
                  <p 
                    className="font-serif text-lg mb-1"
                    style={{ color: "#2C2C2C", fontWeight: 400 }}
                  >
                    {venue.name}
                  </p>
                  <p 
                    className="font-sans text-sm"
                    style={{ 
                      color: "rgba(44, 44, 44, 0.65)",
                      textShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    {venue.city}, The Netherlands
                  </p>
                </div>

                {/* Message */}
                <p 
                  className="font-serif text-base sm:text-lg italic leading-relaxed mb-8 max-w-sm mx-auto"
                  style={{ 
                    color: "rgba(26, 26, 26, 0.55)",
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  We would be honored to have you celebrate this special day with us. Formal invitation to follow.
                </p>

                {/* Action buttons */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleGoogleCalendar}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-sans text-xs uppercase transition-all duration-300 hover:opacity-90"
                      style={{ 
                        backgroundColor: "#6B705C", 
                        color: "#F8F9FA",
                        letterSpacing: "0.1em"
                      }}
                    >
                      <CalendarDaysIcon className="h-4 w-4" />
                      Add to Calendar
                    </button>

                    <button
                      onClick={handleDownloadICS}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-sans text-xs uppercase transition-all duration-300 border hover:bg-black/5"
                      style={{ 
                        borderColor: "#1A1A1A",
                        color: "#1A1A1A",
                        letterSpacing: "0.1em"
                      }}
                    >
                      Download .ics
                    </button>
                  </div>

                  <Link
                    href="/"
                    className="inline-block font-sans text-xs uppercase underline underline-offset-4 transition-opacity hover:opacity-70 pt-2"
                    style={{ color: "#6B705C", letterSpacing: "0.1em" }}
                  >
                    View Wedding Website
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
