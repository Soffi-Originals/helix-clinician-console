import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabsVariant = "underline" | "pill" | "segmented";

function TabsDemo({ variant }: { variant: TabsVariant }) {
  return (
    <div className="w-96">
      <Tabs defaultValue="overview">
        <TabsList variant={variant}>
          <TabsTrigger value="overview" variant={variant}>Overview</TabsTrigger>
          <TabsTrigger value="biomarkers" variant={variant}>Biomarkers</TabsTrigger>
          <TabsTrigger value="visits" variant={variant}>Visits</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="text-body-sm text-fg-secondary">
            Composite risk score: 64 (high). Last evaluated 8 minutes ago.
          </p>
        </TabsContent>
        <TabsContent value="biomarkers">
          <p className="text-body-sm text-fg-secondary">3 markers out of range. 4 in watch window.</p>
        </TabsContent>
        <TabsContent value="visits">
          <p className="text-body-sm text-fg-secondary">Next visit Wed, May 28 · Dr. Patel</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const meta = {
  title: "UI/Tabs",
  component: TabsDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["underline", "pill", "segmented"] satisfies TabsVariant[] },
  },
  args: { variant: "underline" },
} satisfies Meta<typeof TabsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = { args: { variant: "underline" } };
export const Pill: Story = { args: { variant: "pill" } };
export const Segmented: Story = { args: { variant: "segmented" } };
