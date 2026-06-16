import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LayoutDashboard,
  Workflow,
  Database,
  FileText,
  Settings,
} from "lucide-react";
import { Sidebar, type SidebarEntry } from "../components/Sidebar/Sidebar";
import { Header } from "../components/Header/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/Card/Card";
import { Badge } from "../components/Badge/Badge";
import { Button } from "../components/Button/Button";

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
    label: "Settings",
    defaultOpen: false,
    items: [{ label: "Preferences", icon: Settings }],
  },
];

const meta = {
  title: "Layout/AppShell",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full page composition: Sidebar + sticky Header + content. Resize to <1024px to see the mobile overlay drawer (use the menu button).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar
          serviceName="storybook"
          version="1.2.3"
          items={items}
          profile={{
            name: "Kevin Lim",
            email: "kevin.lim@counterpointresearch.com",
          }}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div
          className={`flex min-h-screen flex-1 flex-col transition-[margin] duration-300 ${
            collapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"
          }`}
        >
          <Header
            breadcrumbs={[
              { label: "Home", href: "#" },
              { label: "Automations", href: "#" },
              { label: "Daily Crawl" },
            ]}
            onMenuClick={() => setMobileOpen(true)}
            actions={
              <>
                <Button size="sm" variant="secondary">
                  Export
                </Button>
                <Button size="sm">New job</Button>
              </>
            }
          />

          <main className="flex-1 p-4 sm:p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-text-main">Dashboard</h1>
              <p className="text-sm text-text-muted">
                Overview of your automation jobs.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { title: "Daily Crawl", status: "success" as const, value: "1,284" },
                { title: "Price Sync", status: "warning" as const, value: "312" },
                { title: "Report Gen", status: "danger" as const, value: "0" },
              ].map((job) => (
                <Card key={job.title} interactive>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{job.title}</CardTitle>
                      <Badge status={job.status}>
                        {job.status === "success"
                          ? "Done"
                          : job.status === "warning"
                            ? "Pending"
                            : "Failed"}
                      </Badge>
                    </div>
                    <CardDescription>Last run 2h ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-extrabold text-text-main">
                      {job.value}
                    </p>
                    <p className="text-sm text-text-muted">records processed</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  },
};
