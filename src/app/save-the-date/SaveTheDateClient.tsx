"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { weddingConfig } from "@/config/content";
import { generateGoogleCalendarUrl, downloadICSFile } from "@/lib/calendar";
import { recordSaveTheDateView } from "@/lib/supabase";
import { CalendarDaysIcon, ClipboardDocumentIcon, CheckIcon, EnvelopeIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { AddressCollectionForm } from "@/components/AddressCollectionForm";

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
  const [showAddressPanel, setShowAddressPanel] = useState(false);

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

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "#F5F5F0" }}
    >
      {/* Admin Panel */}
      {isAdmin && (
        <div 
          className="fixed bottom-4 left-4 z-50 p-4 rounded-lg text-xs font-sans max-w-xs"
          style={{ backgroundColor: "#2D2926", color: "#F5F5F0" }}
        >
          <p className="font-bold mb-2 uppercase" style={{ letterSpacing: "0.2em" }}>
            Admin Panel
          </p>
          <div className="space-y-1 mb-3 opacity-70">
            <p>Code: <span className="font-mono">{code || "(none)"}</span></p>
            <p>Guest: {isValidCode ? guestName : "Not found"}</p>
            <p>Plus One: {isValidCode ? (hasPlusOne ? "Yes" : "No") : "N/A"}</p>
          </div>
          {code && (
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-[10px] uppercase font-bold transition-all w-full justify-center"
              style={{ 
                backgroundColor: copied ? "#C37B60" : "rgba(255, 255, 255, 0.1)",
                letterSpacing: "0.2em"
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
                    backgroundColor: "#FAFAF7",
                    paddingTop: `${FLAP_HEIGHT_PERCENT}%`,
                  }}
                >
                  {/* Actual envelope body content area */}
                  <div 
                    className="aspect-[4/3] flex flex-col items-center justify-center p-8"
                    style={{ backgroundColor: "#FAFAF7" }}
                  >
                    {/* Guest name */}
                    <p 
                      className="font-serif text-xl sm:text-2xl md:text-3xl italic text-center mb-1"
                      style={{ color: "#2D2926", fontWeight: 400 }}
                    >
                      {fullName}
                    </p>

                    {/* Plus one indicator */}
                    {hasPlusOne && (
                      <p 
                        className="font-sans text-[10px] uppercase font-bold"
                        style={{ color: "rgba(45, 41, 38, 0.5)", letterSpacing: "0.3em" }}
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
                      background: "linear-gradient(180deg, #E8E5E0 0%, #F0EDE8 100%)",
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
                      {/* Inner seal - Terracotta */}
                      <div 
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#C37B60" }}
                      >
                        <span className="text-white font-serif text-lg italic" style={{ fontWeight: 400 }}>
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
                className="w-full py-4 rounded-full font-sans text-[10px] uppercase font-bold"
                style={{ 
                  backgroundColor: "#2D2926", 
                  color: "#F5F5F0",
                  letterSpacing: "0.3em"
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
                    backgroundColor: "#FAFAF7",
                    paddingTop: `${FLAP_HEIGHT_PERCENT}%`,
                  }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  {/* Envelope body content */}
                  <div 
                    className="aspect-[4/3] flex flex-col items-center justify-center p-8"
                    style={{ backgroundColor: "#FAFAF7" }}
                  >
                    <p className="font-serif text-xl italic text-center" style={{ color: "#2D2926" }}>
                      {fullName}
                    </p>
                  </div>

                  {/* Triangular flap - opening animation */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 z-10"
                    style={{ 
                      height: `${FLAP_HEIGHT_PERCENT}%`,
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background: "linear-gradient(180deg, #E8E5E0 0%, #F0EDE8 100%)",
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
                        style={{ backgroundColor: "#C37B60" }}
                      >
                        <span className="text-white font-serif text-lg italic" style={{ fontWeight: 400 }}>
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
                        style={{ backgroundColor: "#C37B60" }}
                      >
                        <span className="text-white font-serif text-lg italic" style={{ fontWeight: 400 }}>
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
              {/* Card content */}
              <div
                className="rounded-lg sm:rounded-2xl p-6 sm:p-10 shadow-lg sm:shadow-2xl"
                style={{ 
                  backgroundColor: "#FAFAF7",
                  border: "1px solid rgba(45, 41, 38, 0.1)",
                }}
              >
                {/* Header */}
                <p 
                  className="font-sans text-[10px] uppercase font-bold mb-4"
                  style={{ color: "#C37B60", letterSpacing: "0.3em" }}
                >
                  Save the Date
                </p>

                {/* Guest greeting */}
                <p 
                  className="font-serif text-xl sm:text-2xl italic mb-6"
                  style={{ color: "#2D2926", fontWeight: 400 }}
                >
                  Dear {firstName}{hasPlusOne ? " & Guest" : ""}
                </p>

                {/* Couple names - LARGER */}
                <h1 
                  className="font-serif text-5xl sm:text-6xl italic mb-2"
                  style={{ color: "#2D2926", fontWeight: 400, lineHeight: 1.1 }}
                >
                  {couple.person1}
                  <span style={{ color: "#C37B60" }}> & </span>
                  {couple.person2}
                </h1>

                <p 
                  className="font-sans text-[10px] uppercase font-bold mb-8"
                  style={{ 
                    color: "rgba(45, 41, 38, 0.5)", 
                    letterSpacing: "0.3em",
                  }}
                >
                  Are getting married
                </p>

                {/* Date */}
                <div className="mb-6">
                  <p 
                    className="font-serif text-2xl sm:text-3xl italic mb-1"
                    style={{ color: "#2D2926", fontWeight: 400 }}
                  >
                    {date.full}
                  </p>
                  <p 
                    className="font-sans text-sm"
                    style={{ color: "rgba(45, 41, 38, 0.6)" }}
                  >
                    {date.timeDisplay}
                  </p>
                </div>

                {/* Venue */}
                <div className="mb-8">
                  <p 
                    className="font-serif text-lg italic mb-1"
                    style={{ color: "#2D2926", fontWeight: 400 }}
                  >
                    {venue.name}
                  </p>
                  <p 
                    className="font-sans text-sm"
                    style={{ color: "rgba(45, 41, 38, 0.6)" }}
                  >
                    {venue.city}, The Netherlands
                  </p>
                </div>

                {/* Message */}
                <p 
                  className="font-serif text-base sm:text-lg italic leading-relaxed mb-8 max-w-sm mx-auto"
                  style={{ color: "rgba(45, 41, 38, 0.7)" }}
                >
                  We would be honored to have you celebrate this special day with us. Formal invitation to follow.
                </p>

                {/* Action buttons */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleGoogleCalendar}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-sans text-[10px] uppercase font-bold transition-all duration-200 hover:opacity-90"
                      style={{ 
                        backgroundColor: "#2D2926", 
                        color: "#F5F5F0",
                        letterSpacing: "0.3em"
                      }}
                    >
                      <CalendarDaysIcon className="h-4 w-4" />
                      Add to Calendar
                    </button>

                    <button
                      onClick={handleDownloadICS}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-sans text-[10px] uppercase font-bold transition-all duration-200 border hover:bg-espresso/5"
                      style={{ 
                        borderColor: "rgba(45, 41, 38, 0.2)",
                        color: "#2D2926",
                        letterSpacing: "0.3em"
                      }}
                    >
                      Download .ics
                    </button>
                  </div>

                  <Link
                    href="/"
                    className="inline-block font-sans text-[10px] uppercase font-bold transition-opacity hover:opacity-70 pt-4"
                    style={{ color: "#C37B60", letterSpacing: "0.3em" }}
                  >
                    View Wedding Website →
                  </Link>
                </div>

                {/* Address Collection CTA */}
                {isValidCode && (
                  <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(45, 41, 38, 0.1)" }}>
                    <button
                      onClick={() => setShowAddressPanel(!showAddressPanel)}
                      className="w-full flex items-center justify-center gap-2 font-sans text-[10px] uppercase font-bold transition-opacity hover:opacity-70"
                      style={{ color: "rgba(45, 41, 38, 0.6)", letterSpacing: "0.2em" }}
                    >
                      <EnvelopeIcon className="h-4 w-4" />
                      Help us send the formal invitation →
                      <motion.span
                        animate={{ rotate: showAddressPanel ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDownIcon className="h-3 w-3" />
                      </motion.span>
                    </button>

                    {/* Expandable Address Panel */}
                    <AnimatePresence>
                      {showAddressPanel && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-8">
                            {/* Panel Header */}
                            <div className="text-center mb-6">
                              <h3 
                                className="font-serif text-lg italic mb-3"
                                style={{ color: "#2D2926" }}
                              >
                                One small detail before we send the paper invite ✉️
                              </h3>
                              <p 
                                className="text-sm leading-relaxed max-w-sm mx-auto"
                                style={{ color: "rgba(45, 41, 38, 0.6)" }}
                              >
                                We&apos;ll be mailing a formal invitation later this year. If you&apos;re happy to share your mailing address, we&apos;ll make sure it reaches you and is addressed correctly. Optional and you can update it later.
                              </p>
                            </div>

                            {/* Address Form */}
                            <AddressCollectionForm
                              code={code}
                              initialName={guestName || ""}
                              onClose={() => setShowAddressPanel(false)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
