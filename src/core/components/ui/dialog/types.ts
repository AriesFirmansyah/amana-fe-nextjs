import type {
  ReactNode,
  RefAttributes,
  HTMLAttributes,
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
} from "react";

import {
  Root,
  Close,
  Title,
  Portal,
  Content,
  Overlay,
  Trigger,
  Description,
} from "@radix-ui/react-dialog";

export type DialogCloseProps = ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<typeof Close> & RefAttributes<HTMLButtonElement>,
    "ref"
  > &
    RefAttributes<HTMLButtonElement>
>;

export type DialogContentProps = ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<typeof Content> & RefAttributes<HTMLDivElement>,
    "ref"
  > &
    RefAttributes<HTMLDivElement> & {
      annotations?: ReactNode;
      scrollable?: boolean;
      icon?: ReactNode;
      maxWidth?: string;
    }
>;

export type DialogDescriptionProps = ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<typeof Description> &
      RefAttributes<HTMLParagraphElement>,
    "ref"
  > &
    RefAttributes<HTMLParagraphElement>
>;

export type DialogFooterProps = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => JSX.Element;

export type DialogHeaderProps = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => JSX.Element;

export type DialogOverlayProps = ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<typeof Overlay> & RefAttributes<HTMLDivElement>,
    "ref"
  > &
    RefAttributes<HTMLDivElement>
>;

export type DialogPortalProps = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof Portal> & RefAttributes<never>
>;

export type DialogTitleProps = ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<typeof Title> & RefAttributes<HTMLHeadingElement>,
    "ref"
  > &
    RefAttributes<HTMLHeadingElement>
>;

export type DialogTriggerProps = ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<typeof Trigger> & RefAttributes<HTMLButtonElement>,
    "ref"
  > &
    RefAttributes<HTMLButtonElement>
>;

type DialogSubComponents = {
  Close: DialogCloseProps;
  Title: DialogTitleProps;
  Header: DialogHeaderProps;
  Footer: DialogFooterProps;
  Content: DialogContentProps;
  Trigger: DialogTriggerProps;
  Description: DialogDescriptionProps;
};

export type DialogComponent = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof Root> & RefAttributes<never>
> &
  DialogSubComponents;
