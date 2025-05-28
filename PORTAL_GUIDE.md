# KLIQT Media Portal Guide

## Overview

The KLIQT Media Portal is a comprehensive client dashboard that provides users with complete control over their orders, billing, profile, and account settings. Built with Next.js 14, TypeScript, Supabase, and Stripe integration.

## Portal Structure

```
/portal/
├── dashboard/           # Main dashboard area
│   ├── page.tsx        # Dashboard overview with stats
│   ├── profile/        # User profile management
│   ├── orders/         # Order tracking and history
│   ├── billing/        # Payment history and invoices
│   └── settings/       # Account preferences
└── page.tsx            # Portal landing/auth check
```

## Features

### 🏠 Dashboard Overview
- **Real-time Statistics**: Total orders, active projects, spending, pending payments
- **Quick Actions**: Direct links to create new projects, view orders, manage billing
- **Recent Orders**: Last 5 orders with status indicators
- **Responsive Design**: Mobile-first approach with smooth animations

### 👤 Profile Management
- **Editable Profile**: Full name, phone, company, bio, website
- **Role Selection**: Client/Freelancer designation
- **Avatar Upload**: Profile photo management (placeholder for now)
- **Real-time Validation**: Form validation with success/error messaging

### 📦 Order Tracking
- **Order History**: Complete list of all user orders
- **Status Tracking**: Visual status indicators (pending, processing, completed, cancelled)
- **Search & Filter**: Find orders by number or filter by status
- **Order Details**: Modal with complete order information
- **Download Files**: Access completed deliverables (when available)

### 💳 Billing & Payments
- **Payment History**: Complete transaction history with Stripe integration
- **Invoice Management**: Auto-generated invoices for completed payments
- **Financial Overview**: Total paid, pending amounts, transaction count
- **Dual View**: Toggle between payments and invoices
- **Export Options**: Download receipts and invoices

### ⚙️ Settings & Preferences
- **Notification Controls**: Email, push, and SMS notification preferences
- **Theme Selection**: Light, dark, or system theme options
- **Localization**: Language, timezone, and currency settings
- **Privacy Controls**: Profile visibility and data sharing preferences
- **Account Management**: Account deletion with confirmation flow

## Technical Implementation

### Authentication Flow
```typescript
// Protected routes check authentication status
const { user, loading } = useAuth()

// Redirect to login if not authenticated
if (!user && !loading) {
  redirect('/auth/login')
}
```

### Database Integration
```typescript
// Real-time data fetching from Supabase
const { data, error } = await supabase
  .from('orders')
  .select('*')
  .eq('customer_id', customerId)
  .order('created_at', { ascending: false })
```

### State Management
- **React Hooks**: useState, useEffect for local state
- **Context API**: Authentication state management
- **Real-time Updates**: Supabase subscriptions for live data

### UI/UX Features
- **Framer Motion**: Smooth page transitions and animations
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Dark Theme**: KLIQT brand colors with neon accents
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages

## Database Schema

### Core Tables
```sql
-- User profiles with extended information
profiles (
  id UUID PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('freelancer', 'client', 'admin')),
  phone TEXT,
  company TEXT,
  bio TEXT,
  website TEXT,
  avatar_url TEXT
)

-- Customer records linked to auth users
customers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  stripe_customer_id TEXT,
  email TEXT,
  full_name TEXT
)

-- Orders with comprehensive tracking
orders (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  order_number TEXT,
  status TEXT,
  total_amount INTEGER,
  currency TEXT DEFAULT 'GBP',
  items JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- Payment tracking with Stripe integration
payments (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  stripe_payment_intent_id TEXT,
  amount INTEGER,
  currency TEXT DEFAULT 'GBP',
  status TEXT,
  order_id UUID REFERENCES orders(id)
)

-- User preferences and settings
user_settings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  notifications JSONB,
  preferences JSONB,
  privacy JSONB
)
```

### Row Level Security (RLS)
```sql
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## API Integration

### Stripe Checkout
```typescript
// Create checkout session
const response = await fetch('/api/stripe/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_xxx',
    quantity: 1
  })
})
```

### Webhook Handling
```typescript
// Process Stripe webhooks
export async function POST(request: Request) {
  const sig = headers().get('stripe-signature')
  const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful payment
      break
    case 'payment_intent.succeeded':
      // Update payment status
      break
  }
}
```

## Styling & Theming

### KLIQT Brand Colors
```css
:root {
  --kliqt-primary: #8AFF00;    /* Neon green */
  --kliqt-secondary: #FF008F;  /* Hot pink */
  --kliqt-gradient: linear-gradient(135deg, #8AFF00, #FF008F);
}
```

### Component Classes
```css
.kliqt-card {
  @apply bg-gray-900 border border-gray-800 rounded-2xl p-6;
}

.kliqt-btn-primary {
  @apply bg-kliqt-primary text-black px-6 py-3 rounded-xl font-medium;
  @apply hover:bg-kliqt-primary/90 transition-colors;
}

.neon-text {
  @apply text-kliqt-primary;
  text-shadow: 0 0 10px theme('colors.kliqt.primary');
}
```

## Usage Examples

### Creating a New Portal Page
```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth/context'
import { supabase } from '@/lib/supabase/client'

export default function NewPortalPage() {
  const { user } = useAuth()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('your_table')
        .select('*')
        .eq('user_id', user?.id)

      if (error) throw error
      setData(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kliqt-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Page Title</h1>
        <p className="text-gray-400">Page description</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="kliqt-card"
      >
        {/* Your content here */}
      </motion.div>
    </div>
  )
}
```

### Adding Form Validation
```typescript
const [formData, setFormData] = useState({
  field1: '',
  field2: ''
})
const [errors, setErrors] = useState<Record<string, string>>({})

const validateForm = () => {
  const newErrors: Record<string, string> = {}
  
  if (!formData.field1.trim()) {
    newErrors.field1 = 'This field is required'
  }
  
  if (!formData.field2.trim()) {
    newErrors.field2 = 'This field is required'
  }
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!validateForm()) return
  
  // Process form submission
}
```

## Security Considerations

### Data Protection
- **RLS Policies**: All database queries respect row-level security
- **Input Validation**: Client and server-side validation
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Secure Headers**: Security headers configured in next.config.js

### Authentication
- **JWT Tokens**: Supabase handles secure token management
- **Session Management**: Automatic token refresh
- **Route Protection**: Server-side authentication checks

## Performance Optimizations

### Code Splitting
- **Dynamic Imports**: Lazy load heavy components
- **Route-based Splitting**: Automatic code splitting per page
- **Component Optimization**: Memoization where appropriate

### Data Fetching
- **Efficient Queries**: Select only required fields
- **Pagination**: Implement for large datasets
- **Caching**: Browser and CDN caching strategies

## Deployment

### Environment Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### Build Process
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

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check Supabase configuration
   - Verify JWT token validity
   - Ensure RLS policies are correct

2. **Payment Integration**
   - Verify Stripe webhook endpoints
   - Check webhook secret configuration
   - Monitor Stripe dashboard for errors

3. **Database Queries**
   - Check RLS policies
   - Verify foreign key relationships
   - Monitor Supabase logs

### Debug Mode
```typescript
// Enable debug logging
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Debug info:', data)
}
```

## Future Enhancements

### Planned Features
- **Real-time Notifications**: WebSocket integration
- **File Upload**: Direct file upload to Supabase Storage
- **Advanced Analytics**: Detailed usage statistics
- **Team Management**: Multi-user account support
- **API Access**: RESTful API for third-party integrations

### Performance Improvements
- **Server-side Rendering**: Optimize initial page loads
- **Edge Functions**: Move logic closer to users
- **Database Optimization**: Query optimization and indexing

## Support

For technical support or feature requests:
- **Documentation**: Check this guide first
- **GitHub Issues**: Report bugs and request features
- **Email Support**: Contact the development team

---

**Built with ❤️ by KLIQT Media**
*Empowering digital creativity through cutting-edge technology*