"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/types/schema";

type BrowserClient = ReturnType<typeof createClientComponentClient<Database>>;

let browserClient: BrowserClient | undefined;

export const getSupabaseBrowserClient = (): BrowserClient => {
  if (browserClient) {
    return browserClient;
  }

  browserClient = createClientComponentClient<Database>();
  return browserClient;
};
