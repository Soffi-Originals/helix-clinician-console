import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const cardVariants = cva("relative flex flex-col bg-bg-surface text-fg-primary transition-all", {
  variants: {
    variant: {
      default: "shadow-card",
      float: "shadow-float",
      lift: "shadow-lift",
      flat: "shadow-none",
      outlined: "border border-border shadow-none",
      glass: "bg-bg-glass/75 backdrop-blur-glass border border-white/40 shadow-float",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    },
    radius: {
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
    },
    tone: {
      neutral: "",
      accent: "bg-accent-subtle",
      success: "bg-success-subtle",
      warning: "bg-warning-subtle",
      danger: "bg-danger-subtle",
      inverse: "bg-bg-inverse text-fg-inverse",
    },
    interactive: {
      true: "cursor-pointer hover:shadow-float hover:-translate-y-0.5 focus-visible:outline-none focus-visible:shadow-focus active:translate-y-0",
      false: "",
    },
    selected: {
      true: "ring-2 ring-accent ring-offset-2 ring-offset-bg-canvas",
      false: "",
    },
    loading: {
      true: "pointer-events-none [&>*]:opacity-0 before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-r before:from-bg-subtle before:via-bg-surface-hover before:to-bg-subtle before:bg-[length:200%_100%] before:animate-[shimmer_1.4s_ease-in-out_infinite]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    radius: "xl",
    tone: "neutral",
    interactive: false,
    selected: false,
    loading: false,
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, radius, tone, interactive, selected, loading, ...props }, ref) => (
    <div
      ref={ref}
      data-interactive={interactive || undefined}
      data-selected={selected || undefined}
      data-loading={loading || undefined}
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        cardVariants({ variant, padding, radius, tone, interactive, selected, loading }),
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 mb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardOverline = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-overline uppercase tracking-widest text-accent-strong font-semibold", className)}
      {...props}
    />
  )
);
CardOverline.displayName = "CardOverline";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-display text-title-lg font-semibold tracking-tight text-fg-primary", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-body text-fg-secondary", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between mt-6 pt-4 border-t border-border-subtle",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { cardVariants };
