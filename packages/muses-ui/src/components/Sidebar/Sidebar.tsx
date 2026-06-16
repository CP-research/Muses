import { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";

export interface SidebarNavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Service name shown next to the logo (hidden when collapsed). */
  serviceName: string;
  /** Semver string, rendered at the bottom as `v{version}`. */
  version: string;
  /** Navigation items. */
  items: SidebarNavItem[];
  /** Logo node (defaults to a brand square). */
  logo?: React.ReactNode;
  /** Desktop collapsed state (w-[72px] vs w-[260px]). */
  collapsed?: boolean;
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

/**
 * Muses sidebar: fixed on desktop (expand/collapse), overlay drawer on mobile.
 * Structure: logo + service name → scrollable nav → version footer.
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      serviceName,
      version,
      items,
      logo,
      collapsed = false,
      mobileOpen = false,
      onMobileClose,
      className,
      ...props
    },
    ref,
  ) => {
    const width = collapsed ? "lg:w-[72px]" : "lg:w-[260px]";

    return (
      <>
        {/* Mobile backdrop */}
        <div
          aria-hidden={!mobileOpen}
          onClick={onMobileClose}
          className={cn(
            "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden",
            TRANSITION,
            mobileOpen
              ? "opacity-100"
              : "pointer-events-none opacity-0",
          )}
        />

        <aside
          ref={ref}
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex max-w-[85vw] flex-col border-r border-border bg-surface",
            // desktop
            "lg:max-w-none lg:translate-x-0 lg:shadow-[4px_0_20px_-2px_rgba(238,28,36,0.06)]",
            width,
            // mobile drawer
            "w-[260px] shadow-[4px_0_24px_-2px_rgba(0,0,0,0.15)] lg:shadow-[4px_0_20px_-2px_rgba(238,28,36,0.06)]",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            TRANSITION,
            className,
          )}
          {...props}
        >
          {/* Logo + service name */}
          <div
            className={cn(
              "flex h-14 items-center gap-2 border-b border-border px-4",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            {logo ?? <DefaultLogo />}
            <span
              className={cn(
                "text-sm font-bold tracking-tight text-text-main",
                collapsed && "lg:hidden",
              )}
            >
              {serviceName}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-2">
            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href ?? "#"}
                      onClick={item.onClick}
                      aria-current={item.active ? "page" : undefined}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                        item.active
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-text-muted hover:bg-slate-50 hover:text-text-main",
                        collapsed && "lg:justify-center lg:px-0",
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className={cn(collapsed && "lg:hidden")}>
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Version footer */}
          <div
            className={cn(
              "border-t border-border px-4 py-3 text-xs text-text-muted",
              collapsed && "lg:px-0 lg:text-center lg:text-[10px] lg:font-semibold",
            )}
          >
            v{version}
          </div>
        </aside>
      </>
    );
  },
);
Sidebar.displayName = "Sidebar";
