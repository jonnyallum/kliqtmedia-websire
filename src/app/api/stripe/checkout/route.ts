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

    // Create checkout session
    const { sessionId, url } = await createCheckoutSession({
      priceId,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      customerEmail,
      metadata: {
        ...metadata,
        source: 'kliqt_website',
      },
    })

    // Optionally log the checkout session to Supabase
    if (customerEmail) {
      const supabase = createClient()
      await supabase
        .from('checkout_sessions')
        .insert({
          session_id: sessionId,
          customer_email: customerEmail,
          price_id: priceId,
          status: 'pending',
          metadata,
        })
        .select()
    }

    return NextResponse.json({ sessionId, url })
  } catch (error) {
    console.error('Checkout session error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}