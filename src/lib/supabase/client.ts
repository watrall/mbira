"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/schema";

let browserClient: SupabaseClient<Database> | null = null;

export const getSupabaseBrowserClient = (): SupabaseClient<Database> => {
  if (!browserClient) {
    browserClient = createClientComponentClient<Database>();
  }

  return browserClient;
};
