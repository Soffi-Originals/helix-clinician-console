import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const meta = {
  title: "Layout/ThemeToggle",
  component: ThemeToggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  render: () => (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <span className="text-body-sm text-fg-secondary">
        Toggles the <code className="font-mono">.dark</code> class on{" "}
        <code className="font-mono">&lt;html&gt;</code>
      </span>
    </div>
  ),
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
