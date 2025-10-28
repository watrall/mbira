import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-bgContent">
      {children}
      <div
        id="toast-root"
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-6 sm:items-end sm:px-6"
      />
    </div>
  );
}
