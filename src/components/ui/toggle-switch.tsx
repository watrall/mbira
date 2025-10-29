"use client";

import { Switch } from "@headlessui/react";
import cn from "clsx";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface ToggleSwitchProps
  extends Omit<ComponentPropsWithoutRef<typeof Switch>, "checked" | "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const ToggleSwitch = forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  ({ checked, onChange, label, className, ...props }, ref) => (
    <Switch
      ref={ref}
      checked={checked}
      onChange={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2",
        checked ? "bg-accent-strong" : "bg-borderDivider",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{label ?? "Toggle"}</span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block size-5 rounded-full bg-white shadow transition",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </Switch>
  ),
);

ToggleSwitch.displayName = "ToggleSwitch";
