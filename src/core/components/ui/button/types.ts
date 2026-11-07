import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";
import type { VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";

import { buttonVariants } from "./variants";
import { LinkProps } from "next/link";

type ButtonProps = {
  leading?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
  className?: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
};

export type ButtonLinkProps = ForwardRefExoticComponent<
  LinkProps &
    RefAttributes<HTMLAnchorElement> &
    VariantProps<typeof buttonVariants> &
    ButtonProps
>;

type ButtonSubScomponents = {
  Link: ButtonLinkProps;
};

export type ButtonComponent = ForwardRefExoticComponent<
  ButtonHTMLAttributes<HTMLButtonElement> &
    RefAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> &
    ButtonProps
> &
  ButtonSubScomponents;
