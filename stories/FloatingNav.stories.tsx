import type { Meta, StoryObj } from "@storybook/react";
import { FloatingNav } from "@/components/layout/floating-nav";

const meta = {
  title: "Layout/FloatingNav",
  component: FloatingNav,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/" },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    surface: { control: "select", options: ["glass", "solid"] },
    width: { control: "select", options: ["snug", "wide"] },
    offset: { control: "select", options: ["floating", "flush"] },
  },
  args: {
    surface: "glass",
    width: "snug",
    offset: "floating",
  },
  render: (args) => (
    <div className="relative min-h-[280px] bg-bg-canvas">
      <FloatingNav {...args} />
    </div>
  ),
} satisfies Meta<typeof FloatingNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {};
export const Solid: Story = { args: { surface: "solid" } };
export const Wide: Story = { args: { width: "wide" } };
export const Flush: Story = { args: { offset: "flush" } };

export const PatientsActive: Story = {
  args: { surface: "glass" },
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: "/patients" } },
  },
};
