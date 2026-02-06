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
        className="text-base font-light leading-relaxed mb-8 max-w-sm"
        style={{ color: "rgba(45, 41, 38, 0.7)" }}
      >
        {hotel.description}
      </p>

      {/* View Availability Link - with underline styling */}
      <a
        href={hotel.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-[11px] uppercase font-bold pb-2 border-b-2 transition-all hover:border-terracotta"
        style={{ 
          color: "#C37B60", 
          letterSpacing: "0.3em",
          borderBottomColor: "rgba(195, 123, 96, 0.2)"
        }}
      >
        View Availability
        <span className="sr-only">(opens in new tab)</span>
      </a>
    </article>
  );
}
