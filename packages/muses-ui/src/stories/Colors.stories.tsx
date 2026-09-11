import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Every colour lives on a fixed 10-step scale defined up front in
 * `src/styles/theme.css`. Pick a step; never generate a shade on the fly with
 * an opacity modifier (`bg-primary/10`) or a lighten()/darken() call.
 */
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

type Scale = {
  name: string;
  note: string;
  /** Shade used as the scale's anchor, highlighted in the grid. */
  base: (typeof SHADES)[number];
  values: Record<(typeof SHADES)[number], string>;
};

const scales: Scale[] = [
  {
    name: "grey",
    note: "Text, backgrounds, panels, borders — most of the UI",
    base: 500,
    values: {
      50: "#FAFAFA", 100: "#F5F5F5", 200: "#E2E2E2", 300: "#D1D1D1", 400: "#A6A6A6",
      500: "#717171", 600: "#595959", 700: "#424242", 800: "#2B2B2B", 900: "#1A1A1A",
    },
  },
  {
    name: "primary",
    note: "Brand red — primary actions, active navigation",
    base: 500,
    values: {
      50: "#FEF0F1", 100: "#FDDDDE", 200: "#FBBCBE", 300: "#F79195", 400: "#F3595E",
      500: "#EE1C24", 600: "#D31219", 700: "#AA131A", 800: "#81131B", 900: "#5E1218",
    },
  },
  {
    name: "secondary",
    note: "Muted brand red — supporting brand accents",
    base: 700,
    values: {
      50: "#FAF0F0", 100: "#F5E0E1", 200: "#ECC6C7", 300: "#DF9FA2", 400: "#C85F63",
      500: "#B63E42", 600: "#A3383C", 700: "#913134", 800: "#71282A", 900: "#562021",
    },
  },
  {
    name: "success",
    note: "Positive / completed",
    base: 500,
    values: {
      50: "#EEFCF7", 100: "#D3F8EC", 200: "#A5F3D9", 300: "#63EEBF", 400: "#1CE9A4",
      500: "#10B981", 600: "#0D9B6E", 700: "#0B7F5C", 800: "#0A6149", 900: "#084938",
    },
  },
  {
    name: "warning",
    note: "Caution / pending",
    base: 500,
    values: {
      50: "#FEFAEB", 100: "#FDF1CE", 200: "#FCDF9C", 300: "#F9C762", 400: "#F6B131",
      500: "#F59F0A", 600: "#D37E09", 700: "#A85E0B", 800: "#83450B", 900: "#65320B",
    },
  },
  {
    name: "danger",
    note: "Destructive / error — deliberately a deeper crimson than the brand red",
    base: 500,
    values: {
      50: "#FDECEF", 100: "#FCD9DF", 200: "#F8B9C3", 300: "#F28898", 400: "#E93F59",
      500: "#CC1934", 600: "#B11630", 700: "#90142A", 800: "#6E1224", 900: "#51101E",
    },
  },
  {
    name: "info",
    note: "Neutral information",
    base: 500,
    values: {
      50: "#F0F6FE", 100: "#DDEBFD", 200: "#BBD7FB", 300: "#8BB9F8", 400: "#669FF5",
      500: "#3F84F3", 600: "#1963EB", 700: "#154CC1", 800: "#163B92", 900: "#152D6F",
    },
  },
];

const aliases = [
  { name: "background", maps: "grey-50", value: "#FAFAFA", note: "Page background" },
  { name: "surface", maps: "white", value: "#FFFFFF", note: "Card / panel background" },
  { name: "primary", maps: "primary-500", value: "#EE1C24", note: "Brand primary" },
  { name: "secondary", maps: "secondary-700", value: "#913134", note: "Brand secondary" },
  { name: "text-main", maps: "grey-900", value: "#1A1A1A", note: "Body text" },
  { name: "text-muted", maps: "grey-500", value: "#717171", note: "Secondary text" },
  { name: "accent", maps: "success-500", value: "#10B981", note: "Success / positive" },
  { name: "border", maps: "grey-200", value: "#E2E2E2", note: "Borders" },
];

const statuses = [
  { label: "Draft", bg: "bg-grey-100", text: "text-grey-800" },
  { label: "Warning", bg: "bg-warning-100", text: "text-warning-800" },
  { label: "Danger", bg: "bg-danger-100", text: "text-danger-800" },
  { label: "Success", bg: "bg-success-100", text: "text-success-800" },
  { label: "Info", bg: "bg-info-100", text: "text-info-800" },
];

const meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full 10-step scales — the source of truth for every colour decision. */
export const Scales: Story = {
  render: () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-bold text-text-main">Color scales</h2>
        <p className="mt-1 max-w-2xl text-sm text-text-muted">
          Seven scales &times; 10 shades. Shades are defined up front — pick the
          nearest step instead of generating one with <code>/10</code> opacity
          modifiers or <code>lighten()</code>. The outlined swatch is each
          scale&rsquo;s anchor shade.
        </p>
      </section>

      {scales.map((scale) => (
        <section key={scale.name}>
          <h3 className="text-sm font-bold text-text-main">{scale.name}</h3>
          <p className="mb-2 text-xs text-text-muted">{scale.note}</p>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {SHADES.map((shade) => (
              <div key={shade}>
                <div
                  className={`h-14 w-full rounded-lg border ${
                    shade === scale.base
                      ? "border-2 border-text-main"
                      : "border-border"
                  }`}
                  style={{ backgroundColor: scale.values[shade] }}
                />
                <p className="mt-1 text-xs font-semibold text-text-main">{shade}</p>
                <p className="font-mono text-[10px] text-text-muted">
                  {scale.values[shade]}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

/** Semantic aliases — the short names most product code should use. */
export const Tokens: Story = {
  render: () => (
    <div className="space-y-8">
      <section>
        <h2 className="mb-1 text-lg font-bold text-text-main">Semantic tokens</h2>
        <p className="mb-3 max-w-2xl text-sm text-text-muted">
          Convenience aliases onto the scales above. Reach for a raw scale step
          (<code>bg-primary-600</code>) when you need a specific shade.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {aliases.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-surface p-3">
              <div
                className="h-16 w-full rounded-lg border border-border"
                style={{ backgroundColor: t.value }}
              />
              <p className="mt-2 text-sm font-semibold text-text-main">{t.name}</p>
              <p className="font-mono text-xs text-text-muted">{t.value}</p>
              <p className="mt-1 text-xs text-text-muted">
                {t.note} &middot; <span className="font-mono">{t.maps}</span>
              </p>
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
        <p className="mt-2 text-xs text-text-muted">
          Pattern: <span className="font-mono">bg-&#123;scale&#125;-100</span> +{" "}
          <span className="font-mono">text-&#123;scale&#125;-800</span> (min 6.5:1 contrast).
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-text-main">Interactive states</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs text-text-muted">
              <tr>
                {["Element", "Default", "Hover", "Focus ring", "Disabled"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-xs text-text-main">
              {[
                ["Primary button", "bg-primary text-white", "bg-primary-600", "ring-primary-200", "opacity-50"],
                ["Secondary button", "bg-surface border-border", "bg-grey-50", "ring-primary-200", "opacity-50"],
                ["Link", "text-primary", "text-primary-700", "ring-primary-200", "text-text-muted"],
                ["Input", "border-border", "border-grey-300", "border-primary ring-primary-200", "bg-grey-50"],
                ["Nav item", "text-text-muted", "bg-grey-50 text-text-main", "ring-primary-200", "—"],
                ["Nav item (active)", "bg-primary-50 text-primary-700", "—", "ring-primary-200", "—"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-border last:border-0">
                  {row.map((cell, i) => (
                    <td key={i} className={`px-4 py-2 ${i === 0 ? "font-sans font-semibold" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  ),
};
