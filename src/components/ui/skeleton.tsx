import cn from "clsx";
import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-borderDivider/60", className)} {...props} />
  );
}
