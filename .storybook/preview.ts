import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "hsl(220 20% 98%)" },
        { name: "surface", value: "hsl(0 0% 100%)" },
        { name: "dark", value: "hsl(222 47% 7%)" },
      ],
    },
    layout: "centered",
  },
  globalTypes: {
    theme: {
      description: "Theme (drives the `dark` class on <html>)",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", ctx.globals.theme === "dark");
      }
      return Story();
    },
  ],
};

export default preview;
