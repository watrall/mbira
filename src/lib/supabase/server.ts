import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import type { Database } from "@/types/schema";

import { getSupabaseServiceRoleKey, getSupabaseUrl } from "./env";

export const createSupabaseServerComponentClient = () =>
  createServerComponentClient<Database>({ cookies });

export const createSupabaseServerActionClient = () =>
  createServerActionClient<Database>({ cookies });

export const createSupabaseServiceRoleClient = () => {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export type SupabaseServerClient = SupabaseClient<Database>;
