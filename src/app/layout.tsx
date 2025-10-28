import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        <AppProviders initialSession={session}>{children}</AppProviders>
      </body>
    </html>
  );
}
