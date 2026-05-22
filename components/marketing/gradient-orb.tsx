import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const gradientOrbVariants = cva(
  "absolute pointer-events-none rounded-full blur-3xl",
  {
    variants: {
      tone: {
        accent: "bg-accent/30",
        accentSoft: "bg-accent/15",
        coral: "bg-danger/15",
        success: "bg-success/20",
      },
      size: {
        sm: "h-48 w-48",
        md: "h-80 w-80",
        lg: "h-[28rem] w-[28rem]",
        xl: "h-[40rem] w-[40rem]",
      },
    },
    defaultVariants: {
      tone: "accent",
      size: "lg",
    },
  }
);

export interface GradientOrbProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientOrbVariants> {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export function GradientOrb({
  className,
  tone,
  size,
  top,
  left,
  right,
  bottom,
  style,
  ...props
}: GradientOrbProps) {
  return (
    <div
      aria-hidden
      className={cn(gradientOrbVariants({ tone, size }), className)}
      style={{ top, left, right, bottom, ...style }}
      {...props}
    />
  );
}

export { gradientOrbVariants };
