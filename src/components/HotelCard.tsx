import { StarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { HotelData } from "@/config/hotels";

interface HotelCardProps {
  hotel: HotelData;
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <article 
      className="rounded-xl p-4 sm:p-5 md:p-6 h-full flex flex-col
                 hover:shadow-lg hover:scale-[1.02]
                 transition-all duration-200 ease-out will-change-transform"
      style={{ backgroundColor: "#F8F9FA" }}
      aria-labelledby={`hotel-${hotel.id}-name`}
    >
      {/* Header: Area and Badges */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div className="flex items-center gap-1 text-xs sm:text-sm" style={{ color: "rgba(26, 26, 26, 0.5)" }}>
          <MapPinIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" aria-hidden="true" />
          <span>{hotel.area}</span>
        </div>
        
        {/* Badges */}
        {hotel.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {hotel.badges.map((badge, index) => (
              <span 
                key={index}
                className="text-white text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full"
                style={{ backgroundColor: "#6B705C" }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hotel Name */}
      <h3 
        id={`hotel-${hotel.id}-name`}
        className="font-serif text-lg sm:text-xl mb-2"
        style={{ color: "#1A1A1A", fontWeight: 400 }}
      >
        {hotel.name}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
        {hotel.description}
      </p>

      {/* Vibe (optional) */}
      {hotel.vibe && (
        <p className="text-xs italic mb-3 sm:mb-4" style={{ color: "rgba(26, 26, 26, 0.4)" }}>
          Vibe: {hotel.vibe}
        </p>
      )}

      {/* Rating - Clickable, links to Google reviews */}
      <div className="mb-4 sm:mb-5 mt-auto pt-2">
        {hotel.rating ? (
          <a 
            href={hotel.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div 
              className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded"
              style={{ backgroundColor: "rgba(107, 112, 92, 0.1)" }}
            >
              <StarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500" aria-hidden="true" />
              <span className="font-medium text-sm" style={{ color: "#1A1A1A" }}>{hotel.rating.score.toFixed(1)}</span>
            </div>
            <span className="text-xs sm:text-sm underline underline-offset-2" style={{ color: "rgba(26, 26, 26, 0.5)" }}>
              Google Reviews
            </span>
          </a>
        ) : (
          <a 
            href={hotel.googleReviewsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs sm:text-sm underline underline-offset-2 hover:opacity-80 transition-opacity" 
            style={{ color: "#6B705C" }}
          >
            View Google Reviews
          </a>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <a
          href={hotel.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px] uppercase"
          style={{ 
            borderColor: "#1A1A1A", 
            color: "#1A1A1A",
            letterSpacing: "0.1em"
          }}
        >
          Get Directions
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
        <a
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px] uppercase"
          style={{ 
            backgroundColor: "#6B705C",
            letterSpacing: "0.1em"
          }}
        >
          Book Hotel
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </article>
  );
}
