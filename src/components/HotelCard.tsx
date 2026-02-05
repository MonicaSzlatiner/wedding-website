import { MapPinIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { HotelData } from "@/config/hotels";

interface HotelCardProps {
  hotel: HotelData;
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <article 
      className="py-6 px-6 h-full flex flex-col border-l-2 
                 hover:bg-white/50 transition-all duration-200 ease-out"
      style={{ 
        borderLeftColor: "#C37B60",
        backgroundColor: "transparent"
      }}
      aria-labelledby={`hotel-${hotel.id}-name`}
    >
      {/* Area */}
      <div className="flex items-center gap-1 text-[10px] uppercase font-bold mb-3" style={{ color: "rgba(45, 41, 38, 0.4)", letterSpacing: "0.2em" }}>
        <MapPinIcon className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
        <span>{hotel.area}</span>
      </div>

      {/* Hotel Name */}
      <h3 
        id={`hotel-${hotel.id}-name`}
        className="font-serif text-xl md:text-2xl italic mb-3"
        style={{ color: "#2D2926", fontWeight: 400 }}
      >
        {hotel.name}
      </h3>

      {/* Description */}
      <p className="text-sm mb-4 leading-relaxed flex-grow" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
        {hotel.description}
      </p>

      {/* Vibe (optional) */}
      {hotel.vibe && (
        <p className="text-xs italic mb-4" style={{ color: "rgba(45, 41, 38, 0.4)" }}>
          {hotel.vibe}
        </p>
      )}

      {/* Action Links */}
      <div className="flex flex-col gap-3 mt-auto pt-4 border-t" style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}>
        <a
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] uppercase font-bold hover:opacity-70 transition-opacity"
          style={{ color: "#C37B60", letterSpacing: "0.2em" }}
        >
          View Availability
          <ArrowTopRightOnSquareIcon className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
        <a
          href={hotel.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] uppercase font-bold hover:opacity-70 transition-opacity"
          style={{ color: "rgba(45, 41, 38, 0.5)", letterSpacing: "0.2em" }}
        >
          Get Directions
          <ArrowTopRightOnSquareIcon className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </article>
  );
}
