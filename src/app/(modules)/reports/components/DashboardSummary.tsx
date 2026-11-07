import {
  FileText,
  Send,
  SearchCheck,
  CheckCircle2,
  FileEdit,
} from "lucide-react";
import { IReportSummary } from "../types/reports.types";
import { UserRoleEnum } from "../../authentication/core/types/user-role.types";
import { cn } from "@/core/libraries/tailwind";

export const DashboardSummary = ({
  summary,
  role,
  loading,
}: {
  summary?: IReportSummary;
  role?: UserRoleEnum;
  loading?: boolean;
}) => {
  const isAdmin = role === UserRoleEnum.ADMIN;

  const cards = [
    {
      label: "Total Reports",
      value: summary?.total ?? 0,
      description: isAdmin
        ? "All submitted cases in platform"
        : "All reports created by you",
      icon: FileText,
      colorClass: "bg-slate-50 text-slate-700 border-slate-200",
      iconBgClass: "bg-slate-200/70 text-slate-700",
    },
    ...(!isAdmin
      ? [
          {
            label: "Draft Reports",
            value: summary?.draft ?? 0,
            description: "Saved drafts not yet submitted",
            icon: FileEdit,
            colorClass: "bg-gray-50 text-gray-700 border-gray-200",
            iconBgClass: "bg-gray-200/70 text-gray-700",
          },
        ]
      : []),
    {
      label: "Submitted Reports",
      value: summary?.submitted ?? 0,
      description: "Awaiting initial review",
      icon: Send,
      colorClass: "bg-blue-50/60 text-blue-900 border-blue-200",
      iconBgClass: "bg-blue-100 text-blue-600",
    },
    {
      label: "Under Review",
      value: summary?.underReview ?? 0,
      description: "Active investigation in progress",
      icon: SearchCheck,
      colorClass: "bg-amber-50/60 text-amber-900 border-amber-200",
      iconBgClass: "bg-amber-100 text-amber-600",
    },
    {
      label: "Resolved Reports",
      value: summary?.resolved ?? 0,
      description: "Investigation completed & closed",
      icon: CheckCircle2,
      colorClass: "bg-emerald-50/60 text-emerald-900 border-emerald-200",
      iconBgClass: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div
      className={cn(
        "grid gap-4",
        isAdmin
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
      )}
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={cn(
              "p-5 rounded-xl border shadow-sm flex flex-col justify-between gap-3 transition hover:shadow-md bg-white",
              card.colorClass,
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                {card.label}
              </span>
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                  card.iconBgClass,
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold tracking-tight">
                {loading ? "..." : card.value}
              </div>
              <p className="text-xs opacity-70 mt-1">{card.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
