import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@/components/ui/progress";

const meta = {
  title: "UI/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["accent", "success", "warning", "danger", "neutral"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  args: { value: 72, size: "md", tone: "accent" },
  render: (args) => (
    <div className="w-72">
      <Progress {...args} />
    </div>
  ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AdherenceSet: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Progress value={94} tone="success" />
      <Progress value={71} tone="accent" />
      <Progress value={52} tone="warning" />
      <Progress value={18} tone="danger" />
    </div>
  ),
};
