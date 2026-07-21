import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kmgwnvvjcnwikopifmbi.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_mBr5-i8LYoxssV-9I_LAdg_hRaJ-W3_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
