import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/components/ui/separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    tone: { control: "select", options: ["default", "subtle", "strong"] },
  },
  args: { orientation: "horizontal", tone: "default" },
  render: (args) => (
    <div className={args.orientation === "vertical" ? "h-32 flex" : "w-80"}>
      <Separator {...args} />
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Subtle: Story = { args: { tone: "subtle" } };
export const Strong: Story = { args: { tone: "strong" } };
export const Vertical: Story = { args: { orientation: "vertical" } };
