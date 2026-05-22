import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about our custom font-size scale so size classes
// (text-body, text-title, etc.) don't collide with text-color classes
// (text-fg-inverse, text-accent-fg, etc.). Without this, twMerge treats both
// as "text-*" and drops one — which is what was making white text on
// dark/primary buttons disappear.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "overline",
            "label",
            "body-sm",
            "body",
            "body-lg",
            "title",
            "title-lg",
            "display-sm",
            "display",
            "metric",
            "metric-sm",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
