import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: "Maya Okafor", mrn: "MRN-48201", program: "Longevity", status: "Stable" },
  { name: "Daniel Reyes", mrn: "MRN-48227", program: "Cardio", status: "High risk" },
  { name: "Iris Vance", mrn: "MRN-48280", program: "Metabolic", status: "Watch" },
  { name: "Theodore Akiyama", mrn: "MRN-48266", program: "Cardio", status: "Critical" },
];

const meta = {
  title: "UI/Table",
  component: Table,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    density: { control: "select", options: ["compact", "cozy", "comfortable"] },
    variant: { control: "select", options: ["default", "striped", "bordered"] },
  },
  args: { density: "cozy", variant: "default" },
  render: (args) => (
    <div className="w-[640px]">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>MRN</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow key={p.mrn}>
              <TableCell><span className="font-medium">{p.name}</span></TableCell>
              <TableCell className="font-mono text-fg-tertiary">{p.mrn}</TableCell>
              <TableCell>{p.program}</TableCell>
              <TableCell>
                <Badge
                  size="sm"
                  variant={
                    p.status === "Critical"
                      ? "danger"
                      : p.status === "High risk"
                      ? "warning"
                      : p.status === "Watch"
                      ? "info"
                      : "success"
                  }
                  dot
                >
                  {p.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Striped: Story = { args: { variant: "striped" } };
export const Bordered: Story = { args: { variant: "bordered" } };
export const Compact: Story = { args: { density: "compact" } };
export const Comfortable: Story = { args: { density: "comfortable" } };
