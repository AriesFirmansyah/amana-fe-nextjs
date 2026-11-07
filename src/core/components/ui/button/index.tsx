"use client";

import { forwardRef } from "react";

import { buttonVariants } from "./variants";
import type { ButtonComponent, ButtonLinkProps } from "./types";
import { cn } from "@/core/libraries/tailwind";
import Link from "next/link";

const ButtonLink: ButtonLinkProps = forwardRef(
  (
    {
      className,
      children,
      leading,
      leadingIcon: LeadingIcon,
      size,
      trailing,
      trailingIcon: TrailingIcon,
      variant,
      ...props
    },
    ref,
  ) => {
    const leadingSlot = leading
      ? leading
      : LeadingIcon && <LeadingIcon className="flex-shrink-0 w-4 h-4" />;

    const trailingSlot = trailing
      ? trailing
      : TrailingIcon && <TrailingIcon className="flex-shrink-0 w-4 h-4" />;

    return (
      <Link
        {...props}
        ref={ref}
        className={cn(
          "whitespace-nowrap",
          buttonVariants({ className, size, variant }),
        )}
      >
        {leadingSlot}
        {children}
        {trailingSlot}
      </Link>
    );
  },
);
ButtonLink.displayName = "ButtonLink";

export const Button = forwardRef(
  (
    {
      className,
      children,
      leading,
      leadingIcon: LeadingIcon,
      size,
      trailing,
      trailingIcon: TrailingIcon,
      variant,
      ...props
    },
    ref,
  ) => {
    const leadingSlot = leading
      ? leading
      : LeadingIcon && <LeadingIcon className="flex-shrink-0 w-4 h-4" />;

    const trailingSlot = trailing
      ? trailing
      : TrailingIcon && <TrailingIcon className="flex-shrink-0 w-4 h-4" />;

    return (
      <button
        {...props}
        ref={ref}
        className={cn(buttonVariants({ className, size, variant }))}
      >
        {leadingSlot}
        {children}
        {trailingSlot}
      </button>
    );
  },
) as ButtonComponent;
Button.displayName = "Button";

Button.Link = ButtonLink;
