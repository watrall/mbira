import type { PropsWithChildren } from "react";

import { PageHeaderPlaceholder } from "@/components/layout/page-header";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-bgContent">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <TopBar />
        <main
          id="main-content"
          className="flex flex-1 flex-col gap-6 px-4 pb-12 pt-6 sm:px-6 lg:px-8"
        >
          <PageHeaderPlaceholder />
          {children}
        </main>
      </div>
      <div
        id="toast-root"
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-6 sm:items-end sm:px-6"
      />
    </div>
  );
}
