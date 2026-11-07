import {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

import {
  CheckboxItem,
  Content,
  Group,
  Item,
  Portal,
  Root,
  Sub,
  RadioGroup,
  SubTrigger,
  SubContent,
  Separator,
  RadioItem,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
import { LabelProps } from "../label/types";

export type DropdownTriggerProps = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof Trigger> & RefAttributes<HTMLButtonElement>
>;

export type DropdownSeparatorProps = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof Separator> & RefAttributes<HTMLDivElement>
>;

export type DropdownLabelProps = LabelProps;

export type DropdownRadioItemProps = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof RadioItem> & RefAttributes<HTMLDivElement>
>;

export type DropdownCheckboxItemProps = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof CheckboxItem> & RefAttributes<HTMLDivElement>
>;

export type DropdownItemProps = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof Item> &
    RefAttributes<HTMLDivElement> & {
      inset?: boolean;
    }
>;

export type DropdownContentProps = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof Content> &
    RefAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement>
>;
export type DropdownSubContentProps = ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<typeof SubContent> & RefAttributes<HTMLDivElement>,
    "ref"
  > &
    RefAttributes<HTMLDivElement>
>;

export type DropdownSubTriggerProps = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof SubTrigger> &
    RefAttributes<HTMLDivElement> & {
      inset?: boolean;
    }
>;

type DropdownSubComponents = {
  Trigger: DropdownTriggerProps;
  Separator: DropdownSeparatorProps;
  RadioItem: DropdownRadioItemProps;
  CheckboxItem: DropdownCheckboxItemProps;
  Item: DropdownItemProps;
  Content: DropdownContentProps;
  SubContent: DropdownSubContentProps;
  SubTrigger: DropdownSubTriggerProps;
  Label: DropdownLabelProps;
  Group: typeof Group;
  RadioGroup: typeof RadioGroup;
  Portal: typeof Portal;
  Sub: typeof Sub;
};

export type DropdownComponent = ForwardRefExoticComponent<
  ComponentPropsWithoutRef<typeof Root> & RefAttributes<never>
> &
  DropdownSubComponents;
