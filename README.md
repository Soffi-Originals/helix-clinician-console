# Helix · Clinician Console

A vibe-coded demo app for early Soffi users. A serious B2B health-tech surface — the
"product side" of the [demo-marketing-site](../demo-marketing-site) AI health platform.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v3** with class-based dark mode
- **Semantic tokens** as CSS custom properties — every color, border, type ramp, radius, and
  shadow is editable from the Soffi UI
- **class-variance-authority** for typed component variants (Soffi's AST inspector
  reads these to populate the props panel)
- **Storybook 8** for component documentation
- **lucide-react** icons

## Run

```bash
pnpm dev        # http://localhost:3000
pnpm storybook  # http://localhost:6006
pnpm build      # production build
```

## Routes

| Route             | What it is                                                   |
| ----------------- | ------------------------------------------------------------ |
| `/`               | Overview · KPIs, AI-flagged events, visit queue, lab sign-off |
| `/patients`       | Patient panel · sortable table with risk + trend sparkline   |
| `/patients/[id]`  | Patient detail · tabs for biomarkers, visits, prescriptions, notes |
| `/visits`         | Live + scheduled virtual visit queue                         |

## Design system

### Semantic tokens (`app/globals.css`)

All visual values are CSS custom properties defined on `:root` and overridden on `.dark`.
Theme is class-driven — toggle `class="dark"` on `<html>` (or any ancestor) to switch.

```css
:root  { --bg-canvas: 220 20% 98%; --accent: 217 91% 50%; ... }
.dark  { --bg-canvas: 222 47% 7%;  --accent: 217 91% 60%; ... }
```

Token groups: surfaces (`bg-*`), foreground (`fg-*`), borders (`border-*`),
accent, status (`success`/`warning`/`danger`/`info`), radii, typography ramp,
shadows, layout spacing.

Tailwind utilities consume them via `theme.extend` in [`tailwind.config.ts`](tailwind.config.ts) —
so `bg-bg-surface`, `text-fg-primary`, `border-border`, `text-accent`, etc. all
resolve to the live CSS variables (with `<alpha-value>` support for opacity).

### Components (CVA)

Each primitive uses [class-variance-authority](https://cva.style/) so Soffi's AST
inspector can extract variant options:

| Component  | File                                  | Variants                                           |
| ---------- | ------------------------------------- | -------------------------------------------------- |
| `Button`   | `components/ui/button.tsx`            | `variant`, `size`, `fullWidth`, `loading`          |
| `Card`     | `components/ui/card.tsx`              | `variant`, `padding`, `radius`, `tone`             |
| `Badge`    | `components/ui/badge.tsx`             | `variant`, `size`, `shape`, `dot`                  |
| `Input`    | `components/ui/input.tsx`             | `variant`, `size`                                  |
| `Avatar`   | `components/ui/avatar.tsx`            | `size`, `shape`, `tone`                            |
| `Tabs`     | `components/ui/tabs.tsx`              | `variant` (underline/pill/segmented)               |
| `Table`    | `components/ui/table.tsx`             | `density`, `variant`                               |
| `Progress` | `components/ui/progress.tsx`          | `size`, `tone`                                     |
| `Separator`| `components/ui/separator.tsx`         | `orientation`, `tone`                              |
| `Sparkline`| `components/ui/sparkline.tsx`         | `tone`, `size`, `fillArea`                         |
| `StatCard` | `components/ui/stat-card.tsx`         | `align`, `density`, `tone`, `trend`                |
| `RiskScore`| `components/ui/risk-score.tsx`        | `level`, `size`, `layout`, `showBar`               |
| `Sidebar`  | `components/layout/sidebar.tsx`       | `width`                                            |
| `TopBar`   | `components/layout/topbar.tsx`        | `density`                                          |

All variant props are **typed unions** (via `VariantProps<typeof xxxVariants>`) so:

1. TypeScript can autocomplete them at the JSX call site
2. Soffi's AST inspector extracts them in Phase 2 of `ast-inspect/route.ts`
3. Soffi's CVA extractor reads the `cva()` config in Phase 3

### Layout philosophy

Everything sits inside flexboxes wherever practical. Pages compose with `flex flex-col gap-*`
and rows with `flex items-center gap-*`, so Soffi users can re-order and re-arrange via the editor.

## Theming

```ts
// Anywhere in client code:
document.documentElement.classList.toggle("dark");
```

The `ThemeToggle` component in the topbar wraps that one line. Because every color
references a `--token` variable, the theme switch is instantaneous and lossless.

## Storybook integration

Stories live in `stories/*.stories.tsx` and reference components by their canonical import
path. The `manifest.ts` Soffi expects can map directly to these story file paths:

```
Button       → stories/Button.stories.tsx
Card         → stories/Card.stories.tsx
Badge        → stories/Badge.stories.tsx
Input        → stories/Input.stories.tsx
Avatar       → stories/Avatar.stories.tsx
Tabs         → stories/Tabs.stories.tsx
Progress     → stories/Progress.stories.tsx
Sparkline    → stories/Sparkline.stories.tsx
StatCard     → stories/StatCard.stories.tsx
RiskScore    → stories/RiskScore.stories.tsx
```

A Storybook theme toolbar toggles the `.dark` class on the root so token edits can be
previewed in both themes from inside Storybook.

- Jake wanted to test 

## Notes for Soffi users

- Drag-rearrange-friendly: the dashboards are built from flexbox sections you can re-order.
- Every color in the UI traces back to a single token in `app/globals.css` — change one
  variable, see it propagate everywhere.
- Adding a new variant: extend the `cva()` config in the component file. Soffi will
  pick up the new option automatically on the next AST inspect.
