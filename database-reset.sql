-- KLIQT Media Database Reset & Setup Script
-- This script will drop existing tables and create fresh ones for the Supabase & Stripe integration

-- ============================================================================
-- STEP 1: Clean up existing tables (if they exist)
-- ============================================================================

-- Drop tables in correct order to handle foreign key constraints
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.checkout_sessions CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop any existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- ============================================================================
-- STEP 2: Create fresh tables with proper schema
-- ============================================================================

-- 1. User Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('freelancer', 'client', 'admin')) DEFAULT 'client',
  avatar_url TEXT,
  phone TEXT,
  company TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Customers Table (Stripe customer data)
CREATE TABLE public.customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  address JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for customers
CREATE POLICY "Users can view own customer data" ON public.customers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own customer data" ON public.customers
  FOR UPDATE USING (auth.uid() = user_id);

-- 3. Checkout Sessions Table (Stripe checkout tracking)
CREATE TABLE public.checkout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_email TEXT,
  stripe_customer_id TEXT,
  price_id TEXT NOT NULL,
  amount_total INTEGER,
  currency TEXT DEFAULT 'gbp',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired', 'cancelled')),
  payment_status TEXT,
  service_type TEXT, -- e.g., 'website', 'app', 'ai_automation'
  package_name TEXT, -- e.g., 'Starter', 'Business', 'Pro'
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on checkout_sessions
ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for checkout_sessions
CREATE POLICY "Users can view own checkout sessions" ON public.checkout_sessions
  FOR SELECT USING (auth.uid() = user_id OR customer_email = auth.email());

-- 4. Orders Table (Completed purchases)
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL DEFAULT 'KLIQT-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(EXTRACT(DOY FROM NOW())::TEXT, 3, '0') || '-' || LPAD(EXTRACT(HOUR FROM NOW())::TEXT, 2, '0') || LPAD(EXTRACT(MINUTE FROM NOW())::TEXT, 2, '0'),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id TEXT REFERENCES public.checkout_sessions(session_id),
  stripe_customer_id TEXT,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  amount_total INTEGER NOT NULL,
  currency TEXT DEFAULT 'gbp',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded')),
  service_type TEXT NOT NULL,
  package_name TEXT NOT NULL,
  project_details JSONB DEFAULT '{}',
  delivery_date DATE,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id OR customer_email = auth.email());

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 5. Payments Table (Payment tracking)
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'gbp',
  status TEXT NOT NULL CHECK (status IN ('succeeded', 'failed', 'pending', 'cancelled', 'refunded')),
  customer_email TEXT,
  payment_method_type TEXT,
  failure_reason TEXT,
  refund_amount INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for payments
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id OR customer_email = auth.email());

CREATE POLICY "Admins can view all payments" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- STEP 3: Create indexes for better performance
-- ============================================================================

-- Profiles indexes
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at);

-- Customers indexes
CREATE INDEX idx_customers_stripe_id ON public.customers(stripe_customer_id);
CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_customers_user_id ON public.customers(user_id);

-- Checkout sessions indexes
CREATE INDEX idx_checkout_sessions_user_id ON public.checkout_sessions(user_id);
CREATE INDEX idx_checkout_sessions_email ON public.checkout_sessions(customer_email);
CREATE INDEX idx_checkout_sessions_status ON public.checkout_sessions(status);
CREATE INDEX idx_checkout_sessions_created_at ON public.checkout_sessions(created_at);

-- Orders indexes
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_email ON public.orders(customer_email);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_service_type ON public.orders(service_type);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);

-- Payments indexes
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_order_id ON public.payments(order_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_created_at ON public.payments(created_at);

-- ============================================================================
-- STEP 4: Create helpful views for reporting
-- ============================================================================

-- View for order summary with customer details
CREATE OR REPLACE VIEW public.order_summary AS
SELECT 
  o.id,
  o.order_number,
  o.customer_name,
  o.customer_email,
  o.service_type,
  o.package_name,
  o.amount_total,
  o.currency,
  o.status,
  o.created_at,
  p.full_name as profile_name,
  p.role as customer_role
FROM public.orders o
LEFT JOIN public.profiles p ON o.user_id = p.id;

-- View for payment summary
CREATE OR REPLACE VIEW public.payment_summary AS
SELECT 
  p.id,
  p.amount,
  p.currency,
  p.status,
  p.payment_method_type,
  p.created_at,
  o.order_number,
  o.service_type,
  o.package_name
FROM public.payments p
LEFT JOIN public.orders o ON p.order_id = o.id;

-- ============================================================================
-- STEP 5: Insert sample admin user (optional)
-- ============================================================================

-- Note: This will only work if you have a user with this email already created in auth.users
-- UPDATE public.profiles 
-- SET role = 'admin' 
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@kliqtmedia.co.uk' LIMIT 1);

-- ============================================================================
-- STEP 6: Grant necessary permissions
-- ============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant permissions on tables
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.customers TO authenticated;
GRANT SELECT ON public.checkout_sessions TO authenticated;
GRANT SELECT ON public.orders TO authenticated;
GRANT SELECT ON public.payments TO authenticated;

-- Grant permissions on views
GRANT SELECT ON public.order_summary TO authenticated;
GRANT SELECT ON public.payment_summary TO authenticated;

-- Grant permissions for service role (for webhooks)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- VERIFICATION QUERIES (Run these to verify setup)
-- ============================================================================

-- Check if all tables exist
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

-- Check RLS policies
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public';

-- Check indexes
-- SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public' ORDER BY tablename, indexname;

-- ============================================================================
-- NOTES FOR KLIQT MEDIA TEAM
-- ============================================================================

/*
This script creates a complete database schema for the KLIQT Media website with:

1. User profiles with role-based access (freelancer/client/admin)
2. Stripe customer data management
3. Checkout session tracking
4. Order management with status tracking
5. Payment processing and history
6. Proper RLS policies for data security
7. Performance indexes
8. Helpful views for reporting

To use this script:
1. Copy and paste it into the Supabase SQL Editor
2. Run it to reset and create all tables
3. Verify the setup using the verification queries at the bottom

The schema is designed to work seamlessly with the Next.js application
and handles all the authentication and payment flows.
*/