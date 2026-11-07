import { UserRoleEnum } from "./user-role.types";

export interface IUser {
  id: string;
  name: string;
  role: UserRoleEnum;
  email: string;
  updatedAt: Date;
  is_email_verified: boolean;
}
