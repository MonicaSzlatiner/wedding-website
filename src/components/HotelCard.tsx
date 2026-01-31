import { StarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { HotelData } from "@/config/hotels";

interface HotelCardProps {
  hotel: HotelData;
}

/**
 * Format review count with K suffix for large numbers
 */
function formatReviewCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toLocaleString();
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <article 
      className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 hover:shadow-md transition-shadow duration-300"
      aria-labelledby={`hotel-${hotel.id}-name`}
    >
      {/* Header: Badges and Area */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-1 text-stone-500 text-sm">
          <MapPinIcon className="h-4 w-4" aria-hidden="true" />
          <span>{hotel.area}</span>
        </div>
        
        {/* Badges */}
        {hotel.badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {hotel.badges.map((badge, index) => (
              <span 
                key={index}
                className="bg-sage-600 text-white text-xs font-medium px-2.5 py-1 rounded-full"
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
        className="font-serif text-xl text-stone-800 mb-2"
      >
        {hotel.name}
      </h3>

      {/* Description */}
      <p className="text-stone-500 text-sm mb-3 leading-relaxed">
        {hotel.description}
      </p>

      {/* Vibe (optional) */}
      {hotel.vibe && (
        <p className="text-stone-400 text-xs italic mb-4">
          Vibe: {hotel.vibe}
        </p>
      )}

      {/* Rating */}
      <div className="mb-5">
        {hotel.rating ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-stone-100 px-2.5 py-1.5 rounded">
              <StarIcon className="h-4 w-4 text-yellow-500" aria-hidden="true" />
              <span className="font-medium text-stone-800">{hotel.rating.score.toFixed(1)}</span>
            </div>
            <span className="text-stone-500 text-sm">
              ({formatReviewCount(hotel.rating.reviewCount)} reviews)
            </span>
          </div>
        ) : (
          <p className="text-stone-400 text-sm">
            Google rating: <a href={hotel.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-sage-600 underline underline-offset-2">see link</a>
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={hotel.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-stone-300 text-stone-700 text-sm font-medium rounded-full hover:bg-stone-50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-600"
        >
          View on Google
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
        <a
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sage-600 text-white text-sm font-medium rounded-full hover:bg-sage-700 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-600"
        >
          Book Hotel
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </article>
  );
}
