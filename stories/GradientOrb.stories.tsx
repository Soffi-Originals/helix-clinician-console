import type { Meta, StoryObj } from "@storybook/react";
import { GradientOrb } from "@/components/marketing/gradient-orb";

const meta = {
  title: "Atmosphere/GradientOrb",
  component: GradientOrb,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["accent", "accentSoft", "coral", "success"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
  args: { tone: "accent", size: "lg", top: "50%", left: "50%" },
  render: (args) => (
    <div className="relative w-[600px] h-[400px] bg-bg-canvas overflow-hidden">
      <GradientOrb
        {...args}
        style={{
          ...args.style,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full text-fg-tertiary">
        <span className="text-label uppercase tracking-widest">Orb preview</span>
      </div>
    </div>
  ),
} satisfies Meta<typeof GradientOrb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {};
export const AccentSoft: Story = { args: { tone: "accentSoft" } };
export const Coral: Story = { args: { tone: "coral" } };
export const Success: Story = { args: { tone: "success" } };
