import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sparklineVariants = cva("block", {
  variants: {
    tone: {
      accent: "text-accent",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      neutral: "text-fg-secondary",
    },
    size: {
      sm: "h-6",
      md: "h-10",
      lg: "h-16",
    },
  },
  defaultVariants: {
    tone: "accent",
    size: "md",
  },
});

export interface SparklineProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "fill">,
    VariantProps<typeof sparklineVariants> {
  data: number[];
  fillArea?: boolean;
}

export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  ({ className, tone, size, data, fillArea = true, ...props }, ref) => {
    if (data.length < 2) return null;
    const width = 120;
    const height = 40;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1);
    const points = data
      .map((v, i) => `${i * step},${height - ((v - min) / range) * height}`)
      .join(" ");
    const areaPath = `M0,${height} L${points.replace(/ /g, " L")} L${width},${height} Z`;

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className={cn(sparklineVariants({ tone, size }), "w-full", className)}
        {...props}
      >
        {fillArea ? <path d={areaPath} fill="currentColor" fillOpacity={0.12} /> : null}
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);
Sparkline.displayName = "Sparkline";

export { sparklineVariants };
