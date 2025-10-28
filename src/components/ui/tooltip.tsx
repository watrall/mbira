"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

export interface TooltipProps {
  label: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

const positionClasses: Record<NonNullable<TooltipProps["side"]>, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
  bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2",
  left: "right-full top-1/2 -translate-y-1/2 -translate-x-2",
  right: "left-full top-1/2 -translate-y-1/2 translate-x-2",
};

export function Tooltip({ label, children, side = "top" }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span className="relative inline-flex" onMouseLeave={() => setOpen(false)}>
      <span
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </span>
      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-secondary px-2 py-1 text-caption text-white shadow-lg ${positionClasses[side]}`}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
