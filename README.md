# Laurens & Monica Wedding Website

A custom wedding website built with Next.js 14, TypeScript, and Tailwind CSS. Features an elegant editorial design with a sage/emerald color palette.

## Features

- **Modern Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **Editorial Design**: Split-layout heroes, elegant typography, generous whitespace
- **Responsive**: Mobile-first design that works on all devices
- **Accessible**: Semantic HTML, keyboard navigation, screen reader friendly
- **i18n Ready**: Content centralized for easy translation
- **Add to Calendar**: Google Calendar links and .ics file downloads

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Split-layout hero with couple names, date, venue, CTAs |
| Schedule | `/schedule` | Event timeline, venue map, dress code |
| Travel | `/travel` | Airport, train, car info, hotel recommendations |
| RSVP | `/rsvp` | RSVP information with external form link |
| Gifts | `/gifts` | Honeymoon fund (Stripe integration ready) |
| FAQ | `/faq` | Frequently asked questions accordion |
| Gallery | `/gallery` | Photo grid |

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd "Wedding Website"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables (Optional)

Copy `.env.example` to `.env.local` for environment-specific settings:

```bash
cp .env.example .env.local
```

Currently no environment variables are required for basic functionality.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Homepage
│   ├── schedule/page.tsx   # Schedule page
│   ├── travel/page.tsx     # Travel page
│   ├── rsvp/page.tsx       # RSVP page
│   ├── gifts/page.tsx      # Gifts/Registry page
│   ├── faq/page.tsx        # FAQ page
│   └── gallery/page.tsx    # Gallery page
├── components/
│   ├── layout/             # Header, Footer
│   ├── ui/                 # Reusable UI components
│   ├── AddToCalendar.tsx   # Calendar dropdown
│   ├── FAQAccordion.tsx    # FAQ accordion
│   ├── SplitHero.tsx       # Split-layout hero
│   └── VenueMap.tsx        # Google Maps embed
├── config/
│   └── content.ts          # All wedding content/data
├── lib/
│   └── calendar.ts         # Calendar utilities
└── styles/
    └── globals.css         # Global styles, Tailwind
```

## Configuration

All wedding content is centralized in `src/config/content.ts`. Update this file to customize:

- Couple names and wedding date
- Venue details
- Event schedule
- Travel information
- RSVP settings
- FAQ items
- And more...

### Adding Images

Place images in `public/images/`:

- `hero-home.jpg` - Couple photo for homepage
- `hero-travel.jpg` - Travel section hero
- `hero-gifts.jpg` - Gifts section hero
- `og-image.jpg` - Social sharing image
- `gallery/*.jpg` - Gallery photos

Then uncomment the Image components in the respective pages.

### Setting Up RSVP

1. Create a Google Form for RSVPs
2. Update `rsvp.formUrl` in `src/config/content.ts`

### Setting Up Honeymoon Fund

1. Create a Stripe account and payment link
2. Update `gifts.fund.stripeLink` in `src/config/content.ts`
3. Set `gifts.fund.enabled` to `true`

## Deployment to Vercel

### Option 1: Via Vercel Dashboard

1. Push code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel auto-detects Next.js and deploys

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Custom Domain

After deployment, add a custom domain in Vercel dashboard:
1. Go to Project Settings > Domains
2. Add your domain (e.g., `laurens-and-monica.com`)
3. Update DNS records as instructed

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `sage-600` | #6b7c5e | Primary backgrounds |
| `emerald-600` | #059669 | CTAs, links |
| `stone-50` | #fafaf9 | Page backgrounds |
| `stone-800` | #292524 | Headings |

### Typography

- **Headlines**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

Private project for personal use.

---

Made with love for Laurens & Monica's wedding.
