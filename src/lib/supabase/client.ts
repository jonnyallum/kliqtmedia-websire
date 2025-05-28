/**
 * Supabase Client Configuration
 * Handles client-side Supabase operations with proper SSR support
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  )
}

// Export singleton instance for client-side usage
export const supabase = createClient()