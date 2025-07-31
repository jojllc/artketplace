import { createClient } from '@supabase/supabase-js'

// These are the secret keys that connect your app to Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create the connection to Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey) 