import { cn } from "@/core/libraries/tailwind";
import { useState } from "react";

import { UserMenu } from "./types/menu.constant.types";

import { userMenu } from "./constants/menu.constant";
import { useUsers } from "./useUsers";
import { usersColumns } from "./Users.column";

import { Input } from "@/core/components/ui/input";
import { UsersTable } from "./Users.table";

export const Users = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<UserMenu>(userMenu[0]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const { users, meta, isLoading } = useUsers({
    keywords: searchValue,
    role: selectedMenu.key,
    page,
    size: pageSize,
  });

  return (
    <section className="grid gap-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 grid gap-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="bg-gray-100 rounded-xl p-1 flex flex-wrap gap-1 w-fit">
            {userMenu.map((menu) => (
              <button
                key={menu.id}
                type="button"
                onClick={() => {
                  setSelectedMenu(menu);
                  setPage(1);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  selectedMenu.id === menu.id
                    ? "bg-white text-gray-900 shadow-sm font-semibold"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                {menu.name}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-[260px]">
            <Input.Search
              value={searchValue}
              onChange={(val) => {
                setSearchValue(val);
                setPage(1);
              }}
              className="rounded-lg"
              placeholder="Search users by name..."
            />
          </div>
        </div>

        <UsersTable
          columns={usersColumns}
          data={users || []}
          loading={isLoading}
          meta={meta}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
};
