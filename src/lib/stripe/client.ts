/**
 * Stripe Client Configuration
 * Handles client-side Stripe operations for payments
 */

import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

// Stripe price IDs for different services (to be configured in Stripe Dashboard)
export const STRIPE_PRICES = {
  // Website Design & Hosting
  WEBSITE_STARTER: 'price_website_starter',
  WEBSITE_BUSINESS: 'price_website_business', 
  WEBSITE_PRO: 'price_website_pro',
  HOSTING_BASIC: 'price_hosting_basic',
  HOSTING_PREMIUM: 'price_hosting_premium',
  
  // Mobile App Development
  APP_MVP: 'price_app_mvp',
  APP_BUSINESS: 'price_app_business',
  APP_PREMIUM: 'price_app_premium',
  APP_MAINTENANCE: 'price_app_maintenance',
  
  // AI Automation & Integration
  AI_CHATBOT: 'price_ai_chatbot',
  AI_AUTOMATION: 'price_ai_automation',
  AI_AGENT: 'price_ai_agent',
  AI_TRAINING: 'price_ai_training',
  
  // Graphic Design & Branding
  LOGO_DESIGN: 'price_logo_design',
  BRAND_PACK: 'price_brand_pack',
  PITCH_DECK: 'price_pitch_deck',
  
  // Social Media Marketing
  SOCIAL_MONTHLY: 'price_social_monthly',
  REELS_SHORTS: 'price_reels_shorts',
  SOCIAL_STRATEGY: 'price_social_strategy',
  
  // LinkedIn & Portfolio
  LINKEDIN_REFRESH: 'price_linkedin_refresh',
  PORTFOLIO_WEBSITE: 'price_portfolio_website',
  LINKEDIN_MANAGEMENT: 'price_linkedin_management'
} as const

export type StripePriceId = typeof STRIPE_PRICES[keyof typeof STRIPE_PRICES]