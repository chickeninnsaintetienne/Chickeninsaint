import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables!\n\n' +
      'Please create a .env.local file in the project root with:\n' +
      'NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url\n' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key\n\n' +
      'Get these values from: https://supabase.com/dashboard/project/_/settings/api'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
