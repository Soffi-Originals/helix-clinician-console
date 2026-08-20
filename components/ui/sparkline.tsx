import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

// A stable ID so multiple sparklines on the same page don't share a <defs> id.
let _uid = 0;
function useSparklineId() {
  const [id] = React.useState(() => `sl-${++_uid}`);
  return id;
}

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
    const id = useSparklineId();
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

    // Approximate total path length via segment distances so we can drive
    // the draw-on animation without a DOM ref (works in SSR too).
    const coords = data.map((v, i) => ({
      x: i * step,
      y: height - ((v - min) / range) * height,
    }));
    const pathLength = coords
      .slice(1)
      .reduce((acc, pt, i) => {
        const prev = coords[i];
        return acc + Math.hypot(pt.x - prev.x, pt.y - prev.y);
      }, 0);

    const lineId = `${id}-line`;

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className={cn(sparklineVariants({ tone, size }), "w-full", className)}
        {...props}
      >
        <defs>
          {/* Clip the fill so it also reveals left-to-right in sync with the line */}
          <clipPath id={`${id}-clip`}>
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              style={{
                animation: "sparkline-reveal 0.9s cubic-bezier(0.4,0,0.2,1) both",
              }}
            />
          </clipPath>
        </defs>

        {fillArea ? (
          <path
            d={areaPath}
            fill="currentColor"
            fillOpacity={0.12}
            clipPath={`url(#${id}-clip)`}
          />
        ) : null}

        <polyline
          id={lineId}
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            animation: "sparkline-draw 0.9s cubic-bezier(0.4,0,0.2,1) both",
          }}
        />
      </svg>
    );
  }
);
Sparkline.displayName = "Sparkline";

export { sparklineVariants };
