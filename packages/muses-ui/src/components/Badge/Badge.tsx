import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        draft: "bg-slate-100 text-slate-700",
        warning: "bg-amber-100 text-amber-700",
        danger: "bg-red-100 text-red-700",
        success: "bg-emerald-100 text-emerald-700",
        info: "bg-blue-100 text-blue-700",
      },
    },
    defaultVariants: {
      status: "draft",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Status badge using the Muses status-color palette.
 * Statuses: draft, warning, danger, success, info.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, status, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ status }), className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { badgeVariants };
