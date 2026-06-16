import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Automation Job</CardTitle>
          <Badge status="success">Done</Badge>
        </div>
        <CardDescription>Daily price-tracker crawl</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-extrabold text-text-main">1,284</p>
        <p className="text-sm text-text-muted">records processed</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">View report</Button>
        <Button size="sm" variant="secondary">
          Re-run
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  args: { interactive: true },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Hover me</CardTitle>
        <CardDescription>Brand-tinted shadow lifts on hover.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-main">
          Use <code>interactive</code> for clickable cards.
        </p>
      </CardContent>
    </Card>
  ),
};
