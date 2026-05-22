import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "@/components/ui/sparkline";

const meta = {
  title: "Clinical/Sparkline",
  component: Sparkline,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["accent", "success", "warning", "danger", "neutral"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    fillArea: { control: "boolean" },
  },
  args: { data: [55, 60, 64, 70, 75, 80, 84, 86], tone: "danger", size: "md", fillArea: true },
  render: (args) => (
    <div className="w-72">
      <Sparkline {...args} />
    </div>
  ),
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Risk: Story = {};
export const Improving: Story = {
  args: { data: [50, 48, 46, 45, 43, 42, 41, 41], tone: "success" },
};
