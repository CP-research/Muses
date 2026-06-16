import type { Meta, StoryObj } from "@storybook/react-vite";

const tokens = [
  { name: "background", value: "#F8FAFC", cls: "bg-background", note: "Page background (Slate 50)" },
  { name: "surface", value: "#FFFFFF", cls: "bg-surface", note: "Card / panel background" },
  { name: "primary", value: "#EE1C24", cls: "bg-primary", note: "Brand primary (Red)" },
  { name: "secondary", value: "#913134", cls: "bg-secondary", note: "Brand secondary (Dark Red)" },
  { name: "text-main", value: "#000000", cls: "bg-text-main", note: "Body text" },
  { name: "text-muted", value: "#717171", cls: "bg-text-muted", note: "Secondary text" },
  { name: "accent", value: "#10B981", cls: "bg-accent", note: "Success / positive" },
  { name: "border", value: "#E2E2E2", cls: "bg-border", note: "Borders" },
];

const statuses = [
  { label: "Draft", bg: "bg-slate-100", text: "text-slate-700" },
  { label: "Warning", bg: "bg-amber-100", text: "text-amber-700" },
  { label: "Danger", bg: "bg-red-100", text: "text-red-700" },
  { label: "Success", bg: "bg-emerald-100", text: "text-emerald-700" },
  { label: "Info", bg: "bg-blue-100", text: "text-blue-700" },
];

const meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {
  render: () => (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-lg font-bold text-text-main">Semantic tokens</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tokens.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-surface p-3">
              <div className={`h-16 w-full rounded-lg border border-border ${t.cls}`} />
              <p className="mt-2 text-sm font-semibold text-text-main">{t.name}</p>
              <p className="font-mono text-xs text-text-muted">{t.value}</p>
              <p className="mt-1 text-xs text-text-muted">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-text-main">Status colors</h2>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <span
              key={s.label}
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </section>
    </div>
  ),
};
