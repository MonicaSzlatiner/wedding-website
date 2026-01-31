/**
 * Hotel Configuration
 * 
 * Static hotel data with ratings displayed only when available.
 * Order is intentional and should be preserved.
 */

export interface HotelData {
  id: string;
  name: string;
  description: string;
  area: string;
  vibe?: string; // Optional vibe descriptor
  googleMapsUrl: string;
  bookingUrl: string;
  badges: string[]; // e.g., "Closest to Rotterdam Centraal", "Cheapest option"
  rating?: {
    score: number; // e.g., 4.5
    reviewCount: number; // e.g., 2100
  } | null;
}

// Hotels in strict display order
export const hotels: HotelData[] = [
  {
    id: "mainport",
    name: "Mainport Hotel Rotterdam",
    description: "Design hotel on the waterfront with spa, rooftop bar, and stunning river views.",
    area: "Leuvehaven",
    vibe: "Modern waterfront",
    googleMapsUrl: "https://www.google.com/maps/place/Mainport+Hotel+Rotterdam/",
    bookingUrl: "https://www.mainporthotel.com",
    badges: [],
    rating: {
      score: 4.5,
      reviewCount: 2134,
    },
  },
  {
    id: "marriott",
    name: "Marriott Hotel Rotterdam",
    description: "5-star hotel directly connected to Rotterdam Centraal station, ideal for international guests.",
    area: "City Centre",
    vibe: "Business luxury",
    googleMapsUrl: "https://www.google.com/maps/place/Rotterdam+Marriott+Hotel/",
    bookingUrl: "https://www.marriott.com/hotels/travel/rtmmc-rotterdam-marriott-hotel/",
    badges: ["Closest to Rotterdam Centraal"],
    rating: {
      score: 4.4,
      reviewCount: 3200,
    },
  },
  {
    id: "bilderberg-parkhotel",
    name: "Bilderberg Parkhotel Rotterdam",
    description: "Classic elegance near Het Park and the Euromast, very close to the wedding venue.",
    area: "Het Park",
    vibe: "Classic charm",
    googleMapsUrl: "https://www.google.com/maps/place/Bilderberg+Parkhotel+Rotterdam/",
    bookingUrl: "https://www.bilderberg.nl/rotterdam/parkhotel-rotterdam",
    badges: [],
    rating: {
      score: 4.2,
      reviewCount: 1856,
    },
  },
  {
    id: "nhow",
    name: "nhow Rotterdam",
    description: "Iconic design hotel in the De Rotterdam building on Wilhelminapier with dramatic city views.",
    area: "Kop van Zuid",
    vibe: "Bold design",
    googleMapsUrl: "https://www.google.com/maps/place/nhow+Rotterdam/",
    bookingUrl: "https://www.nh-hotels.com/hotel/nhow-rotterdam",
    badges: [],
    rating: {
      score: 4.3,
      reviewCount: 3542,
    },
  },
  {
    id: "hotel-new-york",
    name: "Hotel New York",
    description: "Historic landmark in the former Holland America Line headquarters with waterfront dining.",
    area: "Kop van Zuid",
    vibe: "Heritage charm",
    googleMapsUrl: "https://www.google.com/maps/place/Hotel+New+York/",
    bookingUrl: "https://www.hotelnewyork.com",
    badges: [],
    rating: {
      score: 4.4,
      reviewCount: 2876,
    },
  },
  {
    id: "thon-hotel",
    name: "Thon Hotel Rotterdam",
    description: "Budget-friendly option near the city center with comfortable rooms and great value.",
    area: "City Centre",
    vibe: "Simple and practical",
    googleMapsUrl: "https://www.google.com/maps/place/Thon+Hotel+Rotterdam/",
    bookingUrl: "https://www.thonhotels.com/hotels/nederland/rotterdam/thon-hotel-rotterdam/",
    badges: ["Cheapest option"],
    rating: {
      score: 4.1,
      reviewCount: 1423,
    },
  },
];

export const accommodationsContent = {
  title: "Accommodations",
  subtitle: "Rest well before the celebration",
  intro: "We have selected a range of hotels to suit different preferences and budgets. All options are well-connected to Parkheuvel and offer a comfortable stay in Rotterdam. Feel free to choose what works best for you.",
  
  otherOptions: {
    title: "Other Options",
    description: "Rotterdam also has wonderful Airbnb options and boutique stays. Book early as August is a popular time to visit the city.",
  },
};
