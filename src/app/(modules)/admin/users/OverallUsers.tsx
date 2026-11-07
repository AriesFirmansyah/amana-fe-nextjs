import { useUsers } from "./useUsers";

import { Button } from "@/core/components/ui/button";
import { UserDialog } from "./User.dialog";
import { OverallUsersItem } from "./OverallUsersItem";
import { PlusIcon } from "lucide-react";

export const OverallUsers = () => {
  const { statistic } = useUsers();

  return (
    <section className="p-5 rounded-xl grid gap-6 bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="grid">
          <h1 className="text-xl font-bold text-black w-fit min-w-fit">
            Overall Users
          </h1>
          <h2 className="font-semibold text-sm text-gray-500">
            Find all users here
          </h2>
        </div>
        <div className="flex gap-2 h-fit flex-wrap">
          <UserDialog
            mode="create"
            trigger={
              <Button
                variant="outline"
                leadingIcon={PlusIcon}
                className="xs:w-fit w-full"
              >
                Add User
              </Button>
            }
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-20 gap-y-6">
        {statistic?.map((v) => (
          <OverallUsersItem
            key={v.role}
            statistic={v}
          />
        ))}
      </div>
    </section>
  );
};
