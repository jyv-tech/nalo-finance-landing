# Nalo Finance Landing Page

A modern, high-performance landing page for Nalo Finance - a comprehensive personal finance platform built for Nigerians.

## Overview

Nalo Finance is an all-in-one financial management platform designed specifically for the Nigerian market. This landing page showcases the platform's features, provides financial calculators, hosts the company blog, and serves as the main marketing and conversion funnel.

## Features

### Core Platform Features
- **Bank Connect** - Sync with Nigerian banks via Mono integration
- **Ajo Groups** - Digital Ajo/Esusu contribution management with trust scores
- **Smart Budgeting** - Expense tracking and budget management
- **Income Streams** - Side hustle and income tracking optimizer
- **Smart Goals** - Financial goal setting with AI-powered guidance
- **Tax Center** - 2026 Nigerian tax reform ready with optimization tools
- **Oracle AI** - AI-powered financial guide and advisor
- **Loans & Debt** - Debt tracking and payoff strategies

### Free Financial Tools
- **Personal Income Tax (PIT) Calculator** - 2026 Nigeria tax reform compliant
- **Corporate Income Tax (CIT) Calculator** - Business tax estimation
- **Cryptocurrency Tax Calculator** - Crypto gains taxation
- **Withholding Tax (WHT) Calculator** - WHT calculations

### Additional Features
- **Blog** - Financial education content with categories and tags
- **Pricing** - Tiered subscription plans (Free, Basic, Premium, Unlimited)
- **Dark/Light Theme** - Full theme support
- **Responsive Design** - Mobile-first, works on all devices
- **SEO Optimized** - Comprehensive structured data and meta tags

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.0.3 |
| Language | TypeScript 5 |
| UI Library | React 19.2.0 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| UI Components | Radix UI |
| Theme | next-themes |
| Security | isomorphic-dompurify |
| Build | Turbopack |
| Compiler | React Compiler (babel-plugin-react-compiler) |

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/jyv-tech/nalo-finance-landing.git

# Navigate to the project directory
cd nalo-finance-landing

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with metadata
│   ├── about/                # About page
│   ├── contact/              # Contact form page
│   ├── pricing/              # Pricing plans page
│   ├── discover/             # Discovery/marketplace
│   ├── privacy/              # Privacy policy
│   ├── terms/                # Terms of service
│   ├── blog/                 # Blog section
│   │   ├── page.tsx          # Blog listing
│   │   ├── [slug]/           # Individual blog posts
│   │   ├── category/[slug]/  # Category pages
│   │   └── tag/[slug]/       # Tag pages
│   ├── features/             # Feature detail pages
│   │   ├── ajo-groups/
│   │   ├── budgeting/
│   │   ├── financial-guide/
│   │   ├── income-streams/
│   │   ├── smart-goals/
│   │   └── tax-center/
│   └── tools/                # Financial calculators
│       ├── page.tsx          # Tools overview
│       ├── pit-calculator/   # Personal Income Tax
│       ├── cit-calculator/   # Corporate Income Tax
│       ├── crypto-calculator/# Crypto Tax
│       └── wht-calculator/   # Withholding Tax
├── components/               # React components
│   ├── blog/                 # Blog components
│   │   ├── article-schema.tsx
│   │   ├── editor-content.tsx
│   │   ├── newsletter.tsx
│   │   ├── post-card.tsx
│   │   ├── share-buttons.tsx
│   │   └── sidebar.tsx
│   ├── landing/              # Landing page sections
│   │   ├── hero.tsx
│   │   ├── navbar.tsx
│   │   ├── feature-grid.tsx
│   │   ├── ajo-spotlight.tsx
│   │   ├── pricing-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── mobile-apps-section.tsx
│   │   └── ...
│   ├── layout/               # Layout components
│   │   ├── footer.tsx
│   │   └── logo.tsx
│   ├── seo/                  # SEO components
│   │   └── structured-data.tsx
│   ├── tools/                # Calculator components
│   └── ui/                   # Reusable UI components
└── lib/                      # Utilities and API clients
    ├── api.ts                # Base API client
    ├── blog.ts               # Blog API functions
    ├── pricing.ts            # Pricing API functions
    ├── ajo.ts                # Ajo groups API
    ├── constants.ts          # App configuration
    ├── sanitize.ts           # HTML sanitization
    ├── utils.ts              # Utility functions
    └── calculators/          # Tax calculator logic
        ├── pit.ts
        ├── cit.ts
        ├── crypto.ts
        └── wht.ts
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.nalofinance.com

# Mobile App Launch Date (optional)
NEXT_PUBLIC_MOBILE_APP_LAUNCH_DATE=Q2 2025
```

## Configuration

### Next.js Configuration (`next.config.ts`)

Key configurations:
- React Compiler enabled for performance optimization
- Remote image patterns for CloudFront and API domains
- Turbopack for fast development builds

### Tailwind CSS (`tailwind.config.mjs`)

Custom theme with:
- Neobrutalist design system
- Custom color palette with CSS variables
- Dark mode support via class strategy
- Custom animations

## Deployment

### Docker

```bash
# Build the Docker image
docker build -t nalo-finance-landing .

# Run the container
docker run -p 3001:3000 nalo-finance-landing
```

### Nginx Configuration

The project includes `nginx.conf` for production deployment with:
- Reverse proxy to the Next.js app (port 3001)
- Security headers (CSP, X-Frame-Options, etc.)
- API proxy configuration
- Health check endpoints

### Production URLs
- Landing Page: `https://nalofinance.com`
- API: `https://api.nalofinance.com`
- App: `https://app.nalofinance.com`

## Security Features

- **XSS Protection** - HTML sanitization using DOMPurify
- **Security Headers** - CSP, X-Frame-Options, X-Content-Type-Options
- **Input Validation** - Form validation on client and server
- **Secure Links** - `rel="noopener noreferrer"` on external links

## SEO Features

- **Structured Data** - JSON-LD schemas for:
  - Organization
  - Website
  - Blog articles
  - Breadcrumbs
  - FAQ pages
  - How-to guides
- **Meta Tags** - Dynamic Open Graph and Twitter cards
- **Canonical URLs** - Proper canonicalization
- **Sitemap** - Automatic sitemap generation

## Accessibility

- **ARIA Labels** - Comprehensive labeling
- **Keyboard Navigation** - Full keyboard support
- **Focus Management** - Visible focus states
- **Semantic HTML** - Proper heading hierarchy
- **Color Contrast** - WCAG compliant colors

## Pricing Tiers

| Plan | Price (USD) | Price (NGN) | Features |
|------|-------------|-------------|----------|
| Free | $0 | ₦0 | 1 account, basic budgeting |
| Basic | $4.99/mo | ₦2,000/mo | 3 accounts, 5 Oracle queries |
| Premium | $9.99/mo | ₦4,000/mo | 10 accounts, 50 Oracle queries |
| Unlimited | $19.99/mo | ₦8,000/mo | Unlimited everything |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software owned by Nalo Finance.

## Support

For support, email support@nalofinance.com or visit our [contact page](https://nalofinance.com/contact).

---

Built with Next.js by the Nalo Finance Team
