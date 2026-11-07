import { axios } from "@/core/libraries/axios/index.libs";
import { useQuery } from "@tanstack/react-query";
import { GetUsersProps, GetUsersResponse } from "../types/users.query.types";

export const useGetUsersQuery = (args: GetUsersProps) => {
  return useQuery({
    enabled: args.enabled,
    queryKey: ["users", args.params],

    queryFn: async () => {
      const { data } = await axios.get("/admin-api/v1/users", {
        params: args.params,
      });
      return data;
    },
    select: (data): GetUsersResponse => data.data,
  });
};
