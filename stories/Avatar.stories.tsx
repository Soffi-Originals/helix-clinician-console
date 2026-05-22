import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/components/ui/avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    shape: { control: "select", options: ["circle", "square"] },
    tone: { control: "select", options: ["neutral", "accent", "success", "warning", "danger", "inverse"] },
    ring: { control: "select", options: ["none", "soft", "accent"] },
    status: { control: "select", options: [undefined, "online", "away", "busy", "offline"] },
    interactive: { control: "boolean" },
  },
  args: { initials: "DR", size: "lg", shape: "circle", tone: "accent", ring: "none", interactive: false },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithRing: Story = { args: { ring: "accent" } };
export const Online: Story = { args: { status: "online" } };
export const Busy: Story = { args: { status: "busy", tone: "danger", initials: "TA" } };
export const Interactive: Story = { args: { interactive: true, ring: "soft" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar initials="XS" size="xs" tone="accent" />
      <Avatar initials="SM" size="sm" tone="accent" />
      <Avatar initials="MD" size="md" tone="accent" />
      <Avatar initials="LG" size="lg" tone="accent" />
      <Avatar initials="XL" size="xl" tone="accent" />
      <Avatar initials="2XL" size="2xl" tone="accent" />
    </div>
  ),
};

export const Statuses: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar initials="ON" tone="accent" status="online" />
      <Avatar initials="AW" tone="warning" status="away" />
      <Avatar initials="BS" tone="danger" status="busy" />
      <Avatar initials="OF" tone="neutral" status="offline" />
    </div>
  ),
};
