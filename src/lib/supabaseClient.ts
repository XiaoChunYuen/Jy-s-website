import { isSupabaseConfigured, supabaseKey, supabaseUrl } from './supabase';

type SupabaseClient = Awaited<ReturnType<typeof createSupabaseClient>>;

let supabaseClientPromise: Promise<SupabaseClient> | null = null;

async function createSupabaseClient() {
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(supabaseUrl, supabaseKey);
}

export async function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (!supabaseClientPromise) {
    supabaseClientPromise = createSupabaseClient();
  }

  return supabaseClientPromise;
}
