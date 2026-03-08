import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_ANON_KEY;

/**
 * Supabase client for Client Components (browser).
 * Use this in 'use client' components, hooks, and client-side code.
 */
export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase env: SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY (or SUPABASE_ANON_KEY)'
    );
  }
  return createBrowserClient(supabaseUrl, supabaseKey);
}
