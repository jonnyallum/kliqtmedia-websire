# KLIQT Media - Supabase & Stripe Integration Setup

This document outlines the complete setup process for integrating Supabase (authentication & database) and Stripe (payments) with the KLIQT Media website.

## 🚀 Quick Start

The website is now configured with:
- ✅ Supabase authentication system
- ✅ Stripe payment processing
- ✅ Modern SSR support with Next.js 14
- ✅ TypeScript for type safety
- ✅ Webhook handling for payment events

## 📋 Required Supabase Database Tables

To complete the integration, create these tables in your Supabase database:

### 1. Users Profile Table
```sql
-- Extend the default auth.users with profile information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT CHECK (role IN ('freelancer', 'client', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 2. Customers Table
```sql
CREATE TABLE public.customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
```

### 3. Checkout Sessions Table
```sql
CREATE TABLE public.checkout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  customer_email TEXT,
  stripe_customer_id TEXT,
  price_id TEXT NOT NULL,
  amount_total INTEGER,
  currency TEXT DEFAULT 'gbp',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  payment_status TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;
```

### 4. Orders Table
```sql
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT REFERENCES public.checkout_sessions(session_id),
  stripe_customer_id TEXT,
  customer_email TEXT NOT NULL,
  amount_total INTEGER NOT NULL,
  currency TEXT DEFAULT 'gbp',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'processing', 'cancelled')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
```

### 5. Payments Table
```sql
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'gbp',
  status TEXT NOT NULL CHECK (status IN ('succeeded', 'failed', 'pending', 'cancelled')),
  customer_email TEXT,
  failure_reason TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
```

## 🔧 Stripe Configuration

### 1. Create Products & Prices in Stripe Dashboard

You need to create products and prices in your Stripe dashboard for each service package. Update the price IDs in `/src/lib/stripe/client.ts`:

```typescript
export const STRIPE_PRICES = {
  // Website Design & Hosting
  WEBSITE_STARTER: 'price_1234567890abcdef', // Replace with actual price ID
  WEBSITE_BUSINESS: 'price_1234567890abcdef',
  WEBSITE_PRO: 'price_1234567890abcdef',
  // ... etc
}
```

### 2. Set Up Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select these events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.created`
4. Copy the webhook signing secret to your `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret
   ```

## 🔐 Authentication Flow

The authentication system is now fully integrated:

1. **Sign Up**: Users can create accounts with email/password
2. **Sign In**: Existing users can authenticate
3. **Profile Management**: User profiles are automatically created
4. **Protected Routes**: Use the `useAuth()` hook to protect pages
5. **Role-based Access**: Support for freelancer/client/admin roles

### Example Usage:
```typescript
import { useAuth } from '@/lib/auth/context'

function ProtectedComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>
  
  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

## 💳 Payment Flow

The payment system handles the complete checkout process:

1. **Product Selection**: Users click "Get Started" on pricing page
2. **Checkout Creation**: API creates Stripe checkout session
3. **Payment Processing**: User completes payment on Stripe
4. **Webhook Handling**: System processes payment confirmation
5. **Success Page**: User sees confirmation and next steps

### Testing Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update all environment variables with production values
- [ ] Set up Supabase database tables
- [ ] Create Stripe products and update price IDs
- [ ] Configure Stripe webhooks with production URL
- [ ] Test authentication flow
- [ ] Test payment flow with test cards
- [ ] Set up proper error monitoring
- [ ] Configure email templates in Supabase Auth

## 🔍 API Endpoints

The following API routes are now available:

- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Key Files

- `/src/lib/supabase/` - Supabase client configuration
- `/src/lib/stripe/` - Stripe client and server configuration
- `/src/lib/auth/context.tsx` - Authentication context provider
- `/src/app/api/stripe/` - Stripe API routes
- `/src/app/portal/page.tsx` - Authentication portal
- `/src/app/success/page.tsx` - Payment success page

## 🔧 Troubleshooting

### Common Issues:

1. **Authentication not working**: Check Supabase URL and keys
2. **Payments failing**: Verify Stripe keys and webhook secret
3. **Database errors**: Ensure all tables are created with proper RLS policies
4. **CORS issues**: Check Supabase project settings

### Debug Mode:

Set `NODE_ENV=development` to see detailed error logs in the console.

---

🎉 **Your KLIQT Media website is now fully integrated with Supabase and Stripe!**

For support, check the documentation or contact the development team.