import cn from "clsx";
import type { HTMLAttributes } from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}

const toneClasses: Record<NonNullable<TagProps["tone"]>, string> = {
  neutral: "bg-systemNeutral/15 text-systemNeutral",
  accent: "bg-accent/10 text-accent",
  success: "bg-systemSuccess/10 text-systemSuccess",
  warning: "bg-systemWarning/10 text-systemWarning",
  danger: "bg-systemDanger/10 text-systemDanger",
};

export function Tag({ tone = "neutral", className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-caption font-medium",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
