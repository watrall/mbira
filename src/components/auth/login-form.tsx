"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Provider } from "@supabase/supabase-js";
import cn from "clsx";
import { Github, Lock, LogIn, Mail, Orbit, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/app-store";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
  rememberMe: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

type ExtendedProvider = Provider | "orcid";

const oauthProviders: Array<{
  provider: ExtendedProvider;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = [
  { provider: "github", label: "Continue with GitHub", icon: Github },
  { provider: "google", label: "Continue with Google", icon: Orbit },
  { provider: "azure", label: "Continue with Microsoft", icon: ShieldCheck },
  { provider: "orcid", label: "Continue with ORCID", icon: LogIn },
];

const oauthRedirectUrl = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL ?? undefined;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { pushToast } = useAppStore((state) => state.actions);
  const supabase = getSupabaseBrowserClient();
  const redirectPath = searchParams.get("redirectTo") ?? "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const [oauthLoading, setOauthLoading] = useState<ExtendedProvider | null>(null);

  const onSubmit = async (values: FormValues) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error ?? !data?.session) {
        setError("password", {
          type: "manual",
          message: error?.message ?? "Unable to sign in with those credentials.",
        });
        pushToast({
          variant: "danger",
          title: "Sign in failed",
          description: error?.message ?? "Check your credentials and try again.",
        });
        return;
      }

      pushToast({
        variant: "success",
        title: "Welcome back",
        description: "Redirecting you to your workspace.",
      });

      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";

      pushToast({
        variant: "danger",
        title: "Unexpected error",
        description: message,
      });
    }
  };

  const handleOAuth = async (provider: ExtendedProvider) => {
    try {
      setOauthLoading(provider);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: oauthRedirectUrl,
        },
      });

      if (error) {
        pushToast({
          variant: "danger",
          title: "Unable to start sign in",
          description: error.message,
        });
        setOauthLoading(null);
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not open the provider sign-in flow.";
      pushToast({
        variant: "danger",
        title: "Unexpected error",
        description: message,
      });
      setOauthLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-body font-medium text-textPrimary">
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-textSecondary" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={cn(
                "w-full rounded-lg border border-borderDivider bg-white py-2.5 pl-10 pr-3 text-body text-textPrimary placeholder:text-textSecondary/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent",
                errors.email && "border-systemDanger focus:ring-systemDanger",
              )}
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-caption text-systemDanger">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-body font-medium text-textPrimary">
              Password
            </label>
            <Link href="/forgot-password" className="text-caption text-accent underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-textSecondary" />
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={cn(
                "w-full rounded-lg border border-borderDivider bg-white py-2.5 pl-10 pr-3 text-body text-textPrimary placeholder:text-textSecondary/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent",
                errors.password && "border-systemDanger focus:ring-systemDanger",
              )}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-caption text-systemDanger">{errors.password.message}</p>
          )}
        </div>

        <label className="flex items-center gap-2 text-body text-textSecondary">
          <input
            type="checkbox"
            className="size-4 rounded border-borderDivider text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            {...register("rememberMe")}
          />
          Remember this device
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md bg-accent px-4 py-2.5 text-body font-semibold text-white shadow-sm transition hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="size-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Signing in…
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-borderDivider" />
          <span className="text-caption text-systemNeutral">or continue with</span>
          <span className="h-px flex-1 bg-borderDivider" />
        </div>
        <div className="grid gap-3">
          {oauthProviders.map(({ provider, label, icon: Icon }) => (
            <button
              key={provider}
              type="button"
              onClick={() => handleOAuth(provider)}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-3 rounded-md border border-borderDivider bg-white px-4 py-2.5 text-body font-medium text-textPrimary shadow-sm transition hover:bg-bgContent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon className="size-4 text-accent" aria-hidden="true" />
              {oauthLoading === provider ? "Opening…" : label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
