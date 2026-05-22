import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "accent", "secondary", "ghost", "outline", "danger", "link"] },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Start visit",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Accent: Story = { args: { variant: "accent", children: "Join now" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Cancel" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Dismiss" } };
export const Outline: Story = { args: { variant: "outline", children: "More options" } };
export const Danger: Story = { args: { variant: "danger", children: "Escalate" } };
export const Link: Story = { args: { variant: "link", children: "View patient history" } };
export const Loading: Story = { args: { loading: true, children: "Saving" } };
export const Disabled: Story = { args: { disabled: true, children: "Unavailable" } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: { children: <>Continue <ArrowRight className="h-3.5 w-3.5" /></> },
};
