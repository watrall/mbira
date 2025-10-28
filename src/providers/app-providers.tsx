"use client";

import type { Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren, useEffect, useState } from "react";

import { useAppStore } from "@/store/app-store";

type AppProvidersProps = PropsWithChildren<{
  initialSession: Session | null;
}>;

export function AppProviders({ initialSession, children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 1,
            staleTime: 60_000,
            gcTime: 5 * 60_000,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionHydrator initialSession={initialSession} />
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}

function SessionHydrator({ initialSession }: { initialSession: Session | null }) {
  const setSession = useAppStore((state) => state.actions.setSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession, setSession]);

  return null;
}
