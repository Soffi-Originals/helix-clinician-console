import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const progressVariants = cva("relative w-full overflow-hidden bg-bg-subtle", {
  variants: {
    size: {
      sm: "h-1 rounded-full",
      md: "h-2 rounded-full",
      lg: "h-3 rounded-md",
    },
    tone: {
      accent: "[&>span]:bg-accent",
      success: "[&>span]:bg-success",
      warning: "[&>span]:bg-warning",
      danger: "[&>span]:bg-danger",
      neutral: "[&>span]:bg-fg-secondary",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "accent",
  },
});

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, size, tone, value, max = 100, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        className={cn(progressVariants({ size, tone }), className)}
        {...props}
      >
        <span className="block h-full transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { progressVariants };
