"use client";

import { ReactNode } from "react";

import { client } from "@/app/_/plugins/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
