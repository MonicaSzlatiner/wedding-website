import { weddingConfig } from "@/config/content";

interface VenueMapProps {
  className?: string;
}

export function VenueMap({ className = "" }: VenueMapProps) {
  const { venue } = weddingConfig;

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      {/* Google Maps Embed */}
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2461.1!2d4.4483!3d51.9058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c4335c2b4a6c61%3A0x7a3c7c6c6c6c6c6c!2sParkheuvel!5e0!3m2!1sen!2snl!4v1`}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${venue.name} location`}
        className="w-full"
      />
      
      {/* Fallback link */}
      <div className="bg-stone-100 p-4 text-center">
        <a
          href={venue.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:text-emerald-700 font-medium link-underline"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
