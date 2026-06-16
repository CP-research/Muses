import { forwardRef, useState } from "react";
import {
  ChevronDown,
  PanelLeft,
  PanelLeftClose,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/cn";

export interface SidebarNavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

/** A collapsible first-level category grouping nav items. */
export interface SidebarNavGroup {
  label: string;
  items: SidebarNavItem[];
  /** Start expanded (default true). */
  defaultOpen?: boolean;
}

export type SidebarEntry = SidebarNavItem | SidebarNavGroup;

function isGroup(entry: SidebarEntry): entry is SidebarNavGroup {
  return Array.isArray((entry as SidebarNavGroup).items);
}

export interface SidebarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Service name shown next to the logo (hidden when collapsed on desktop). */
  serviceName: string;
  /** Semver string, rendered as `v{version}` right next to the title. */
  version: string;
  /** Navigation entries — flat items and/or collapsible categories. */
  items: SidebarEntry[];
  /** Logo node (defaults to a brand square). */
  logo?: React.ReactNode;
  /** Controlled desktop collapsed state. Omit for uncontrolled. */
  collapsed?: boolean;
  /** Initial collapsed state when uncontrolled (default false). */
  defaultCollapsed?: boolean;
  /** Fired when the in-sidebar toggle flips the collapsed state. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Mobile drawer open state. */
  mobileOpen?: boolean;
  /** Called when the mobile backdrop is clicked. */
  onMobileClose?: () => void;
}

const TRANSITION =
  "transition-[width,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]";

function DefaultLogo() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-white">
      M
    </div>
  );
}

const leafClasses = (active?: boolean) =>
  cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
    active
      ? "bg-primary/10 font-semibold text-primary"
      : "text-text-muted hover:bg-slate-50 hover:text-text-main",
  );

/** A single leaf item inside the expanded nav. */
function LeafLink({ item, small }: { item: SidebarNavItem; small?: boolean }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href ?? "#"}
      onClick={item.onClick}
      aria-current={item.active ? "page" : undefined}
      className={leafClasses(item.active)}
    >
      <Icon className={cn("shrink-0", small ? "h-4 w-4" : "h-5 w-5")} />
      <span className="truncate">{item.label}</span>
    </a>
  );
}

/** A collapsible first-level category with a small gray header. */
function NavGroup({ group }: { group: SidebarNavGroup }) {
  const [open, setOpen] = useState(group.defaultOpen ?? true);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted transition-colors hover:text-text-main"
      >
        <span className="truncate">{group.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform",
            !open && "-rotate-90",
          )}
        />
      </button>
      {open && (
        <ul className="ml-4 flex flex-col gap-0.5 border-l border-border pl-2">
          {group.items.map((item) => (
            <li key={item.label}>
              <LeafLink item={item} small />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Muses sidebar: fixed on desktop with an in-sidebar collapse toggle, overlay
 * drawer on mobile. Header shows logo + service name + version; nav supports
 * flat items and collapsible first-level categories.
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      serviceName,
      version,
      items,
      logo,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      mobileOpen = false,
      onMobileClose,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalCollapsed, setInternalCollapsed] =
      useState(defaultCollapsed);
    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

    const toggle = () => {
      const next = !collapsed;
      onCollapsedChange?.(next);
      if (!isControlled) setInternalCollapsed(next);
    };

    // Collapsed desktop "rail": all leaves flattened to icon-only buttons.
    const flatLeaves = items.flatMap((e) => (isGroup(e) ? e.items : [e]));

    return (
      <>
        {/* Mobile backdrop */}
        <div
          aria-hidden={!mobileOpen}
          onClick={onMobileClose}
          className={cn(
            "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden",
            TRANSITION,
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />

        <aside
          ref={ref}
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-[260px] max-w-[85vw] flex-col border-r border-border bg-surface shadow-[4px_0_24px_-2px_rgba(0,0,0,0.15)]",
            "lg:max-w-none lg:translate-x-0 lg:shadow-[4px_0_20px_-2px_rgba(238,28,36,0.06)]",
            collapsed ? "lg:w-[72px]" : "lg:w-[260px]",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            TRANSITION,
            className,
          )}
          {...props}
        >
          {/* Header: logo + service name + version + collapse toggle */}
          <div className="flex h-14 items-center gap-2 border-b border-border px-3">
            <div className={cn("shrink-0", collapsed && "lg:hidden")}>
              {logo ?? <DefaultLogo />}
            </div>
            <div
              className={cn(
                "flex min-w-0 flex-1 items-baseline gap-1.5",
                collapsed && "lg:hidden",
              )}
            >
              <span className="truncate text-sm font-bold tracking-tight text-text-main">
                {serviceName}
              </span>
              <span className="shrink-0 text-[10px] font-semibold text-text-muted">
                v{version}
              </span>
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              className={cn(
                "hidden shrink-0 rounded-lg p-1.5 text-text-muted hover:bg-slate-50 hover:text-text-main lg:flex",
                collapsed && "lg:mx-auto",
              )}
            >
              {collapsed ? (
                <PanelLeft className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Expanded nav (mobile always; desktop when expanded) */}
          <nav
            className={cn(
              "flex-1 overflow-y-auto px-2 py-2",
              collapsed && "lg:hidden",
            )}
          >
            <ul className="flex flex-col gap-1">
              {items.map((entry) =>
                isGroup(entry) ? (
                  <NavGroup key={entry.label} group={entry} />
                ) : (
                  <li key={entry.label}>
                    <LeafLink item={entry} />
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Collapsed rail (desktop only) */}
          <nav
            className={cn(
              "hidden flex-1 overflow-y-auto px-2 py-2",
              collapsed && "lg:block",
            )}
          >
            <ul className="flex flex-col gap-1">
              {flatLeaves.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href ?? "#"}
                      onClick={item.onClick}
                      title={item.label}
                      aria-label={item.label}
                      aria-current={item.active ? "page" : undefined}
                      className={cn(
                        "flex justify-center rounded-lg py-2.5",
                        item.active
                          ? "bg-primary/10 text-primary"
                          : "text-text-muted hover:bg-slate-50 hover:text-text-main",
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </>
    );
  },
);
Sidebar.displayName = "Sidebar";
