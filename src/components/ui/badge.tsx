import cn from "clsx";
import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "solid" | "ghost";
}

const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  outline: "border border-borderDivider text-caption text-textSecondary",
  solid: "bg-accent-strong text-caption font-semibold text-white",
  ghost: "text-caption text-accent-strong",
};

export function Badge({ variant = "outline", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-md px-2 py-0.5", styles[variant], className)}
      {...props}
    />
  );
}
