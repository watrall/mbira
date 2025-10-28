"use server";

import type { Session } from "@supabase/supabase-js";

import { createSupabaseServerActionClient, createSupabaseServerComponentClient } from "./server";

export const getServerSession = async (): Promise<Session | null> => {
  const supabase = createSupabaseServerComponentClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Failed to fetch Supabase session", error);
    return null;
  }

  return session ?? null;
};

export const requireServerSession = async (): Promise<Session> => {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
};

export const signOutServerAction = async (): Promise<void> => {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};
