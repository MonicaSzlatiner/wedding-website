import { HotelData } from "@/config/hotels";

interface HotelCardProps {
  hotel: HotelData;
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <article 
      className="pl-10 h-full flex flex-col border-l"
      style={{ 
        borderLeftColor: "rgba(195, 123, 96, 0.3)"
      }}
      aria-labelledby={`hotel-${hotel.id}-name`}
    >
      {/* Hotel Name - Large serif */}
      <h3 
        id={`hotel-${hotel.id}-name`}
        className="font-serif text-4xl italic mb-4"
        style={{ color: "#2D2926", fontWeight: 400 }}
      >
        {hotel.name}
      </h3>

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

      {/* Action Links */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
        <a
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] uppercase font-bold transition-opacity hover:opacity-70"
          style={{ 
            color: "#C37B60", 
            letterSpacing: "0.2em"
          }}
        >
          View Availability
          <span className="sr-only"> (opens in new tab)</span>
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
    </article>
  );
}
