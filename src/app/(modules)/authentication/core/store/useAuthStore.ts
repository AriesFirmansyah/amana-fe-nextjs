import {
  type IAuthState,
  assignMenus,
  assignProfile,
  assignRole,
  authenticate,
  unauthenticate,
} from "./authStore";
import { useDispatch, useSelector } from "@/core/hooks/Redux";

export const useAuthState = () => {
  const dispatcher = useDispatch();

  return {
    state: useSelector((state) => state.auth),
    dispatch: {
      assignMenus: (payload: NonNullable<IAuthState["account"]["menus"]>) => {
        return dispatcher(assignMenus(payload));
      },
      assignProfile: (
        payload: NonNullable<IAuthState["account"]["profile"]>,
      ) => {
        return dispatcher(assignProfile(payload));
      },
      assignRole: (payload: NonNullable<IAuthState["access"]["role"]>) => {
        return dispatcher(assignRole(payload));
      },
      authenticate: (payload: NonNullable<IAuthState["access"]["token"]>) => {
        return dispatcher(authenticate(payload));
      },
      unauthenticate: () => {
        return dispatcher(unauthenticate());
      },
    },
  };
};
