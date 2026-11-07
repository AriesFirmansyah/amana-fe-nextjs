import { UserMenu } from "../types/menu.constant.types";
import { UserRoleEnum } from "@/app/(modules)/authentication/core/types/user-role.types";

export const userMenu: UserMenu[] = [
  {
    id: 1,
    name: "View all",
  },
  {
    id: 2,
    name: "Reporter",
    key: UserRoleEnum.REPORTER,
  },
  {
    id: 3,
    name: "Admin",
    key: UserRoleEnum.ADMIN,
  },
];
