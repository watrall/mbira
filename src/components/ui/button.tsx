"use client";

import { cva, type VariantProps } from "class-variance-authority";
import cn from "clsx";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-body font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-strong text-white shadow-sm hover:bg-accent-contrast focus-visible:ring-offset-bgSidebar",
        secondary:
          "border border-borderDivider bg-white text-textPrimary shadow-sm hover:bg-bgContent focus-visible:ring-offset-bgSidebar",
        subtle:
          "bg-accent-surface text-accent-strong hover:bg-accent-surface/80 focus-visible:ring-offset-bgSidebar",
        ghost:
          "text-textSecondary hover:bg-accent-surface focus-visible:ring-offset-bgSidebar focus-visible:ring-offset-bgSidebar",
        danger:
          "bg-systemDanger text-white shadow-sm hover:bg-systemDanger/90 focus-visible:ring-systemDanger focus-visible:ring-offset-bgSidebar",
      },
      size: {
        sm: "h-8 px-3 text-caption",
        md: "h-10 px-4",
        lg: "h-12 px-5 text-header",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        buttonVariants({ variant, size }),
        loading && "relative cursor-wait opacity-80",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 size-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          role="presentation"
          data-testid="button-spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  ),
);

Button.displayName = "Button";

export { buttonVariants };
