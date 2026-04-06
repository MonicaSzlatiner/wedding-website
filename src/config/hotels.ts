/**
 * Hotel Configuration
 * 
 * Static hotel data with ratings displayed only when available.
 * Order is intentional and should be preserved.
 */

export interface HotelData {
  id: string;
  name: string;
  /** Optional card hero image (16:10-style crop) */
  cardImage?: string;
  cardImageAlt?: string;
  description: string;
  promoNote?: { prefix: string; code: string; suffix: string }; // Optional promo code line
  area: string;
  vibe?: string; // Optional vibe descriptor
  travelTime: string; // e.g., "~15 min by taxi to Parkheuvel"
  googleReviewsUrl: string; // Links to Google reviews (for rating click)
  directionsUrl: string; // Google Maps directions from hotel to Parkheuvel
  bookingUrl: string;
  badges: string[]; // e.g., "5-Star Hotel", "Closest to Venue"
  rating?: {
    score: number; // e.g., 4.5
  } | null;
}

// Parkheuvel address for directions
const VENUE_ADDRESS = "Parkheuvel,+Heuvellaan+21,+3016+GL+Rotterdam";

// Hotels in strict display order
export const hotels: HotelData[] = [
  {
    id: "haven",
    name: "Haven Hotel Rotterdam",
    description: "Design hotel on the waterfront with spa, rooftop bar, and stunning river views.",
    area: "Leuvehaven",
    vibe: "Modern waterfront",
    travelTime: "~15 min by taxi to Parkheuvel",
    googleReviewsUrl: "https://www.google.com/search?q=haven+hotel+rotterdam+reviews",
    directionsUrl: `https://www.google.com/maps/dir/Haven+Hotel+Rotterdam,+Leuvehaven,+Rotterdam/${VENUE_ADDRESS}`,
    bookingUrl: "https://www.hilton.com/en/hotels/rtmccqq-haven-hotel-rotterdam/?SEO_id=GMB-EMEA-QQ-RTMCCQQ",
    badges: ["5-Star Hotel"],
    rating: {
      score: 4.5,
    },
  },
  {
    id: "the-james",
    name: "The James",
    description: "A design hotel that earns its stripes. Right in the center of Rotterdam — steps from the Lijnbaan, a short walk from Central Station, and an easy taxi ride from Parkheuvel. Stylish rooms, king beds, rain showers, and a 24/7 food market for when jet lag hits at 2am.",
    promoNote: { prefix: "Use code ", code: "TheJames-M.Szlatiner2026", suffix: " for your exclusive rate." },
    area: "City Centre",
    vibe: "Design hotel",
    travelTime: "~20 min by taxi to Parkheuvel",
    googleReviewsUrl: "https://www.google.com/search?q=the+james+hotel+rotterdam",
    directionsUrl: "https://www.google.com/maps/dir/The+James+Hotel+Rotterdam,+Aert+van+Nesstraat+25,+3012+CA+Rotterdam/Parkheuvel,+Heuvellaan+21,+3016+GL+Rotterdam",
    bookingUrl: "https://app.mews.com/distributor/4fe90ad0-30d4-4513-8531-1320f26c933d?mewsVoucherCode=TheJames-M.Szlatiner2026",
    badges: ["4-Star Hotel"],
    rating: null,
  },
  {
    id: "hotel-new-york",
    name: "Hotel New York",
    description: "Historic landmark in the former Holland America Line headquarters with waterfront dining. You can also arrive by water taxi!",
    area: "Kop van Zuid",
    vibe: "Heritage charm",
    travelTime: "~15 min by taxi or water taxi to Parkheuvel",
    googleReviewsUrl: "https://www.google.com/search?q=hotel+new+york+rotterdam",
    directionsUrl: `https://www.google.com/maps/dir/Hotel+New+York,+Koninginnenhoofd,+Rotterdam/${VENUE_ADDRESS}`,
    bookingUrl: "https://www.hotelnewyork.com",
    badges: [],
    rating: {
      score: 4.4,
    },
  },
  {
    id: "nhow",
    name: "nhow Rotterdam",
    description: "Iconic design hotel in the De Rotterdam building on Wilhelminapier with dramatic city views.",
    area: "Kop van Zuid",
    vibe: "Bold design",
    travelTime: "~15 min by taxi to Parkheuvel",
    googleReviewsUrl: "https://www.google.com/search?sca_esv=2d7c89a134cd9f4b&q=nhow+rotterdam+hotel&si=AL3DRZFIhG6pAqfNLal55wUTwygCG0fClF3UxiOmgw9Hq7nbWUwbVNt2_zbxnAqG5ZFXq1baz2mJyGA8evgM0YwhZxj5l0eKw_cowFmL6j3s6gtU3oKDRSA%3D&uds=ALYpb_lLt3rF4OntvAcKw6YR8l5Vnji3ze_Mekw--Pbh5lsq3w9foUNYM7HXjrvF9PA_v6QXtQAjd4pMwjUlX-i1zSKNLaoOy4sTRgEyutgVsvO0I2yhxVn8alBB9bqsuypARudjLmfA&sa=X&sqi=2&ved=2ahUKEwjCh5WL8reSAxVZ5QIHHRhGAY4Q3PALegQIIBAE",
    directionsUrl: `https://www.google.com/maps/dir/nhow+Rotterdam,+Wilhelminakade,+Rotterdam/${VENUE_ADDRESS}`,
    bookingUrl: "https://www.nhow-hotels.com/en/nhow-rotterdam",
    badges: ["4-Star Hotel"],
    rating: {
      score: 4.4,
    },
  },
];

export const accommodationsContent = {
  title: "Accommodations",
  subtitle: "We've picked a few of our favorite spots around the city. Whether you want waterfront views or something close to the venue, there's something here for you.",
  intro: "We have selected a range of hotels to suit different preferences and budgets. All options are well-connected to Parkheuvel and offer a comfortable stay in Rotterdam. Feel free to choose what works best for you.",
  hotelsHeading: "Our Picks",
  
  otherOptions: {
    title: "Other Options",
    description: "Book early, because August is a very popular month in Rotterdam.",
  },
};
