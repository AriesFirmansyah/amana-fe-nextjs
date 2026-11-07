import { useDebouncedValue } from "@/core/hooks/debounce";
import { useGetUsersQuery } from "./queries/users.query";
import { GetUsersProps } from "./types/users.query.types";

const DEFAULT_PARAMS = {
  page: 1,
  size: 10,
};

export const useUsers = (props?: GetUsersProps["params"]) => {
  const debounceSearchValue = useDebouncedValue(props?.keywords, 500);

  const getUsers = useGetUsersQuery({
    enabled: true,
    params: {
      page: props?.page || DEFAULT_PARAMS.page,
      size: props?.size || DEFAULT_PARAMS.size,
      role: props?.role,
      end_date: props?.end_date,
      keywords: debounceSearchValue || undefined,
      start_date: props?.start_date,
    },
  });

  return {
    ...getUsers.data,
    isLoading: getUsers.isLoading,
    isFetching: getUsers.isFetching,
  };
};
