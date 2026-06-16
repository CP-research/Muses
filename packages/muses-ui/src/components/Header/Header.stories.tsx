import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header, Breadcrumb } from "./Header";
import { Button } from "../Button/Button";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  args: {
    breadcrumbs: [
      { label: "Home", href: "#" },
      { label: "Automations", href: "#" },
      { label: "Daily Crawl" },
    ],
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button size="sm" variant="secondary">
          Export
        </Button>
        <Button size="sm">New job</Button>
      </>
    ),
  },
};

export const BreadcrumbOnly: Story = {
  render: () => (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: "Settings", href: "#" },
          { label: "Members" },
        ]}
      />
    </div>
  ),
};
