export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  googleScriptUrl: import.meta.env.VITE_GOOGLE_SCRIPT_URL,
} as const;