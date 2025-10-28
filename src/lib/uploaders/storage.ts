import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/schema";

import { getSupabaseAnonKey, getSupabaseUrl } from "../supabase/env";

export function createStorageClient(accessToken?: string) {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  return createClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      autoRefreshToken: false,
    },
    global: accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined,
  });
}

export type StorageClient = ReturnType<typeof createStorageClient>;
