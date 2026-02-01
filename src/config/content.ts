/**
 * Wedding Website Content Configuration
 * 
 * All event data, copy, and configuration lives here.
 * This makes it easy to update content without touching components.
 * Structure is i18n-ready for future French translation.
 */

export const weddingConfig = {
  // Couple information
  couple: {
    person1: "Laurens",
    person2: "Monica",
    // For display variations
    get names() {
      return `${this.person1} & ${this.person2}`;
    },
    get namesReversed() {
      return `${this.person2} & ${this.person1}`;
    },
  },

  // Wedding date and time
  date: {
    full: "Saturday, August 1, 2026",
    short: "August 1, 2026",
  
    iso: "2026-08-01",
    time: "17:00",
    timeDisplay: "5:00 PM",
    timezone: "Europe/Amsterdam",
    timezoneAbbr: "CEST",
  },

  // Venue information
  venue: {
    name: "Parkheuvel",
    address: "Heuvellaan 21",
    city: "Rotterdam",
    postalCode: "3016 GL",
    country: "Netherlands",
    get fullAddress() {
      return `${this.address}, ${this.postalCode} ${this.city}`;
    },
    website: "https://www.parkheuvel.nl",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2460.8!2d4.4449!3d51.9066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c4335e5e8e5c8b%3A0x8e5b5c8e5c8e5c8e!2sParkheuvel!5e0!3m2!1sen!2snl!4v1234567890",
    googleMapsLink: "https://maps.google.com/?q=Parkheuvel,+Heuvellaan+21,+3016+GL+Rotterdam",
    description: "A Michelin-starred restaurant with stunning views of the Maas river, located in Het Park near the Euromast.",
  },

  // Event schedule
  schedule: {
    title: "Schedule",
    subtitle: "Join us for an evening of celebration",
    events: [
      {
        time: "16:30",
        title: "Arrival",
        description: "Join us for a drink and some snacks",
      },
      
      {
        time: "17:00",
        title: "Ceremony",
        description: "The ceremony will begin promptly at 5 PM",
      },
      {
        time: "17:30",
        title: "Toast & Dinner",
        description: "A curated dining experience at Parkheuvel with views of the river",
      },

      {
        time: "19:30",
        title: "Dancing",
        description: "Celebrate with us into the night",
      },
    ],
  },

  // Dress code
  dressCode: {
    title: "Dress Code",
    code: "Cocktail Attire",
    description: "We invite you to dress elegantly for our celebration. Think refined and festive.",
    inspiration: {
      men: {
        label: "Inspiration for men",
        url: "https://suitsupply.com/en-nl/journal/cocktail-attire-for-men.html",
      },
      women: {
        label: "Inspiration for women",
        url: "https://www.pinterest.com/chloeadeline8/cocktail-attire-wedding-guest-ideas/",
      },
    },
  },

  // Travel information
  travel: {
    title: "Travel",
    subtitle: "Getting to Rotterdam",
    heroImage: "/images/hero-travel.jpg",
    sections: {
      flights: {
        title: "By Air",
        icon: "plane",
        items: [
          {
            name: "Amsterdam Schiphol Airport (AMS)",
            description: "The main international airport, about 50 minutes from Rotterdam by train.",
            recommended: true,
          },
          {
            name: "Rotterdam The Hague Airport (RTM)",
            description: "Regional airport with European connections, 15 minutes from the city center.",
            recommended: false,
          },
        ],
      },
      train: {
        title: "By Train",
        icon: "train",
        description: "From Rotterdam Centraal station, take Tram 8 towards Spangen. Exit at the Kievitslaan station which brings you to the Park. The venue is a short walk from there.",
      },
      car: {
        title: "By Car",
        icon: "car",
        description: "Paid parking is available nearby. The venue is located in Het Park, near the Euromast.",
      },
    },
  },

  // Hotels (placeholder for later)
  hotels: {
    title: "Where to Stay",
    subtitle: "Recommended accommodations",
    comingSoon: true,
    items: [
      // Will be filled in later
      // {
      //   name: "Hotel Name",
      //   description: "Description",
      //   address: "Address",
      //   website: "https://...",
      //   bookingCode: "WEDDING2026",
      //   priceRange: "$$",
      // },
    ],
  },

  // RSVP
  rsvp: {
    title: "RSVP",
    subtitle: "We would be honored to have you celebrate with us",
    deadline: "May 1, 2026",
    deadlineDisplay: "Please respond by May 1, 2026",
    formUrl: "https://forms.google.com/your-form-url", // Placeholder
    buttonText: "Respond Now",
    note: "If you have any questions about the RSVP, please reach out to us directly.",
  },

  // Gifts / Honeymoon Fund
  gifts: {
    title: "Gifts",
    subtitle: "Your presence is the greatest gift",
    heroImage: "/images/hero-gifts.jpg",
    message: "Your presence is enough of a present to us! But for those of you who are stubborn, we've put together a honeymoon fund. See below for more details.",
    fund: {
      name: "Honeymoon Fund",
      description: "Help us explore the world together",
      // Stripe integration placeholder
      enabled: false, // Set to true when Stripe is configured
      stripeLink: "", // Add Stripe payment link when ready
    },
  },

  // FAQ
  faq: {
    title: "Questions",
    subtitle: "Frequently asked questions",
    items: [
      {
        question: "What is the dress code?",
        answer: "The dress code is cocktail attire. We invite you to dress elegantly for our celebration. For inspiration, see <a href=\"https://suitsupply.com/en-nl/journal/cocktail-attire-for-men.html\" target=\"_blank\" rel=\"noopener noreferrer\">men's style guide</a> or <a href=\"https://www.pinterest.com/chloeadeline8/cocktail-attire-wedding-guest-ideas/\" target=\"_blank\" rel=\"noopener noreferrer\">women's style inspiration</a>.",
      },
      {
        question: "Can I bring a plus one?",
        answer: "We have carefully considered our guest list. Please refer to your invitation for details about plus ones.",
      },
      {
        question: "Are children welcome?",
        answer: "While we love your little ones, our wedding will be an adults-only celebration.",
      },
      {
        question: "Is there parking available?",
        answer: "Yes, paid parking is available near the venue in Het Park area.",
      },
      {
        question: "What time should I arrive?",
        answer: "Please arrive by 4:45 PM so we can begin the ceremony promptly at 5:00 PM.",
      },
      // Add more FAQ items as needed
    ],
  },

  // Gallery
  gallery: {
    title: "Gallery",
    subtitle: "Moments together",
    images: [
      // Placeholder images - replace with actual photos
      { src: "/images/gallery/placeholder-1.jpg", alt: "Couple photo 1" },
      { src: "/images/gallery/placeholder-2.jpg", alt: "Couple photo 2" },
      { src: "/images/gallery/placeholder-3.jpg", alt: "Couple photo 3" },
      { src: "/images/gallery/placeholder-4.jpg", alt: "Couple photo 4" },
      { src: "/images/gallery/placeholder-5.jpg", alt: "Couple photo 5" },
      { src: "/images/gallery/placeholder-6.jpg", alt: "Couple photo 6" },
    ],
  },

  // Navigation (Single Page Experience - anchor links)
  navigation: {
    items: [
      { label: "Home", href: "#home" },
      { label: "Schedule", href: "#schedule" },
      { label: "Travel", href: "#travel" },
      { label: "Stay", href: "#stay" },
      { label: "Gifts", href: "#gifts" },
      { label: "RSVP", href: "#rsvp" },
      { label: "FAQ", href: "#faq" },
    ],
  },

  // SEO Metadata
  meta: {
    title: "Laurens & Monica | August 1, 2026",
    description: "Join us in celebrating our wedding on August 1, 2026 at Parkheuvel in Rotterdam.",
    ogImage: "/images/og-image.jpg",
    siteUrl: "https://laurens-and-monica.vercel.app", // Update with actual URL
  },

  // Calendar event for Add to Calendar
  calendarEvent: {
    title: "Laurens & Monica's Wedding",
    description: "Wedding ceremony and celebration at Parkheuvel, Rotterdam",
    location: "Parkheuvel, Heuvellaan 21, 3016 GL Rotterdam, Netherlands",
    startDate: "2026-08-01",
    startTime: "17:00",
    endDate: "2026-08-02",
    endTime: "00:00",
    timezone: "Europe/Amsterdam",
  },
} as const;

// Type export for TypeScript
export type WeddingConfig = typeof weddingConfig;
