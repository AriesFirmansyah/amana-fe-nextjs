import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import { IUser } from "@/app/(modules)/authentication/core/types/user.types";
import { BadgeCheck, BadgeX } from "lucide-react";
import moment from "moment";
import { Badge } from "@/core/components/ui/badge";
import { cn } from "@/core/libraries/tailwind";
import { UserRoleEnum } from "../../authentication/core/types/user-role.types";

const columnHelper = createColumnHelper<IUser>();

export const usersColumns: ColumnDef<IUser>[] = [
  columnHelper.group({
    header: "Name",
    cell({ row }) {
      return (
        <div className="flex gap-2 items-center">
          <div className="grid">
            <h1 className="text-xs font-semibold">{row.original.name}</h1>
            <h2 className="text-xs text-gray-500">{row.original.email}</h2>
          </div>
        </div>
      );
    },
    meta: {
      className: "!h-9 !py-0",
    },
  }),

  columnHelper.group({
    header: "Role",
    cell({ row }) {
      return (
        <Badge
          label={row.original.role.toLocaleLowerCase()}
          className={cn(
            "border-none text-primary-500 cursor-default capitalize",
            row.original.role === UserRoleEnum.ADMIN && "bg-[#D6E4EE]",
            row.original.role === UserRoleEnum.REPORTER && "bg-[#F1E1E9]",
          )}
        />
      );
    },
    meta: {
      className: "!w-[50px] min-w-[50px]",
    },
  }),
  columnHelper.group({
    header: "Verified",
    cell({ row }) {
      return (
        <div className="grid justify-center">
          {row.original.is_email_verified ? (
            <BadgeCheck className="stroke-green-600" />
          ) : (
            <BadgeX className="stroke-red-600" />
          )}
        </div>
      );
    },
    meta: {
      className: "!w-[50px] min-w-[50px]",
    },
  }),
  columnHelper.group({
    header: "Last Modified",
    cell({ row }) {
      return (
        <div className="grid">
          {moment(row.original.updatedAt).format("LLL")}
        </div>
      );
    },
    meta: {
      className: "w-[230px]",
    },
  }),
];
