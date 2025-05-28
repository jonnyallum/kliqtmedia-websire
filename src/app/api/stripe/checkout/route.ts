/**
 * Stripe Checkout API Route
 * Creates Stripe checkout sessions for payments
 */

import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { priceId, customerEmail, metadata } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Validate environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY environment variable')
      return NextResponse.json(
        { error: 'Payment system configuration error' },
        { status: 500 }
      )
    }

    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      console.error('Missing NEXT_PUBLIC_SITE_URL environment variable')
      return NextResponse.json(
        { error: 'Site configuration error' },
        { status: 500 }
      )
    }

    // For demo purposes, create a simple payment intent instead of using non-existent price IDs
    // In production, you would have actual Stripe Price IDs from your Stripe dashboard
    console.log('Demo checkout request for:', { priceId, customerEmail, metadata })

    // Create checkout session with demo configuration
    const { sessionId, url } = await createCheckoutSession({
      priceId: 'price_1234567890', // Demo price ID - replace with real ones in production
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      customerEmail,
      metadata: {
        ...metadata,
        source: 'kliqt_website',
        demo_price_id: priceId, // Store the original demo price ID
      },
    })

    // Log the checkout session to Supabase for tracking
    try {
      const supabase = createClient()
      await supabase
        .from('checkout_sessions')
        .insert({
          session_id: sessionId,
          customer_email: customerEmail || 'demo@kliqtmedia.co.uk',
          price_id: priceId,
          status: 'pending',
          metadata: {
            ...metadata,
            demo_mode: true,
          },
        })
        .select()
    } catch (dbError) {
      // Don't fail the checkout if database logging fails
      console.warn('Failed to log checkout session to database:', dbError)
    }

    return NextResponse.json({ sessionId, url })
  } catch (error) {
    console.error('Checkout session error:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('No such price')) {
        return NextResponse.json(
          { error: 'Invalid price configuration. Please contact support.' },
          { status: 400 }
        )
      }
      if (error.message.includes('Invalid API key')) {
        return NextResponse.json(
          { error: 'Payment system configuration error' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again or contact support.' },
      { status: 500 }
    )
  }
}