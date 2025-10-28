const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const getSupabaseUrl = () => getEnv("NEXT_PUBLIC_SUPABASE_URL");
export const getSupabaseAnonKey = () => getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
export const getSupabaseServiceRoleKey = () => getEnv("SUPABASE_SERVICE_ROLE_KEY");
