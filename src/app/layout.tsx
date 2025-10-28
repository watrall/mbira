import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { PageHeaderPlaceholder } from "@/components/layout/page-header";
import { SidebarPlaceholder } from "@/components/layout/sidebar";
import { TopBarPlaceholder } from "@/components/layout/top-bar";
import { getServerSession } from "@/lib/supabase/auth";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "mbira Authoring Tool",
  description: "Internal authoring and management workspace for museums and cultural institutions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${inter.variable} bg-bgContent font-sans text-textPrimary antialiased`}>
        <AppProviders initialSession={session}>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <div className="flex min-h-screen bg-bgContent">
            <SidebarPlaceholder />
            <div className="flex flex-1 flex-col">
              <TopBarPlaceholder />
              <main
                id="main-content"
                className="flex flex-1 flex-col gap-6 px-4 pb-12 pt-6 sm:px-6 lg:px-8"
              >
                <PageHeaderPlaceholder />
                {children}
              </main>
            </div>
          </div>
          <div
            id="toast-root"
            aria-live="polite"
            aria-atomic="true"
            className="pointer-events-none fixed inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-6 sm:items-end sm:px-6"
          />
        </AppProviders>
      </body>
    </html>
  );
}
