import { StatisticUser } from "./types/users.query.types";

export const OverallUsersItem = ({
  statistic,
}: {
  statistic: StatisticUser;
}) => {
  return (
    <div className="grid w-[200px] gap-1">
      <div className="flex justify-between">
        <h1 className="text-gray-700 font-bold text-sm capitalize">
          {statistic.role?.toLocaleLowerCase()}
        </h1>
      </div>
      <span className="text-2xl font-bold tracking-wider">
        {statistic.total}
      </span>
    </div>
  );
};
