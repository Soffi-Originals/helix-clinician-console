"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

const navVariants = cva(
  "fixed left-1/2 -translate-x-1/2 z-50 flex items-center backdrop-blur-glass border",
  {
    variants: {
      surface: {
        glass: "bg-bg-glass/75 border-white/40 shadow-float",
        solid: "bg-bg-surface border-border shadow-card",
      },
      width: {
        snug: "max-w-[860px]",
        wide: "max-w-[1100px]",
      },
      offset: {
        floating: "top-4 rounded-pill px-2 py-2 gap-1",
        flush: "top-0 rounded-none px-6 py-3 gap-3 left-0 right-0 translate-x-0 max-w-full",
      },
    },
    defaultVariants: {
      surface: "glass",
      width: "snug",
      offset: "floating",
    },
  }
);

export interface FloatingNavProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navVariants> {}

const items = [
  { href: "/", label: "Today" },
  { href: "/patients", label: "Patients" },
  { href: "/visits", label: "Visits" },
  { href: "/notes", label: "Notes" },
  { href: "/labs", label: "Labs" },
] as const;

export function FloatingNav({ surface, width, offset, className, ...props }: FloatingNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(navVariants({ surface, width, offset }), "w-[calc(100%-2rem)]", className)}
      {...props}
    >
      <Link
        href="/"
        className="flex items-center gap-2 pl-2 pr-3 h-9 rounded-pill hover:bg-bg-surface-hover/60 transition-colors"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fg-primary text-fg-inverse">
          <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
            <path d="M4 4c2.5 1.5 5.5 6 5.5 6S6.5 14.5 4 16M16 4c-2.5 1.5-5.5 6-5.5 6s3 4.5 5.5 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        </span>
        <span className="font-display text-body font-semibold tracking-tight">Helix</span>
      </Link>

      <div className="flex items-center gap-0.5 mx-auto">
        {items.map((it) => {
          const active = it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              data-active={active}
              className={cn(
                "px-3 h-9 inline-flex items-center rounded-pill text-body-sm text-fg-secondary transition-colors",
                "hover:text-fg-primary hover:bg-bg-surface-hover/60",
                "data-[active=true]:bg-fg-primary data-[active=true]:text-fg-inverse"
              )}
            >
              {it.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-1 pr-1">
        <ThemeToggle />
        <Button variant="accent" size="icon" fullWidth={false} className="hidden sm:inline-flex">
          New visit
        </Button>
        <Avatar size="sm" tone="danger" ring="soft" shape="square" initials="DP" />
      </div>
    </nav>
  );
}

export { navVariants };
