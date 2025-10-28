"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { useAppStore } from "@/store/app-store";

const AUTO_DISMISS_MS = 5000;

export function ToastViewport() {
  const toasts = useAppStore((state) => state.ui.toasts);
  const { dismissToast, clearToasts } = useAppStore((state) => state.actions);

  useEffect(() => () => clearToasts(), [clearToasts]);

  useEffect(() => {
    const timers = toasts
      .filter((toast) => toast.autoDismiss !== false)
      .map(({ id }) =>
        setTimeout(() => {
          dismissToast(id);
        }, AUTO_DISMISS_MS),
      );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, dismissToast]);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-3 px-4 pb-6 sm:items-end sm:px-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto w-full max-w-sm rounded-lg border border-borderDivider bg-white p-4 shadow-lg"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              {toast.title ? (
                <p className="text-header font-semibold text-textPrimary">{toast.title}</p>
              ) : null}
              {toast.description ? (
                <p className="text-body text-textSecondary">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              className="rounded-md border border-borderDivider p-1 text-textSecondary hover:text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
