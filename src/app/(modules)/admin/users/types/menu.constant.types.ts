import { UserRoleEnum } from "@/app/(modules)/authentication/core/types/user-role.types";

export type UserMenu = {
  id: number;
  name: string;
  key?: UserRoleEnum;
};
