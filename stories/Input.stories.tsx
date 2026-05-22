import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "ghost", "glass", "invalid"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: { placeholder: "Search by name, MRN, marker…" },
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Ghost: Story = { args: { variant: "ghost" } };
export const Glass: Story = { args: { variant: "glass" } };
export const Invalid: Story = { args: { variant: "invalid", defaultValue: "abcd" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Read only" } };
