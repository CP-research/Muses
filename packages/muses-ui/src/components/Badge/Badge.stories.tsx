import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "inline-radio",
      options: ["draft", "warning", "danger", "success", "info"],
    },
  },
  args: { children: "Badge", status: "draft" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Draft: Story = { args: { status: "draft", children: "Draft" } };
export const Warning: Story = { args: { status: "warning", children: "Pending" } };
export const Danger: Story = { args: { status: "danger", children: "Active" } };
export const Success: Story = { args: { status: "success", children: "Done" } };
export const Info: Story = { args: { status: "info", children: "Info" } };

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge status="draft">Draft</Badge>
      <Badge status="warning">Warning</Badge>
      <Badge status="danger">Active</Badge>
      <Badge status="success">Success</Badge>
      <Badge status="info">Info</Badge>
    </div>
  ),
};
