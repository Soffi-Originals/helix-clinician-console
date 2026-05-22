import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          canvas: "hsl(var(--bg-canvas) / <alpha-value>)",
          surface: "hsl(var(--bg-surface) / <alpha-value>)",
          "surface-hover": "hsl(var(--bg-surface-hover) / <alpha-value>)",
          subtle: "hsl(var(--bg-subtle) / <alpha-value>)",
          inverse: "hsl(var(--bg-inverse) / <alpha-value>)",
          glass: "hsl(var(--bg-glass) / <alpha-value>)",
        },
        fg: {
          primary: "hsl(var(--fg-primary) / <alpha-value>)",
          secondary: "hsl(var(--fg-secondary) / <alpha-value>)",
          tertiary: "hsl(var(--fg-tertiary) / <alpha-value>)",
          inverse: "hsl(var(--fg-inverse) / <alpha-value>)",
          "on-accent": "hsl(var(--fg-on-accent) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--border-default) / 0.08)",
          subtle: "hsl(var(--border-subtle) / 0.04)",
          strong: "hsl(var(--border-strong) / 0.15)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          hover: "hsl(var(--accent-hover) / <alpha-value>)",
          strong: "hsl(var(--accent-strong) / <alpha-value>)",
          subtle: "hsl(var(--accent-subtle) / <alpha-value>)",
          fg: "hsl(var(--accent-fg) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          subtle: "hsl(var(--success-subtle) / <alpha-value>)",
          fg: "hsl(var(--success-fg) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          subtle: "hsl(var(--warning-subtle) / <alpha-value>)",
          fg: "hsl(var(--warning-fg) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",
          subtle: "hsl(var(--danger-subtle) / <alpha-value>)",
          fg: "hsl(var(--danger-fg) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          subtle: "hsl(var(--info-subtle) / <alpha-value>)",
          fg: "hsl(var(--info-fg) / <alpha-value>)",
        },
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        pill: "var(--radius-pill)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        overline: ["var(--text-overline)", { lineHeight: "1rem", letterSpacing: "0.1em" }],
        label: ["var(--text-label)", { lineHeight: "1.125rem", letterSpacing: "0.02em" }],
        "body-sm": ["var(--text-body-sm)", { lineHeight: "1.25rem" }],
        body: ["var(--text-body)", { lineHeight: "1.5rem" }],
        "body-lg": ["var(--text-body-lg)", { lineHeight: "1.625rem" }],
        title: ["var(--text-title)", { lineHeight: "1.625rem", letterSpacing: "-0.01em" }],
        "title-lg": ["var(--text-title-lg)", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "display-sm": ["var(--text-display-sm)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        display: ["var(--text-display)", { lineHeight: "1", letterSpacing: "-0.04em" }],
        metric: ["var(--text-metric)", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "metric-sm": ["var(--text-metric-sm)", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        tighter: "var(--tracking-tighter)",
        tight: "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide: "var(--tracking-wide)",
        widest: "var(--tracking-widest)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        card: "var(--shadow-card)",
        float: "var(--shadow-float)",
        lift: "var(--shadow-lift)",
        pill: "var(--shadow-pill)",
        "glow-accent": "var(--shadow-glow-accent)",
        focus: "var(--shadow-focus)",
      },
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
