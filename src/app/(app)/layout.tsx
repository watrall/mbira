import type { PropsWithChildren } from "react";

import { PageHeaderPlaceholder } from "@/components/layout/page-header";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { ToastViewport } from "@/components/ui/toast";

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
      <ToastViewport />
    </div>
  );
}
