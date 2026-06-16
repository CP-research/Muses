import type { Meta, StoryObj } from "@storybook/react-vite";

const scale = [
  { level: "Display", cls: "text-3xl font-extrabold tracking-[-0.02em]", spec: "30px / 800", sample: "1,284" },
  { level: "H1", cls: "text-2xl font-bold tracking-[-0.01em]", spec: "24px / 700", sample: "Page title" },
  { level: "H2", cls: "text-lg font-bold", spec: "18px / 700", sample: "Section heading" },
  { level: "H3", cls: "text-base font-semibold", spec: "16px / 600", sample: "Subsection title" },
  { level: "Body", cls: "text-sm", spec: "14px / 400", sample: "Body text for paragraphs and descriptions." },
  { level: "Body Strong", cls: "text-sm font-medium", spec: "14px / 500", sample: "Navigation & labels" },
  { level: "Caption", cls: "text-xs font-medium", spec: "12px / 500", sample: "Auxiliary info, badges" },
  { level: "Tiny", cls: "text-[10px] font-semibold tracking-[0.02em]", spec: "10px / 600", sample: "v1.2.3" },
];

const meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeScale: Story = {
  render: () => (
    <div className="space-y-1">
      <p className="mb-4 text-sm text-text-muted">
        Font family: <span className="font-semibold text-text-main">Plus Jakarta Sans</span> —
        Major Third (1.250) scale.
      </p>
      {scale.map((s) => (
        <div
          key={s.level}
          className="flex items-baseline gap-6 border-b border-border py-3"
        >
          <div className="w-28 shrink-0">
            <p className="text-sm font-semibold text-text-main">{s.level}</p>
            <p className="font-mono text-xs text-text-muted">{s.spec}</p>
          </div>
          <p className={`${s.cls} text-text-main`}>{s.sample}</p>
        </div>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      {[
        ["Regular 400", "font-normal"],
        ["Medium 500", "font-medium"],
        ["SemiBold 600", "font-semibold"],
        ["Bold 700", "font-bold"],
        ["ExtraBold 800", "font-extrabold"],
      ].map(([label, cls]) => (
        <p key={label} className={`text-xl text-text-main ${cls}`}>
          {label} — The quick brown fox
        </p>
      ))}
    </div>
  ),
};
