import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        draft: "bg-grey-100 text-grey-800",
        warning: "bg-warning-100 text-warning-800",
        danger: "bg-danger-100 text-danger-800",
        success: "bg-success-100 text-success-800",
        info: "bg-info-100 text-info-800",
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
