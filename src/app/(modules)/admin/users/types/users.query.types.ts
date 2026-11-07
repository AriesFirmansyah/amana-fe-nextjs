import { UserRoleEnum } from "@/app/(modules)/authentication/core/types/user-role.types";
import { IUser } from "@/app/(modules)/authentication/core/types/user.types";

export type GetUsersProps = {
  enabled?: boolean;
  params?: {
    size?: number;
    page?: number;
    role?: UserRoleEnum;
    keywords?: string;
    end_date?: Date;
    start_date?: Date;
  };
};

export type StatisticUser = {
  total: number;
  role: UserRoleEnum;
};

export type GetUsersResponse = {
  users: IUser[];
  meta: BasePaginationResponse;
  statistic: StatisticUser[];
};
