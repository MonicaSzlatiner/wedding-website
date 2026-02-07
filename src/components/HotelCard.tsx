"use client";

import { HotelData } from "@/config/hotels";
import { motion, useReducedMotion } from "framer-motion";

interface HotelCardProps {
  hotel: HotelData;
}

// Luxury editorial easing
const EASING = [0.25, 0.1, 0.25, 1.0] as const;

export function HotelCard({ hotel }: HotelCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article 
      className="pl-10 h-full flex flex-col border-l"
      style={{ 
        borderLeftColor: "rgba(195, 123, 96, 0.3)"
      }}
      aria-labelledby={`hotel-${hotel.id}-name`}
      initial={false}
      whileHover={shouldReduceMotion ? {} : { 
        y: -4,
        transition: { duration: 0.3, ease: EASING }
      }}
    >
      {/* Hotel Name - Large serif */}
      <h3 
        id={`hotel-${hotel.id}-name`}
        className="font-serif text-4xl italic mb-2"
        style={{ color: "#2D2926", fontWeight: 400 }}
      >
        {hotel.name}
      </h3>

      {/* Badges */}
      {hotel.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.badges.map((badge, index) => (
            <span
              key={index}
              className="text-[10px] uppercase font-medium px-2 py-1 rounded"
              style={{ 
                color: "#C37B60",
                backgroundColor: "rgba(195, 123, 96, 0.1)",
                letterSpacing: "0.1em"
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p 
        className="text-base font-light leading-relaxed mb-4 break-words"
        style={{ color: "rgba(45, 41, 38, 0.7)" }}
      >
        {hotel.description}
      </p>

      {/* Travel Time */}
      <p 
        className="text-[11px] mb-5"
        style={{ 
          color: "rgba(45, 41, 38, 0.5)",
          letterSpacing: "0.02em"
        }}
      >
        {hotel.travelTime}
      </p>

      {/* Action Links - pushed to bottom with mt-auto for alignment */}
      <div className="mt-auto pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-[11px] uppercase font-bold"
            style={{ 
              color: "#C37B60", 
              letterSpacing: "0.2em"
            }}
          >
            View Availability
            <span className="sr-only"> (opens in new tab)</span>
            {/* Hover underline animation */}
            <span 
              className="absolute -bottom-0.5 left-0 right-0 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ backgroundColor: "#C37B60" }}
            />
          </a>
          
          <span 
            className="hidden sm:inline px-3"
            style={{ color: "rgba(45, 41, 38, 0.3)" }}
          >
            ·
          </span>
          
          <a
            href={hotel.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase font-bold transition-opacity hover:opacity-70 hover:underline"
            style={{ 
              color: "rgba(45, 41, 38, 0.6)", 
              letterSpacing: "0.2em"
            }}
          >
            Route to Venue
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>

        {/* Full-width accent underline */}
        <div 
          className="mt-4 border-b-2"
          style={{ borderBottomColor: "rgba(195, 123, 96, 0.2)" }}
        />
      </div>
    </motion.article>
  );
}
