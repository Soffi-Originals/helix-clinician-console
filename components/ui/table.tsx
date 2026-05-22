import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const tableVariants = cva("w-full text-body-sm", {
  variants: {
    density: {
      compact: "[&_td]:py-1.5 [&_th]:py-1.5",
      cozy: "[&_td]:py-2.5 [&_th]:py-2.5",
      comfortable: "[&_td]:py-3.5 [&_th]:py-3.5",
    },
    variant: {
      default: "",
      striped: "[&_tbody_tr:nth-child(even)]:bg-bg-subtle/50",
      bordered: "border border-border [&_td]:border-b [&_td]:border-border-subtle",
    },
  },
  defaultVariants: {
    density: "cozy",
    variant: "default",
  },
});

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, density, variant, ...props }, ref) => (
    <div className="flex w-full overflow-x-auto">
      <table ref={ref} className={cn(tableVariants({ density, variant }), className)} {...props} />
    </div>
  )
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        "text-label-sm uppercase tracking-wide text-fg-tertiary [&_th]:px-3 [&_th]:text-left [&_th]:font-medium [&_th]:border-b [&_th]:border-border",
        className
      )}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_td]:px-3 [&_tr]:border-b [&_tr]:border-border-subtle last:[&_tr]:border-b-0", className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("hover:bg-bg-subtle/60 transition-colors", className)} {...props} />
  )
);
TableRow.displayName = "TableRow";

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("align-middle text-fg-primary", className)} {...props} />
  )
);
TableCell.displayName = "TableCell";

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn("align-middle", className)} {...props} />
  )
);
TableHead.displayName = "TableHead";

export { tableVariants };
