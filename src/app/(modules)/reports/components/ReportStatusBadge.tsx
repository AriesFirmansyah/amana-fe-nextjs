import { cn } from "@/core/libraries/tailwind";
import { ReportStatusEnum } from "../types/reports.types";
import { REPORT_STATUS_LABELS } from "../constants/reports.constant";

const statusStyles: Record<ReportStatusEnum, string> = {
  [ReportStatusEnum.DRAFT]:
    "bg-gray-100 text-gray-700 border-gray-300",
  [ReportStatusEnum.SUBMITTED]:
    "bg-blue-50 text-blue-700 border-blue-200",
  [ReportStatusEnum.UNDER_REVIEW]:
    "bg-amber-50 text-amber-700 border-amber-200",
  [ReportStatusEnum.RESOLVED]:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const dotStyles: Record<ReportStatusEnum, string> = {
  [ReportStatusEnum.DRAFT]: "bg-gray-500",
  [ReportStatusEnum.SUBMITTED]: "bg-blue-600",
  [ReportStatusEnum.UNDER_REVIEW]: "bg-amber-500",
  [ReportStatusEnum.RESOLVED]: "bg-emerald-600",
};

export const ReportStatusBadge = ({
  status,
  className,
}: {
  status: ReportStatusEnum;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
        statusStyles[status] || statusStyles[ReportStatusEnum.DRAFT],
        className,
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          dotStyles[status] || dotStyles[ReportStatusEnum.DRAFT],
        )}
      />
      {REPORT_STATUS_LABELS[status] || status}
    </span>
  );
};
