import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "mbira — Sign in",
  description:
    "Sign in to the mbira Authoring Tool to manage instances, projects, and cultural content.",
};

const backgroundImage = "https://source.unsplash.com/qpkH-jgE90k/2000x1333";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row">
      <div className="relative flex h-64 w-full overflow-hidden lg:h-auto lg:flex-1">
        <Image
          src={backgroundImage}
          alt="Historic marketplace architecture with signage and lanterns"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-transparent" />
      </div>

      <div className="relative flex flex-1 items-center justify-center bg-bgContent px-6 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-md space-y-10">
          <div>
            <Image
              src="/assets/mbira-logo.svg"
              alt="mbira"
              width={160}
              height={52}
              className="h-auto w-36 sm:w-40"
              priority
            />
            <p className="mt-3 text-body text-textSecondary">
              Authoring workspace for museums and cultural institutions.
            </p>
          </div>

          <div className="space-y-6 rounded-xl border border-borderDivider bg-white/90 p-8 shadow-md backdrop-blur">
            <div className="space-y-2 text-left">
              <h1 className="text-page-title">Welcome back</h1>
              <p className="text-body text-textSecondary">
                Sign in with your email and password or choose a connected provider.
              </p>
            </div>
            <Suspense fallback={<div className="h-40 animate-pulse rounded-lg bg-bgContent" />}>
              <LoginForm />
            </Suspense>
          </div>

          <p className="text-caption text-textSecondary">
            Photo by{" "}
            <Link
              href="https://unsplash.com/@kavinci_studio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline"
            >
              Kareem Kouka
            </Link>{" "}
            on{" "}
            <Link
              href="https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-qpkH-jgE90k?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline"
            >
              Unsplash
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
