import cn from "clsx";
import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  heading?: string;
  description?: string;
}

export function Card({ heading, description, className, children, ...props }: CardProps) {
  return (
    <section
      className={cn("rounded-xl border border-borderDivider bg-white p-6 shadow-sm", className)}
      {...props}
    >
      {(heading || description) && (
        <header className="mb-4 space-y-1">
          {heading ? (
            <h2 className="text-header font-semibold text-textPrimary">{heading}</h2>
          ) : null}
          {description ? <p className="text-body text-textSecondary">{description}</p> : null}
        </header>
      )}
      {children}
    </section>
  );
}
