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
  const [isOpen, setIsOpen] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const displayName = guestName || "Dear friend";
  const { calendarEvent, couple, date, venue } = weddingConfig;

  // Handle opening the envelope
  const handleOpen = useCallback(() => {
    setIsOpen(true);

    // Start music if enabled
    if (musicEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Audio play failed (browser policy)
      });
      setMusicPlaying(true);
    }
  }, [musicEnabled]);

  // Toggle music
  const toggleMusic = useCallback(() => {
    if (musicEnabled) {
      // Turn off music
      setMusicEnabled(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setMusicPlaying(false);
    } else {
      // Turn on music
      setMusicEnabled(true);
      // If envelope already open, start playing immediately
      if (isOpen && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setMusicPlaying(true);
      }
    }
  }, [musicEnabled, isOpen]);

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
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "#E8E6E1" }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/save-the-date.mp3" loop />

      {/* Music Toggle - Top right corner */}
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
      <div className="w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ============================================
               CLOSED ENVELOPE STATE
               ============================================ */
            <motion.div
              key="envelope-closed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Envelope */}
              <div 
                className="relative aspect-[4/3] rounded-lg shadow-2xl overflow-hidden"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                {/* Envelope flap (triangular top) */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2"
                  style={{
                    background: "linear-gradient(to bottom right, #E8E6E1 50%, transparent 50%)",
                  }}
                />
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2"
                  style={{
                    background: "linear-gradient(to bottom left, #E8E6E1 50%, transparent 50%)",
                  }}
                />

                {/* Envelope body with seal */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {/* Wax seal */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg"
                    style={{ backgroundColor: "#6B705C" }}
                  >
                    <span className="text-white font-serif text-xl" style={{ fontWeight: 500 }}>
                      L&M
                    </span>
                  </div>

                  {/* Guest name */}
                  <p 
                    className="font-serif text-2xl sm:text-3xl text-center mb-1"
                    style={{ color: "#1A1A1A", fontWeight: 400 }}
                  >
                    {displayName}
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
          ) : (
            /* ============================================
               OPENED ENVELOPE / INVITATION STATE
               ============================================ */
            <motion.div
              key="envelope-open"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              {/* Card content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="rounded-xl p-8 sm:p-10 shadow-xl"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                {/* Header */}
                <p 
                  className="font-sans text-xs uppercase mb-2"
                  style={{ color: "#6B705C", letterSpacing: "0.2em" }}
                >
                  Save the Date
                </p>

                {/* Guest greeting */}
                <p 
                  className="font-serif text-lg mb-6"
                  style={{ color: "rgba(26, 26, 26, 0.6)", fontWeight: 400 }}
                >
                  {displayName}{hasPlusOne ? " + Guest" : ""}
                </p>

                {/* Couple names */}
                <h1 
                  className="font-serif text-4xl sm:text-5xl mb-2"
                  style={{ color: "#1A1A1A", fontWeight: 400, lineHeight: 1.1 }}
                >
                  {couple.person1}
                  <span style={{ color: "rgba(26, 26, 26, 0.4)" }}> & </span>
                  {couple.person2}
                </h1>

                <p 
                  className="font-sans text-xs uppercase mb-8"
                  style={{ color: "rgba(26, 26, 26, 0.5)", letterSpacing: "0.15em" }}
                >
                  Are getting married
                </p>

                {/* Date */}
                <div className="mb-8">
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
                </div>

                {/* Venue */}
                <div className="mb-10">
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
                </div>

                {/* Divider */}
                <div 
                  className="w-16 h-px mx-auto mb-8"
                  style={{ backgroundColor: "rgba(26, 26, 26, 0.2)" }}
                />

                {/* Message */}
                <p 
                  className="font-sans text-sm leading-relaxed mb-8 max-w-sm mx-auto"
                  style={{ color: "rgba(26, 26, 26, 0.6)" }}
                >
                  Formal invitation to follow. We hope you can join us for this special celebration.
                </p>

                {/* Action buttons */}
                <div className="space-y-3">
                  {/* Add to Calendar dropdown */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleGoogleCalendar}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-sans text-xs uppercase transition-all duration-300"
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
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-sans text-xs uppercase transition-all duration-300 border"
                      style={{ 
                        borderColor: "#1A1A1A",
                        color: "#1A1A1A",
                        letterSpacing: "0.1em"
                      }}
                    >
                      Download .ics
                    </button>
                  </div>

                  {/* View website */}
                  <Link
                    href="/"
                    className="inline-block font-sans text-xs uppercase underline underline-offset-4 transition-opacity hover:opacity-70 pt-2"
                    style={{ color: "#6B705C", letterSpacing: "0.1em" }}
                  >
                    View Wedding Website
                  </Link>
                </div>
              </motion.div>

              {/* Floating hearts animation */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-sage/30 text-2xl"
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
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeOut"
                    }}
                  >
                    ♥
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
