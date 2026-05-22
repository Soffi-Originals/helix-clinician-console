import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium whitespace-nowrap tracking-wide transition-colors",
  {
    variants: {
      variant: {
        neutral: "bg-bg-surface-hover text-fg-secondary border border-border",
        accent: "bg-accent-subtle text-accent-strong border border-accent/30",
        success: "bg-success-subtle text-success-fg border border-success/30",
        warning: "bg-warning-subtle text-warning-fg border border-warning/30",
        danger: "bg-danger-subtle text-danger-fg border border-danger/30",
        info: "bg-info-subtle text-info-fg border border-info/30",
        solid: "bg-fg-primary text-fg-inverse border border-fg-primary",
        overline: "bg-transparent text-accent-strong border border-transparent uppercase",
      },
      size: {
        sm: "h-5 px-2 text-overline",
        md: "h-6 px-2.5 text-label",
        lg: "h-7 px-3 text-body-sm",
      },
      shape: {
        pill: "rounded-pill",
        rect: "rounded-sm",
      },
      interactive: {
        true: "cursor-pointer hover:brightness-95 focus-visible:outline-none focus-visible:shadow-focus",
        false: "",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
      shape: "pill",
      interactive: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, shape, interactive, dot, children, ...props }, ref) => (
    <span
      ref={ref}
      data-interactive={interactive || undefined}
      tabIndex={interactive ? 0 : undefined}
      className={cn(badgeVariants({ variant, size, shape, interactive }), className)}
      {...props}
    >
      {dot ? <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

export { badgeVariants };
