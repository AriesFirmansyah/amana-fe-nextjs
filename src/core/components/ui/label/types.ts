import type {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export type LabelProps = ForwardRefExoticComponent<
  Omit<ComponentPropsWithoutRef<"label">, "ref"> &
    RefAttributes<HTMLLabelElement> & {
      required?: boolean;
    }
>;
