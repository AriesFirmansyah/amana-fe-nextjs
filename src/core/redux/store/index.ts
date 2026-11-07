import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { middleware } from "@/core/redux/middleware";
import { persistStore } from "redux-persist";

import config from "@/config/environment";
import reducers from "@/core/redux/reducers";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...middleware),
  devTools: config.appEnv !== "production",
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
