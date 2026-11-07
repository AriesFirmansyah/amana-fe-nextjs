import { forwardRef } from "react";

import { TextareaProps } from "./types";
import { cn } from "@/core/libraries/tailwind";

export const Textarea: TextareaProps = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className={cn(
          "w-full flex items-center gap-2.5 rounded transition ease-out duration-200",
          "disabled:cursor-not-allowed disabled:bg-neutral-bg disabled:text-neutral-tertiary",
          "border border-neutral-outline focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:border-primary-500 focus-visible:ring-primary-100",
          "text-neutral-default placeholder:text-neutral-tertiary bg-neutral-text",
          "text-xs file:text-xxs py-2 px-3 pr-9",
          className,
        )}
      />
    );
  },
);
Textarea.displayName = "Textarea";
