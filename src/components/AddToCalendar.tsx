"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { weddingConfig } from "@/config/content";
import { generateGoogleCalendarUrl, downloadICSFile } from "@/lib/calendar";

interface AddToCalendarProps {
  variant?: "primary" | "outline-white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AddToCalendar({ variant = "primary", size = "md", className = "" }: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { calendarEvent } = weddingConfig;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const googleCalendarUrl = generateGoogleCalendarUrl(calendarEvent);

  const handleDownloadICS = () => {
    downloadICSFile(calendarEvent, "laurens-monica-wedding.ics");
    setIsOpen(false);
  };

  const buttonStyles = {
    primary:
      "bg-sage-600 text-white hover:bg-sage-700 border-sage-600",
    "outline-white":
      "border-white text-white bg-transparent hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
  };

  const dropdownBg = {
    primary: "bg-white border-stone-200 shadow-lg",
    "outline-white": "bg-sage-700 border-white/20",
  };

  const dropdownItem = {
    primary: "text-stone-700 hover:bg-stone-100",
    "outline-white": "text-white hover:bg-white/10",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 rounded-full border font-medium transition-all duration-300 ${sizeStyles[size]} ${buttonStyles[variant]}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CalendarDaysIcon className="h-5 w-5" />
        <span>Add to Calendar</span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 mt-2 w-56 rounded-lg border overflow-hidden z-20 ${dropdownBg[variant]}`}
        >
          {/* Google Calendar */}
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 transition-colors ${dropdownItem[variant]}`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V8.25h15v11.25zM6.75 10.5H9v2.25H6.75V10.5zm0 3.75H9v2.25H6.75v-2.25zm3.75-3.75h2.5v2.25h-2.5V10.5zm0 3.75h2.5v2.25h-2.5v-2.25zm3.75-3.75h2.25v2.25H14.25V10.5zm0 3.75h2.25v2.25H14.25v-2.25z" />
            </svg>
            <span>Google Calendar</span>
          </a>

          {/* Apple Calendar / iCal */}
          <button
            onClick={handleDownloadICS}
            className={`flex items-center gap-3 px-4 py-3 w-full transition-colors ${dropdownItem[variant]}`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span>Apple Calendar</span>
          </button>

          {/* Outlook */}
          <button
            onClick={handleDownloadICS}
            className={`flex items-center gap-3 px-4 py-3 w-full transition-colors ${dropdownItem[variant]}`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V12zm-6-8.25v3h3v-3h-3zm0 4.5v3h3v-3h-3zm0 4.5v1.83l3.05-1.83H18zm-5.25-9v3h3.75v-3h-3.75zm0 4.5v3h3.75v-3h-3.75zm0 4.5v3h3.75v-2.67l.95-.33H12.75v-3zM7 12.5l.85.28q.1-.4.1-.79 0-.4-.1-.78L7 11.5V12q0 .25-.02.5h.02zM7.13 17H12v-1.75q0-.45.08-.85.08-.4.25-.75-.17-.35-.25-.75-.08-.4-.08-.85V9H7.13q-.1 0-.18.01-.09.02-.17.03l.17-.03q.08-.01.18-.01V7H1v10h6.13v-.38.38z" />
            </svg>
            <span>Outlook</span>
          </button>
        </div>
      )}
    </div>
  );
}
