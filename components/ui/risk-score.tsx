import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const riskScoreVariants = cva(
  "inline-flex items-center font-semibold border rounded-pill",
  {
    variants: {
      level: {
        low: "bg-success-subtle text-success-fg border-success/40",
        moderate: "bg-warning-subtle text-warning-fg border-warning/40",
        high: "bg-danger-subtle text-danger-fg border-danger/40",
        critical: "bg-danger text-fg-inverse border-danger shadow-pill",
      },
      size: {
        sm: "h-6 px-2.5 text-label gap-1.5",
        md: "h-7 px-3 text-body-sm gap-2",
        lg: "h-9 px-4 text-body gap-2.5",
      },
      layout: {
        inline: "",
        chip: "",
      },
    },
    defaultVariants: {
      level: "low",
      size: "md",
      layout: "inline",
    },
  }
);

export interface RiskScoreProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof riskScoreVariants> {
  score: number;
  max?: number;
  showBar?: boolean;
}

export const RiskScore = React.forwardRef<HTMLSpanElement, RiskScoreProps>(
  ({ className, level, size, layout, score, max = 100, showBar, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (score / max) * 100));
    return (
      <span
        ref={ref}
        className={cn(riskScoreVariants({ level, size, layout }), className)}
        {...props}
      >
        <span className="font-mono tabular-nums">{score}</span>
        {showBar ? (
          <span className="ml-1 inline-block h-1 w-14 rounded-full bg-current/20 overflow-hidden">
            <span className="block h-full bg-current" style={{ width: `${pct}%` }} />
          </span>
        ) : null}
      </span>
    );
  }
);
RiskScore.displayName = "RiskScore";

export { riskScoreVariants };
