import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Text input following Muses interactive-state colors.
 * Default → hover → focus (primary ring) → disabled states.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-text-main outline-none transition-colors",
        "placeholder:text-text-muted placeholder:font-medium",
        "hover:border-slate-300",
        "focus:border-primary focus:ring-2 focus:ring-primary/20",
        "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-text-muted",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
