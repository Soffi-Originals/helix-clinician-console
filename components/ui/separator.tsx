import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
    tone: {
      default: "bg-border",
      subtle: "bg-border-subtle",
      strong: "bg-border-strong",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    tone: "default",
  },
});

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation, tone, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation ?? "horizontal"}
      className={cn(separatorVariants({ orientation, tone }), className)}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { separatorVariants };
