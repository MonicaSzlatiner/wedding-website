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
    label: "The Venue",
    heading: "The Location",
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
    label: "The Evening",
    heading: "Schedule",
    subtitle: "Dinner, drinks, dancing, and probably a few tears. Here's how the evening unfolds.",
    events: [
      {
        time: "16:30",
        title: "Arrival",
        description: "Drinks and bites on the terrace while we try to keep it together backstage.",
      },
      
      {
        time: "17:00",
        title: "Ceremony",
        description: "We're starting at five. Sharp. Please be seated by 4:45.",
      },
      {
        time: "17:30",
        title: "Toast & Dinner",
        description: "A multi-course dinner at Parkheuvel with views of the river. Bring your appetite.",
      },

      {
        time: "20:00",
        title: "Dancing",
        description: "The shoes come off and the music goes up. Stay as late as you can.",
      },
    ],
  },

  // Dress code
  dressCode: {
    label: "The Dress Code",
    heading: "Our Aesthetic",
    code: "Cocktail Attire",
    description: "Think: summer evening by the water. Elegant, not stiff. You'll want to dance later.",
    inspiration: {
      men: {
        label: "Inspiration for men",
        url: "https://suitsupply.com/en-nl/journal/cocktail-attire-for-men.html",
      },
      women: {
        label: "Inspiration for women",
        url: "https://www.theknot.com/content/cocktail-wedding-attire",
      },
    },
  },

  // Travel information
  travel: {
    label: "Getting There",
    heading: "Travel",
    subtitle: "Some of you are crossing borders to be there. Here's how to get to us.",
    heroImage: "/images/hero-travel.jpg",
    sections: {
      flights: {
        title: "By Air",
        icon: "plane",
        items: [
          {
            name: "Amsterdam Schiphol Airport (AMS)",
            description: "The main international airport, about 50 minutes from Rotterdam by train.",
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
    label: "Where to Stay",
    heading: "Accommodations",
    subtitle: "We've picked a few of our favorite spots around the city.",
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

  // Explore Rotterdam
  explore: {
    label: "While You're Here",
    heading: "Explore Rotterdam",
    subtitle: "We're not going to pretend this is a travel guide. But Rotterdam is our city, and if you've got a day or two to spare, here's where we'd actually take you.",
    closingLine: "Rotterdam rebuilt itself from scratch after WWII, and it shows. The whole city feels like it's still deciding what it wants to be — which is kind of what makes it great.",
    categories: [
      {
        name: "On the Water",
        items: [
          {
            name: "Spido Harbour Tour",
            description: "A 75-minute boat ride through Europe's largest port. You'll pass under the Erasmus Bridge, through working shipyards, and get a feel for why this city exists. It's the one thing we'd say is non-negotiable.",
            url: "https://www.spido.nl/en/cruises/rotterdam-harbour-tour",
            linkText: "Book Tickets",
          },
        ],
      },
      {
        name: "Art & Museums",
        items: [
          {
            name: "Depot Boijmans Van Beuningen",
            description: "The world's first publicly accessible art storage — 155,000 works behind glass, a mirrored building that's a piece of art itself, and a rooftop restaurant with a panoramic view of the city. Go to the sixth floor even if you skip everything else.",
            url: "https://www.boijmans.nl/en/depot",
            linkText: "Plan Your Visit",
          },
          {
            name: "Kunsthal Rotterdam",
            description: "No permanent collection, just rotating exhibitions that swing from photography to fashion to contemporary art. Check what's on before you go — it changes often, and it's almost always worth the detour.",
            url: "https://www.kunsthal.nl/en/",
            linkText: "See What's On",
          },
          {
            name: "Nederlands Fotomuseum",
            description: "The national photography museum just moved into a beautifully renovated 1903 warehouse on Katendrecht. If you're into photography or just like a gorgeous building, put this on the list.",
            url: "https://www.nederlandsfotomuseum.nl/en/",
            linkText: "Visit the Museum",
          },
        ],
      },
      {
        name: "Eat & Drink",
        items: [
          {
            name: "Fenix Food Factory",
            description: "A waterfront food hall in a former warehouse on the south bank. Craft beer, local cheese, good burgers, and a view of the river. It's where we'd go on a Saturday afternoon, honestly.",
            url: "https://www.fenixfoodfactory.nl",
            linkText: "See More",
          },
          {
            name: "Markthal",
            description: "You've probably seen photos of it — the giant arch with the painted ceiling. Inside it's a proper food market with Dutch cheese, fresh stroopwafels, and about thirty things you didn't know you wanted to eat. Walk through even if you're not hungry.",
            url: "https://www.markthal.nl/en",
            linkText: "Explore the Markthal",
          },
        ],
      },
      {
        name: "Just Walk Around",
        items: [
          {
            name: "Witte de Withstraat & Museumpark",
            description: "The cultural spine of the city. Witte de With has the best bars and restaurants on one street, and Museumpark connects most of the museums within a 10-minute walk. No plan needed — just wander.",
            url: null,
            linkText: null,
          },
        ],
      },
    ],
  },

  // RSVP
  rsvp: {
    heading: "Ready to Celebrate?",
    subtitle: "We would be honored to have you celebrate with us",
    deadline: "May 1, 2026",
    deadlineDisplay: "Please respond by May 1, 2026",
    formUrl: "https://forms.google.com/your-form-url", // Placeholder
    buttonText: "Respond Now",
    note: "If you have any questions about the RSVP, please reach out to us directly.",
  },

  // Gifts / Honeymoon Fund
  gifts: {
    label: "Gifts",
    heading: "Your Presence is Enough",
    subtitle: "Your presence is the greatest gift",
    heroImage: "/images/hero-gifts.jpg",
    message: "Your presence is enough of a present to us! But for those of you who are stubborn, we're putting together a honeymoon fund. We're still arguing about the destination, but we know it'll involve good food and zero alarm clocks.",
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
    label: "Details to Note",
    heading: "Questions",
    subtitle: "Frequently asked questions",
    items: [
      {
        question: "What is the dress code?",
        answer: "Cocktail attire — think summer evening by the water. Elegant, not stiff. Need some inspiration? Check out our <a href=\"https://suitsupply.com/en-nl/journal/cocktail-attire-for-men.html\" target=\"_blank\" rel=\"noopener noreferrer\">men's style guide</a> or <a href=\"https://www.theknot.com/content/cocktail-wedding-attire\" target=\"_blank\" rel=\"noopener noreferrer\">women's style ideas</a>.",
      },
      {
        question: "Can I bring a plus one?",
        answer: "Your invitation will let you know. If you're not sure, just ask us — we don't bite.",
      },
      {
        question: "Are children welcome?",
        answer: "While we love your little ones, our wedding will be an adults-only celebration.",
      },
      {
        question: "Is there parking available?",
        answer: "Yes, there's paid parking near the venue in the Het Park area.",
      },
      {
        question: "What time should I arrive?",
        answer: "By 4:45 PM, please. We will actually start on time.",
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
      { label: "FAQ", href: "#faq" },
    ],
  },

  // SEO Metadata
  meta: {
    title: "Laurens & Monica",
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
