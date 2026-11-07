"use client";

import { ReactNode } from "react";

import { persistor, store } from "@/core/redux/store";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};
