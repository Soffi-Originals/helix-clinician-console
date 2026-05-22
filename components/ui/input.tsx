import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const inputVariants = cva(
  "flex w-full bg-bg-surface text-fg-primary placeholder:text-fg-tertiary border transition-colors focus-visible:outline-none focus-visible:shadow-focus focus-visible:border-accent disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "border-border",
        ghost: "border-transparent bg-bg-surface-hover",
        glass: "bg-bg-glass/60 backdrop-blur-glass border-white/40",
        invalid: "border-danger focus-visible:border-danger focus-visible:shadow-[0_0_0_3px_hsl(var(--danger)/0.25)]",
      },
      size: {
        sm: "h-9 px-3 text-body-sm rounded-pill",
        md: "h-10 px-4 text-body rounded-pill",
        lg: "h-12 px-5 text-body-lg rounded-pill",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { inputVariants };
