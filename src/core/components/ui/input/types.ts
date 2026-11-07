import {
  ReactNode,
  type ForwardRefExoticComponent,
  type InputHTMLAttributes,
  type PropsWithoutRef,
  type RefAttributes,
} from "react";

export type InputFileProps = ForwardRefExoticComponent<
  InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>
>;

export type InputSearchProps = ForwardRefExoticComponent<
  Omit<
    InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>,
    "onChange"
  > & { onChange: (e: string) => void }
>;

export type InputComponent = ForwardRefExoticComponent<
  PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>> &
    RefAttributes<HTMLInputElement> & {
      leftAddon?: ReactNode;
      rightAddon?: ReactNode;
    }
> & {
  File: InputFileProps;
  Search: InputSearchProps;
};
