import { forwardRef, useId } from "react";
import { Controller, FormProvider } from "react-hook-form";

import { FormFieldContext, FormItemContext } from "./contexts";
import { useFormField } from "./hooks";
import type {
  FormComponents,
  FormControlProps,
  FormDescriptionProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
} from "./types";
import { cn } from "@/core/libraries/tailwind";
import { Label } from "../label";

const FormItem: FormItemProps = forwardRef(({ className, ...props }, ref) => {
  const id = useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        {...props}
        ref={ref}
        className={cn("space-y-1", className)}
      />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel: FormLabelProps = forwardRef(
  ({ className, children, required, ...props }, ref) => {
    const { formItemId } = useFormField();
    return (
      <Label
        {...props}
        ref={ref}
        className={cn(className)}
        htmlFor={formItemId}
        required={required}
      >
        {children}
      </Label>
    );
  },
);
FormLabel.displayName = "FormLabel";

const FormControl: FormControlProps = forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <div
      {...props}
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      className={cn(
        error &&
          "text-primary-500 border-primary-500 focus-visible:border-primary-500 focus-visible:ring-primary-100",
      )}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription: FormDescriptionProps = forwardRef(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        {...props}
        ref={ref}
        id={formDescriptionId}
        className={cn("!text-xxs text-neutral-secondary", className)}
      />
    );
  },
);
FormDescription.displayName = "FormDescription";

const FormField: FormFieldProps = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormMessage: FormMessageProps = forwardRef(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) return null;
    return (
      <p
        {...props}
        ref={ref}
        id={formMessageId}
        className={cn("!text-xxs text-red-500", className)}
      >
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

const Form: FormComponents = ({ ...props }) => {
  return <form {...props} />;
};

Form.Control = FormControl;
Form.Description = FormDescription;
Form.Field = FormField;
Form.Item = FormItem;
Form.Label = FormLabel;
Form.Message = FormMessage;

export { FormProvider, Form };
