"use client";

import { forwardRef } from "react";

import {
  Root,
  Item,
  Portal,
  Trigger,
  Content,
  Separator,
  RadioItem,
  SubTrigger,
  SubContent,
  CheckboxItem,
  ItemIndicator,
  Group,
  Sub,
  RadioGroup,
} from "@radix-ui/react-dropdown-menu";

import { cn } from "@/core/libraries/tailwind";

import { Label } from "../label";
import { Check, ChevronRight, Circle } from "lucide-react";

import {
  DropdownComponent,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownContentProps,
  DropdownTriggerProps,
  DropdownRadioItemProps,
  DropdownSeparatorProps,
  DropdownSubContentProps,
  DropdownSubTriggerProps,
  DropdownCheckboxItemProps,
} from "./types";

const DropdownSubTrigger: DropdownSubTriggerProps = forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        "hover:bg-primary-500 rounded-md text-neutral-default hover:text-neutral-text",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </SubTrigger>
  ),
);
DropdownSubTrigger.displayName = SubTrigger.displayName;

const DropdownSubContent: DropdownSubContentProps = forwardRef(
  ({ className, ...props }, ref) => (
    <SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "bg-white",
        className,
      )}
      {...props}
    />
  ),
);
DropdownSubContent.displayName = SubContent.displayName;

const DropdownContent: DropdownContentProps = forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Portal>
      <Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "bg-white",
          className,
        )}
        {...props}
      />
    </Portal>
  ),
);
DropdownContent.displayName = Content.displayName;

const DropdownItem: DropdownItemProps = forwardRef(
  ({ className, inset, ...props }, ref) => (
    <Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "hover:bg-primary-500 rounded-md text-neutral-default hover:text-neutral-text",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);
DropdownItem.displayName = Item.displayName;

const DropdownCheckboxItem: DropdownCheckboxItemProps = forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "hover:bg-primary-500 rounded-md text-neutral-default hover:text-neutral-text",

        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Check className="h-4 w-4" />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  ),
);
DropdownCheckboxItem.displayName = CheckboxItem.displayName;

const DropdownRadioItem: DropdownRadioItemProps = forwardRef(
  ({ className, children, ...props }, ref) => (
    <RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "hover:bg-primary-500 rounded-md text-neutral-default hover:text-neutral-text",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  ),
);
DropdownRadioItem.displayName = RadioItem.displayName;

const DropdownLabel: DropdownLabelProps = forwardRef(
  ({ className, ...props }, ref) => (
    <Label
      ref={ref}
      className={cn("px-2 py-1 text-sm font-semibold ", className)}
      {...props}
    />
  ),
);
DropdownLabel.displayName = Label.displayName;

const DropdownSeparator: DropdownSeparatorProps = forwardRef(
  ({ className, ...props }, ref) => (
    <Separator
      ref={ref}
      className={cn(
        "my-1 h-px bg-muted mx-2 bg-neutral-tertiary/30",
        className,
      )}
      {...props}
    />
  ),
);
DropdownSeparator.displayName = Separator.displayName;

const DropdownTrigger: DropdownTriggerProps = forwardRef(
  ({ ...props }, ref) => {
    return (
      <Trigger
        {...props}
        ref={ref}
      />
    );
  },
);
DropdownTrigger.displayName = Trigger.displayName;

export const DropdownMenu = forwardRef(({ ...props }, _ref) => {
  return <Root {...props} />;
}) as DropdownComponent;

DropdownMenu.displayName = Root.displayName;
DropdownMenu.Trigger = DropdownTrigger;
DropdownMenu.Separator = DropdownSeparator;
DropdownMenu.Label = DropdownLabel;
DropdownMenu.RadioItem = DropdownRadioItem;
DropdownMenu.CheckboxItem = DropdownCheckboxItem;
DropdownMenu.Item = DropdownItem;
DropdownMenu.Content = DropdownContent;
DropdownMenu.SubContent = DropdownSubContent;
DropdownMenu.SubTrigger = DropdownSubTrigger;
DropdownMenu.Group = Group;
DropdownMenu.RadioGroup = RadioGroup;
DropdownMenu.Portal = Portal;
DropdownMenu.Sub = Sub;
