"use client";

import cn from "clsx";
import type { ReactNode } from "react";

export interface StickySaveBarProps {
  dirty: boolean;
  onSave: () => void;
  onDiscard?: () => void;
  saving?: boolean;
  className?: string;
  actions?: ReactNode;
}

export function StickySaveBar({
  dirty,
  onSave,
  onDiscard,
  saving = false,
  className,
  actions,
}: StickySaveBarProps) {
  if (!dirty) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-borderDivider bg-bgSidebar/95 backdrop-blur",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div>
          <p className="text-body font-medium text-textPrimary">Unsaved changes</p>
          <p className="text-caption text-textSecondary">Review your edits before publishing.</p>
        </div>
        <div className="flex items-center gap-3">
          {onDiscard ? (
            <button
              type="button"
              className="rounded-md border border-borderDivider px-3 py-1.5 text-body text-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              onClick={onDiscard}
            >
              Discard
            </button>
          ) : null}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-accent-strong px-4 py-2 text-body font-semibold text-white shadow-sm transition hover:bg-accent-contrast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {actions}
        </div>
      </div>
    </div>
  );
}
