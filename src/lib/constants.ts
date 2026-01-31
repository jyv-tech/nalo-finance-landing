/**
 * Application-wide constants
 * Centralized configuration for easily updatable values
 */

// Mobile app launch configuration
export const MOBILE_APP_CONFIG = {
  launchDate: process.env.NEXT_PUBLIC_MOBILE_APP_LAUNCH_DATE || "Q2 2025",
  betaTesters: "250+",
  betaRating: "4.8",
  platforms: "iOS & Android",
} as const;

// Site configuration
export const SITE_CONFIG = {
  name: "Nalo Finance",
  domain: "nalofinance.com",
  url: "https://nalofinance.com",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.nalofinance.com",
} as const;

// Social media links
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/nalofinance",
  linkedin: "https://linkedin.com/company/nalofinance",
  instagram: "https://instagram.com/nalofinance",
} as const;
