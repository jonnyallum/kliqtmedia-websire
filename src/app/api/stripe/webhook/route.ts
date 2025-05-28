/**
 * Stripe Webhook Handler
 * Processes Stripe events and updates database accordingly
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { verifyWebhookSignature } from '@/lib/stripe/server'
import { createServiceClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const event = verifyWebhookSignature(body, signature, webhookSecret)
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break
      
      case 'customer.created':
        await handleCustomerCreated(event.data.object as Stripe.Customer)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = createServiceClient()
  
  try {
    // Update checkout session status
    await supabase
      .from('checkout_sessions')
      .update({
        status: 'completed',
        stripe_customer_id: session.customer as string,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
      })
      .eq('session_id', session.id)

    // Create order record
    await supabase
      .from('orders')
      .insert({
        stripe_session_id: session.id,
        stripe_customer_id: session.customer as string,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
        currency: session.currency,
        status: 'completed',
        metadata: session.metadata,
      })

    console.log(`Checkout completed for session: ${session.id}`)
  } catch (error) {
    console.error('Error handling checkout completion:', error)
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const supabase = createServiceClient()
  
  try {
    // Update payment record
    await supabase
      .from('payments')
      .upsert({
        stripe_payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: 'succeeded',
        customer_email: paymentIntent.receipt_email,
        metadata: paymentIntent.metadata,
      })

    console.log(`Payment succeeded: ${paymentIntent.id}`)
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const supabase = createServiceClient()
  
  try {
    // Update payment record
    await supabase
      .from('payments')
      .upsert({
        stripe_payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: 'failed',
        customer_email: paymentIntent.receipt_email,
        metadata: paymentIntent.metadata,
        failure_reason: paymentIntent.last_payment_error?.message,
      })

    console.log(`Payment failed: ${paymentIntent.id}`)
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

async function handleCustomerCreated(customer: Stripe.Customer) {
  const supabase = createServiceClient()
  
  try {
    // Store customer information
    await supabase
      .from('customers')
      .upsert({
        stripe_customer_id: customer.id,
        email: customer.email,
        name: customer.name,
        metadata: customer.metadata,
      })

    console.log(`Customer created: ${customer.id}`)
  } catch (error) {
    console.error('Error handling customer creation:', error)
  }
}