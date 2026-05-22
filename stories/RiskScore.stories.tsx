import type { Meta, StoryObj } from "@storybook/react";
import { RiskScore } from "@/components/ui/risk-score";

const meta = {
  title: "Clinical/RiskScore",
  component: RiskScore,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    level: { control: "select", options: ["low", "moderate", "high", "critical"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    layout: { control: "select", options: ["inline", "chip"] },
    showBar: { control: "boolean" },
  },
  args: { score: 64, level: "high", size: "md", showBar: true },
} satisfies Meta<typeof RiskScore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Low: Story = { args: { score: 18, level: "low" } };
export const Moderate: Story = { args: { score: 41, level: "moderate" } };
export const High: Story = { args: { score: 64, level: "high" } };
export const Critical: Story = { args: { score: 86, level: "critical" } };

export const Levels: Story = {
  render: () => (
    <div className="flex flex-col gap-2 items-start">
      <RiskScore score={18} level="low" showBar />
      <RiskScore score={41} level="moderate" showBar />
      <RiskScore score={64} level="high" showBar />
      <RiskScore score={86} level="critical" showBar />
    </div>
  ),
};
