"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { weddingConfig } from "@/config/content";
import { generateGoogleCalendarUrl, downloadICSFile } from "@/lib/calendar";
import { CalendarDaysIcon, MusicalNoteIcon, ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

interface SaveTheDateClientProps {
  guestName: string | null;
  hasPlusOne: boolean;
  code: string;
  isAdmin: boolean;
  isValidCode: boolean;
}

export function SaveTheDateClient({
  guestName,
  hasPlusOne,
  code,
  isAdmin,
  isValidCode,
}: SaveTheDateClientProps) {
  const [animationPhase, setAnimationPhase] = useState<"closed" | "opening" | "open">("closed");
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Extract first name only
  const fullName = guestName || "Friend";
  const firstName = fullName.split(" ")[0];
  
  const { calendarEvent, couple, date, venue } = weddingConfig;

  // Handle opening the envelope
  const handleOpen = useCallback(() => {
    setAnimationPhase("opening");
    
    // Start music if enabled
    if (musicEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }

    // Transition to fully open after envelope animation
    setTimeout(() => {
      setAnimationPhase("open");
    }, 1200);
  }, [musicEnabled]);

  // Toggle music
  const toggleMusic = useCallback(() => {
    if (musicEnabled) {
      setMusicEnabled(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setMusicPlaying(false);
    } else {
      setMusicEnabled(true);
      if (animationPhase === "open" && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setMusicPlaying(true);
      }
    }
  }, [musicEnabled, animationPhase]);

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

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
      style={{ backgroundColor: "#E8E6E1" }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/save-the-date.m4a" loop />

      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-sans uppercase transition-all duration-300 ${
          musicEnabled 
            ? "bg-sage text-white" 
            : "bg-white/80 text-charcoal border border-charcoal/20"
        }`}
        style={{ letterSpacing: "0.1em" }}
        aria-label={musicEnabled ? "Turn off music" : "Turn on music"}
      >
        <MusicalNoteIcon className={`h-4 w-4 ${musicPlaying ? "animate-pulse" : ""}`} />
        <span className="hidden sm:inline">{musicEnabled ? "Music On" : "Music Off"}</span>
      </button>

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
      <div className="w-full max-w-md mx-auto perspective-1000">
        <AnimatePresence mode="wait">
          {animationPhase === "closed" && (
            /* ============================================
               CLOSED ENVELOPE STATE
               ============================================ */
            <motion.div
              key="envelope-closed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Envelope Container */}
              <div className="relative" style={{ perspective: "1000px" }}>
                {/* Envelope Back */}
                <div 
                  className="relative aspect-[4/3] rounded-lg shadow-2xl overflow-hidden"
                  style={{ backgroundColor: "#F8F9FA" }}
                >
                  {/* Envelope body content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pt-16">
                    {/* Wax seal */}
                    <motion.div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xl z-10"
                      style={{ backgroundColor: "#6B705C" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-white font-serif text-2xl" style={{ fontWeight: 500 }}>
                        L&M
                      </span>
                    </motion.div>

                    {/* Guest name */}
                    <p 
                      className="font-serif text-2xl sm:text-3xl text-center mb-1"
                      style={{ color: "#1A1A1A", fontWeight: 400 }}
                    >
                      {fullName}
                    </p>

                    {/* Plus one indicator */}
                    {hasPlusOne && (
                      <p 
                        className="font-sans text-sm uppercase"
                        style={{ color: "rgba(26, 26, 26, 0.5)", letterSpacing: "0.15em" }}
                      >
                        + Guest
                      </p>
                    )}
                  </div>

                  {/* Envelope Flap */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[45%] origin-top"
                    style={{
                      background: "linear-gradient(to bottom, #D4D2CD 0%, #E8E6E1 100%)",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Tap to open button */}
              <motion.button
                onClick={handleOpen}
                className="mt-8 w-full py-4 rounded-full font-sans text-sm uppercase transition-all duration-300"
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
               ============================================ */
            <motion.div
              key="envelope-opening"
              className="relative"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {/* Envelope Container */}
              <div className="relative" style={{ perspective: "1000px" }}>
                {/* Envelope Back */}
                <div 
                  className="relative aspect-[4/3] rounded-lg shadow-2xl overflow-visible"
                  style={{ backgroundColor: "#F8F9FA" }}
                >
                  {/* Card sliding out */}
                  <motion.div
                    className="absolute inset-x-4 top-4 bottom-4 rounded-lg shadow-lg z-20"
                    style={{ backgroundColor: "#FFFFFF" }}
                    initial={{ y: 0 }}
                    animate={{ y: -180 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <p 
                        className="font-serif text-xl text-center px-4"
                        style={{ color: "#6B705C", fontWeight: 400 }}
                      >
                        You&apos;re Invited
                      </p>
                    </div>
                  </motion.div>

                  {/* Envelope body (behind card) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pt-16 opacity-30">
                    <div 
                      className="w-20 h-20 rounded-full"
                      style={{ backgroundColor: "#6B705C" }}
                    />
                  </div>

                  {/* Envelope Flap - Opening */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-[45%] origin-top z-30"
                    style={{
                      background: "linear-gradient(to bottom, #D4D2CD 0%, #E8E6E1 100%)",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      transformStyle: "preserve-3d",
                    }}
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: 180 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />

                  {/* Wax seal - breaking apart */}
                  <motion.div 
                    className="absolute top-[20%] left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-40"
                    style={{ backgroundColor: "#6B705C" }}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: [1, 1.2, 0], opacity: [1, 1, 0] }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <span className="text-white font-serif text-2xl" style={{ fontWeight: 500 }}>
                      L&M
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {animationPhase === "open" && (
            /* ============================================
               FULLY OPEN / INVITATION STATE
               ============================================ */
            <motion.div
              key="envelope-open"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Card content */}
              <motion.div
                className="rounded-xl p-8 sm:p-10 shadow-xl text-center"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                {/* Header */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-sans text-xs uppercase mb-4"
                  style={{ color: "#6B705C", letterSpacing: "0.2em" }}
                >
                  Save the Date
                </motion.p>

                {/* Guest greeting - First name only */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-serif text-xl sm:text-2xl mb-6"
                  style={{ color: "#1A1A1A", fontWeight: 400 }}
                >
                  Dear {firstName}{hasPlusOne ? " & Guest" : ""}
                </motion.p>

                {/* Couple names */}
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-4xl sm:text-5xl mb-2"
                  style={{ color: "#1A1A1A", fontWeight: 400, lineHeight: 1.1 }}
                >
                  {couple.person1}
                  <span style={{ color: "rgba(26, 26, 26, 0.4)" }}> & </span>
                  {couple.person2}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-sans text-xs uppercase mb-8"
                  style={{ color: "rgba(26, 26, 26, 0.5)", letterSpacing: "0.15em" }}
                >
                  Are getting married
                </motion.p>

                {/* Date */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <p 
                    className="font-serif text-2xl sm:text-3xl mb-1"
                    style={{ color: "#1A1A1A", fontWeight: 400 }}
                  >
                    {date.full}
                  </p>
                  <p 
                    className="font-sans text-sm"
                    style={{ color: "rgba(26, 26, 26, 0.5)" }}
                  >
                    {date.timeDisplay}
                  </p>
                </motion.div>

                {/* Venue */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <p 
                    className="font-serif text-lg mb-1"
                    style={{ color: "#1A1A1A", fontWeight: 400 }}
                  >
                    {venue.name}
                  </p>
                  <p 
                    className="font-sans text-sm"
                    style={{ color: "rgba(26, 26, 26, 0.5)" }}
                  >
                    {venue.city}
                  </p>
                </motion.div>

                {/* Divider */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="w-16 h-px mx-auto mb-8"
                  style={{ backgroundColor: "rgba(26, 26, 26, 0.2)" }}
                />

                {/* Message */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="font-serif text-base sm:text-lg italic leading-relaxed mb-8 max-w-sm mx-auto"
                  style={{ color: "rgba(26, 26, 26, 0.6)" }}
                >
                  We would be honored to have you celebrate this special day with us. Formal invitation to follow.
                </motion.p>

                {/* Action buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-3"
                >
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
                </motion.div>
              </motion.div>

              {/* Floating hearts */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{ color: "rgba(107, 112, 92, 0.3)" }}
                    initial={{ 
                      x: `${20 + i * 15}%`,
                      y: "100%",
                      opacity: 0 
                    }}
                    animate={{ 
                      y: "-20%",
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 4,
                      delay: 1 + i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeOut"
                    }}
                  >
                    ♥
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
