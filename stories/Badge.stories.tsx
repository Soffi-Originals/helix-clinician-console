import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["neutral", "accent", "success", "warning", "danger", "info", "solid", "overline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    shape: { control: "select", options: ["pill", "rect"] },
    dot: { control: "boolean" },
    interactive: { control: "boolean" },
  },
  args: { children: "Stable", variant: "success", size: "md", dot: true, shape: "pill", interactive: false },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Accent: Story = { args: { variant: "accent", children: "AI flagged", dot: true } };
export const Warning: Story = { args: { variant: "warning", children: "Watch", dot: true } };
export const Danger: Story = { args: { variant: "danger", children: "Critical", dot: true } };
export const Solid: Story = { args: { variant: "solid", children: "New" } };
export const Overline: Story = { args: { variant: "overline", children: "AI Diagnostics", dot: false } };
export const Interactive: Story = { args: { interactive: true, variant: "accent", children: "Filter: AI flagged" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="neutral" dot>Stable</Badge>
      <Badge variant="accent" dot>AI flagged</Badge>
      <Badge variant="success" dot>Optimal</Badge>
      <Badge variant="warning" dot>Watch</Badge>
      <Badge variant="danger" dot>Critical</Badge>
      <Badge variant="info" dot>Pending</Badge>
      <Badge variant="solid">New</Badge>
      <Badge variant="overline">AI Diagnostics</Badge>
    </div>
  ),
};
