import { axios } from "@/core/libraries/axios/index.libs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { IUser } from "./types/user.types";
import { useAuthState } from "./store/useAuthStore";
import { useLogout } from "./useLogout";
import { usePathname } from "next/navigation";

type ViewProfileResponse = BaseResponse<Readonly<IUser>>;

export const useAccount = () => {
  const {
    state: {
      access: { token },
    },
  } = useAuthState();
  const { logout } = useLogout();
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/authentication");

  const profileQuery = useQuery({
    queryKey: ["view_profile", token],
    enabled: Boolean(token) && !isAuthPage,
    queryFn: () => {
      return axios.get<ViewProfileResponse>("/api/v1/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    select(response): IUser {
      return response.data.data;
    },
  });

  useEffect(() => {
    if (profileQuery.isError && !isAuthPage) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileQuery.isError, isAuthPage]);

  return {
    profile: profileQuery,
  };
};
