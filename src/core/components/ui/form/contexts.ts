import { createContext } from "react";

import type { FormFieldContextValue, FormItemContextValue } from "./types";

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);
