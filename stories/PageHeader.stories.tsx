import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    align: { control: "select", options: ["start", "center"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    overline: "Friday · May 22, 2026",
    title: "Health isn't reactive. It's predictive.",
    description:
      "14 active members on your panel today. 3 anomalies the AI surfaced overnight. 2 of them need a clinician in the next four hours.",
    align: "start",
    size: "md",
  },
  render: (args) => (
    <div className="w-[960px]">
      <PageHeader
        {...args}
        meta={
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Badge variant="accent" size="md" dot>3 AI-flagged</Badge>
            <Badge variant="warning" size="md" dot>14 labs pending</Badge>
            <Badge variant="success" size="md" dot>87s avg response</Badge>
          </div>
        }
        actions={
          <>
            <Button variant="primary" size="lg">Open visit queue</Button>
            <Button variant="secondary" size="lg">Daily brief</Button>
          </>
        }
      />
    </div>
  ),
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Centered: Story = { args: { align: "center" } };
export const Minimal: Story = {
  args: {
    overline: undefined,
    description: undefined,
    title: "Patients",
  },
  render: (args) => (
    <div className="w-[640px]">
      <PageHeader {...args} />
    </div>
  ),
};
