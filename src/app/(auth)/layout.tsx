import type { PropsWithChildren } from "react";

import { ToastViewport } from "@/components/ui/toast";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-bgContent">
      {children}
      <ToastViewport />
    </div>
  );
}
