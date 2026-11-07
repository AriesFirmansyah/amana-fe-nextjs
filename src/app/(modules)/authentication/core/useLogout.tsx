import { useAuthState } from "./store/useAuthStore";
import { useRouter } from "next/navigation";
import { Cookie } from "@/core/utilities/cookie";
import { axios } from "@/core/libraries/axios/index.libs";
import { client } from "@/app/_/plugins/react-query";

export const useLogout = () => {
  const { state, dispatch } = useAuthState();
  const navigate = useRouter();

  const logout = async () => {
    try {
      if (state.access.token) {
        await axios.post(
          "/api/v1/authentication/logout",
          {},
          {
            headers: { Authorization: `Bearer ${state.access.token}` },
          },
        );
      }
    } catch (_e) {
      // Ignore error on logout API call
    } finally {
      Cookie.delete("access_token");
      Cookie.delete("user");
      Cookie.clearAll();

      dispatch.unauthenticate();
      client.clear();
      navigate.replace("/authentication/sign-in");
    }
  };

  return {
    logout,
  };
};
