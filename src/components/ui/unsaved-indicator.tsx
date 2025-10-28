import cn from "clsx";
import type { HTMLAttributes } from "react";

export interface UnsavedIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export function UnsavedIndicator({ active = false, className, ...props }: UnsavedIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-caption",
        active ? "text-systemWarning" : "text-textSecondary",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          active ? "animate-pulse bg-systemWarning" : "bg-borderDivider",
        )}
      />
      {active ? "Unsaved" : "Saved"}
    </span>
  );
}
