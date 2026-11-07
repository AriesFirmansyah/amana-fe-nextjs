import authReducer, {
  IAuthState,
} from "@/app/(modules)/authentication/core/store/authStore";
import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};
const ssrStorage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const combinedReducer = combineReducers({
  auth: persistReducer<IAuthState>(
    {
      key: "auth",
      storage: ssrStorage,
      stateReconciler: autoMergeLevel2,
      whitelist: ["access", "account"],
    },
    authReducer,
  ),
});

const reducers = combinedReducer;

export default reducers;
