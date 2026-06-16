import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Enter text…" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = { args: { defaultValue: "Counterpoint" } };

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Disabled" },
};

export const WithLabel: Story = {
  render: (args) => (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-text-main">Workspace name</span>
      <Input {...args} placeholder="e.g. CPR Automation" />
      <span className="text-xs font-medium text-text-muted">
        Shown in the sidebar header.
      </span>
    </label>
  ),
};
