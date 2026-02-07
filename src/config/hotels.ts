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
    bookingUrl: "https://www.mainporthotel.com",
    badges: ["5-Star Hotel"],
    rating: {
      score: 4.5,
    },
  },
  {
    id: "marriott",
    name: "Marriott Hotel Rotterdam",
    description: "5-star hotel directly connected to Rotterdam Centraal station, ideal for international guests.",
    area: "City Centre",
    vibe: "Business luxury",
    travelTime: "~20 min by taxi to Parkheuvel",
    googleReviewsUrl: "https://www.google.com/search?sca_esv=2d7c89a134cd9f4b&q=Marriott+hotel+rotterdam&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x1Kt3Jr5ajKCC3MAuBNy6oorQLLC_0A78HhtFf_JsiZLBTHa6Gt_MxgYyMSf8E6dTE0kycU%3D&uds=ALYpb_kG5vW-vCilX_Rbjx0DZ5HJgf9i5f0F5QIIOkVPo3_SKt646exN6pBRmXgkp28wyqixyJ5tyAX0LZSdKcHscM6483aCd9yBOSLNkbuIaK6dEX64AdZfNUsct6Msh8JWv-QFV5Qd&sa=X&ved=2ahUKEwjw-M-x8beSAxXdyAIHHZEoLX0Q3PALegQIHRAE",
    directionsUrl: `https://www.google.com/maps/dir/Rotterdam+Marriott+Hotel,+Weena,+Rotterdam/${VENUE_ADDRESS}`,
    bookingUrl: "https://www.marriott.com/en-us/hotels/rtmmn-rotterdam-marriott-hotel/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
    badges: ["5-Star Hotel"],
    rating: {
      score: 4.4,
    },
  },
  {
    id: "bilderberg-parkhotel",
    name: "Bilderberg Parkhotel Rotterdam",
    description: "Classic elegance near Het Park and the Euromast, very close to the wedding venue.",
    area: "Het Park",
    vibe: "Classic charm",
    travelTime: "~10 min walk to Parkheuvel",
    googleReviewsUrl: "https://www.google.com/search?sca_esv=2d7c89a134cd9f4b&q=bilderberg+hotel+rotterdam&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_xwKWP7hjNqkb3Vi64GX1osy9hXqDHjec-zt102WIJY-kwMFuY0ncvmfcMQ2SnYgTxDA9FGM%3D&uds=ALYpb_n4BwUhK1uaN1SPx2VrIkEtGJjqH9EClbVFyDD3cDvhGNtL4kAYdroe9NqsBzKf6wyQez6IbOxv9C9HkfG56cxYirM3O4oZIJmejbXrcM3gvjbXEAwVEKyUQkpu4jr4z7xjhNmJ&sa=X&sqi=2&ved=2ahUKEwin6c_T8beSAxWd1gIHHRFqOKYQ3PALegQIFRAE",
    directionsUrl: `https://www.google.com/maps/dir/Bilderberg+Parkhotel+Rotterdam,+Westersingel,+Rotterdam/${VENUE_ADDRESS}`,
    bookingUrl: "https://www.bilderberg.nl/hotels/parkhotel-rotterdam/",
    badges: ["Closest to Venue"],
    rating: {
      score: 4.3,
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
    bookingUrl: "https://www.nh-hotels.com/en/hotel/nhow-rotterdam?utm_campaign=local-gmb&utm_medium=organic_search&utm_source=google_gmb",
    badges: ["4-Star Hotel"],
    rating: {
      score: 4.4,
    },
  },
  {
    id: "hotel-new-york",
    name: "Hotel New York",
    description: "Historic landmark in the former Holland America Line headquarters with waterfront dining.",
    area: "Kop van Zuid",
    vibe: "Heritage charm",
    travelTime: "~15 min by taxi to Parkheuvel",
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
    bookingUrl: "https://www.thonhotels.com/hotels/nederland/rotterdam/thon-hotel-rotterdam/",
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
    description: "Rotterdam also has wonderful Airbnb options and boutique stays. Book early as August is a popular time to visit the city.",
  },
};
