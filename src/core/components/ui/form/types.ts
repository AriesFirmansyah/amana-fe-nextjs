import type {
  ComponentPropsWithoutRef,
  FC,
  FormHTMLAttributes,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";

import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { LabelProps } from "../label/types";

export type FormItemContextValue = {
  id: string;
};

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export type FormControlProps = ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
>;

export type FormDescriptionProps = ForwardRefExoticComponent<
  HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>
>;

export type FormFieldProps = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => JSX.Element;

export type FormItemProps = ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
>;

export type FormLabelProps = LabelProps;

export type FormMessageProps = ForwardRefExoticComponent<
  HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>
>;

type FormSubComponents = {
  Control: FormControlProps;
  Description: FormDescriptionProps;
  Field: FormFieldProps;
  Item: FormItemProps;
  Label: FormLabelProps;
  Message: FormMessageProps;
};

export type FormComponents = FC<FormHTMLAttributes<HTMLFormElement>> &
  FormSubComponents;
