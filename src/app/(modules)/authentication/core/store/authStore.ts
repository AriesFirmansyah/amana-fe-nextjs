import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { IUser } from "../types/user.types";
import { UserRoleEnum } from "../types/user-role.types";

export type IAuthState = {
  access: {
    isAuthenticated: boolean;
    role?: UserRoleEnum;
    token?: string;
  };
  account: {
    menus: [];
    profile?: IUser;
  };
};

const authState: IAuthState = {
  access: {
    isAuthenticated: false,
    role: undefined,
    token: undefined,
  },
  account: {
    menus: [],
    profile: undefined,
  },
};

const authStore = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    assignProfile(state, action: PayloadAction<IUser>) {
      state.account.profile = action.payload;
    },
    assignRole(state, action: PayloadAction<UserRoleEnum>) {
      state.access.role = action.payload;
    },
    assignMenus(state, action: PayloadAction<[]>) {
      state.account.menus = action.payload;
    },
    authenticate(state, action: PayloadAction<string>) {
      state.access.token = action.payload;
      state.access.isAuthenticated = true;
    },
    unauthenticate(state) {
      state.access.isAuthenticated = false;
      state.access.role = undefined;
      state.access.token = undefined;

      state.account.menus = [];
      state.account.profile = undefined;
    },
  },
});

export const {
  assignMenus,
  assignProfile,
  assignRole,
  authenticate,
  unauthenticate,
} = authStore.actions;

export default authStore.reducer;
