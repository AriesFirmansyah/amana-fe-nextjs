import { forwardRef } from "react";

import type { LabelProps } from "./types";
import { cn } from "@/core/libraries/tailwind";

export const Label: LabelProps = forwardRef(
  ({ className, children, required, ...props }, ref) => (
    <label
      {...props}
      ref={ref}
      className={cn(
        "text-left text-xs text-neutral-default peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
    >
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  ),
);
Label.displayName = "Label";
