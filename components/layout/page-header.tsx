import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const pageHeaderVariants = cva("flex flex-col gap-3", {
  variants: {
    align: {
      start: "items-start text-left",
      center: "items-center text-center max-w-3xl mx-auto",
    },
    size: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
  },
  defaultVariants: {
    align: "start",
    size: "md",
  },
});

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageHeaderVariants> {
  overline?: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({
  className,
  align,
  size,
  overline,
  title,
  description,
  meta,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col md:flex-row md:items-end md:justify-between gap-6",
        className
      )}
      {...props}
    >
      <div className={cn(pageHeaderVariants({ align, size }))}>
        {overline ? (
          <span className="text-overline uppercase tracking-widest font-semibold text-warning-DEFAULT">
            {overline}
          </span>
        ) : null}
        <h1 className="font-display text-display-sm md:text-display font-semibold tracking-tighter text-fg-primary text-balance">
          {title}
        </h1>
        {description ? (
          <p className="text-body-lg text-fg-secondary max-w-2xl">{description}</p>
        ) : null}
        {meta}
      </div>

      {actions ? <div className="flex items-center gap-2 shrink-0">{actions}</div> : null}
    </header>
  );
}

export { pageHeaderVariants };
