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
    id: "mainport",
    name: "Mainport Hotel Rotterdam",
    description: "Design hotel on the waterfront with spa, rooftop bar, and stunning river views.",
    area: "Leuvehaven",
    vibe: "Modern waterfront",
    travelTime: "~15 min by taxi to Parkheuvel",
    googleReviewsUrl: "https://www.google.com/search?sca_esv=2d7c89a134cd9f4b&q=mainport+hotel+rotterdam&si=AL3DRZFIhG6pAqfNLal55wUTwygCG0fClF3UxiOmgw9Hq7nbWQt7zWCuvbs6EnmDf6eX-EJQJDCR0xu6DNh8_ZMz_xStWh2QCR_tC37ZUGHhCeW2Y4A6-6o%3D&uds=ALYpb_kG5vW-vCilX_Rbjx0DZ5HJ4u5mgxc1geHR9HiF6babMT-M_BRUJaS5MQmoWLlHiFebMaFBR4wf-fSKrsht3kMjCPWcEXLOqgEs5om6yDTu3M-4-EmtRc2Q8XH_yr0Eyk9SbjCJ&sa=X&ved=2ahUKEwjhlPDH8LeSAxURxQIHHVKbMbIQ3PALegQIHhAE",
    directionsUrl: `https://www.google.com/maps/dir/Mainport+Hotel+Rotterdam,+Leuvehaven,+Rotterdam/${VENUE_ADDRESS}`,
    bookingUrl: "https://www.hotelmainport.com/en/",
    badges: ["5-Star Hotel"],
    rating: {
      score: 4.5,
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
    id: "thon-hotel",
    name: "Thon Hotel Rotterdam",
    description: "Budget-friendly option near the city center with comfortable rooms and great value.",
    area: "City Centre",
    vibe: "Simple and practical",
    travelTime: "~10 min by taxi to Parkheuvel",
    googleReviewsUrl: "https://www.google.com/search?q=thon+hotel+rotterdam",
    directionsUrl: `https://www.google.com/maps/dir/Thon+Hotel+Rotterdam,+Willemsplein,+Rotterdam/${VENUE_ADDRESS}`,
    bookingUrl: "https://www.thonhotels.com/hotels/netherlands/rotterdam/",
    badges: ["Budget-Friendly"],
    rating: {
      score: 4.1,
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
