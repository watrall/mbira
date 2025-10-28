"use client";

import cn from "clsx";
import type { ReactNode } from "react";

export interface FormFieldProps {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  description,
  error,
  required = false,
  className,
  children,
}: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-body font-medium text-textPrimary"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-systemDanger">
            *
          </span>
        ) : null}
      </label>
      <div aria-describedby={error ? errorId : descriptionId}>{children}</div>
      {description && !error ? (
        <p id={descriptionId} className="text-caption text-textSecondary">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-caption text-systemDanger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
