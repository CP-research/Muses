import { forwardRef } from "react";
import { ChevronRight, Menu } from "lucide-react";
import { cn } from "../../lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb trail; the last item is rendered as the current page. */
  breadcrumbs: BreadcrumbItem[];
  /** Called when the mobile menu button is tapped. */
  onMenuClick?: () => void;
  /** Right-aligned actions (buttons, avatar, …). */
  actions?: React.ReactNode;
}

/**
 * Sticky page header with a breadcrumb trail and a mobile menu trigger.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ breadcrumbs, onMenuClick, actions, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur-sm sm:px-6",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="-ml-1 rounded-lg p-1.5 text-text-muted hover:bg-slate-50 hover:text-text-main lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Breadcrumb items={breadcrumbs} className="min-w-0 flex-1" />

      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  ),
);
Header.displayName = "Header";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

/** Standalone breadcrumb trail. */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("flex items-center", className)}
      {...props}
    >
      <ol className="flex items-center gap-1.5 overflow-hidden">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-text-muted" />
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "truncate text-sm",
                    isLast
                      ? "font-semibold text-text-main"
                      : "text-text-muted",
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="truncate text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  ),
);
Breadcrumb.displayName = "Breadcrumb";
