import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "@/components/ui/stat-card";

const meta = {
  title: "Clinical/StatCard",
  component: StatCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    trend: { control: "select", options: ["up", "down", "flat"] },
    tone: { control: "select", options: ["neutral", "success", "warning", "danger", "accent"] },
    layout: { control: "select", options: ["stacked", "inline", "hero"] },
    align: { control: "select", options: ["start", "center"] },
    surface: { control: "select", options: ["card", "ghost", "glass", "bare"] },
    loading: { control: "boolean" },
  },
  args: {
    label: "Active panel",
    value: "248",
    unit: "members",
    delta: "+6 wk/wk",
    trend: "up",
    tone: "neutral",
    hint: "vs. 242 last week",
    layout: "hero",
    surface: "card",
    loading: false,
  },
  render: (args) => (
    <div className="w-72">
      <StatCard {...args} />
    </div>
  ),
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Accent: Story = { args: { tone: "accent", value: "87", unit: "sec", label: "Avg response", delta: "−12s", trend: "down" } };
export const Warning: Story = { args: { tone: "warning", value: "14", unit: "panels", label: "Labs pending", delta: "6 stat", trend: "flat" } };
export const Danger: Story = { args: { tone: "danger", value: "3", unit: "open", label: "Critical alerts", delta: "+1 today", trend: "up" } };
export const Glass: Story = { args: { surface: "glass", tone: "accent" } };
export const Bare: Story = { args: { surface: "bare" } };
export const Loading: Story = { args: { loading: true } };
