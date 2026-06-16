import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LayoutDashboard,
  Workflow,
  Database,
  Settings,
  FileText,
  Users,
  KeyRound,
  Activity,
  Plug,
} from "lucide-react";
import { Sidebar, type SidebarEntry } from "./Sidebar";

const items: SidebarEntry[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  {
    label: "Operations",
    items: [
      { label: "Automations", icon: Workflow },
      { label: "Data Sources", icon: Database },
      { label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { label: "Activity", icon: Activity },
      { label: "Integrations", icon: Plug },
    ],
  },
  {
    label: "Settings",
    defaultOpen: false,
    items: [
      { label: "Members", icon: Users },
      { label: "API Keys", icon: KeyRound },
      { label: "Preferences", icon: Settings },
    ],
  },
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
  decorators: [
    (Story) => (
      <div className="relative h-[560px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Uncontrolled — click the toggle icon in the header to collapse/expand. */
export const Default: Story = {};

export const Collapsed: Story = { args: { defaultCollapsed: true } };

export const FlatItemsOnly: Story = {
  args: {
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Automations", icon: Workflow },
      { label: "Data Sources", icon: Database },
      { label: "Settings", icon: Settings },
    ],
  },
};
