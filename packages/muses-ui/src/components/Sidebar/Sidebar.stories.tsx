import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LayoutDashboard,
  Workflow,
  Database,
  Settings,
  FileText,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Sidebar, type SidebarNavItem } from "./Sidebar";

const items: SidebarNavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Automations", icon: Workflow },
  { label: "Data Sources", icon: Database },
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings },
];

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
  args: {
    serviceName: "CPR Automation",
    version: "1.2.3",
    items,
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  render: (args) => (
    <div className="h-[520px]">
      <Sidebar {...args} collapsed={false} />
    </div>
  ),
};

export const Collapsed: Story = {
  render: (args) => (
    <div className="h-[520px]">
      <Sidebar {...args} collapsed />
    </div>
  ),
};

export const Toggleable: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="h-[520px]">
        <Sidebar {...args} collapsed={collapsed} />
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="absolute left-[280px] top-4 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text-main hover:bg-slate-50"
          style={{ left: collapsed ? 92 : 280 }}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    );
  },
};
