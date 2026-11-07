"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FilePenLine,
  FolderKanban,
  Hash,
  Loader2Icon,
  Send,
  ShieldAlert,
  User,
  XCircleIcon,
} from "lucide-react";

import { Dialog } from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Textarea } from "@/core/components/ui/textarea";

import { IIncidentReport, ReportStatusEnum } from "../types/reports.types";
import { REPORT_CATEGORY_LABELS } from "../constants/reports.constant";
import { ReportStatusBadge } from "./ReportStatusBadge";
import { UserRoleEnum } from "../../authentication/core/types/user-role.types";
import {
  useSubmitDraftReportMutation,
  useUpdateReportMutation,
} from "../mutations/reports.mutation";

type ReportDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: IIncidentReport | null;
  role?: UserRoleEnum;
  onEditDraft?: (report: IIncidentReport) => void;
  onSuccess?: (message: string) => void;
};

export const ReportDetailDialog = ({
  open,
  onOpenChange,
  report,
  role,
  onEditDraft,
  onSuccess,
}: ReportDetailDialogProps) => {
  const isAdmin = role === UserRoleEnum.ADMIN;
  const updateMutation = useUpdateReportMutation();
  const submitDraftMutation = useSubmitDraftReportMutation();

  const [selectedStatus, setSelectedStatus] = useState<ReportStatusEnum>(
    ReportStatusEnum.SUBMITTED,
  );
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (report && open) {
      setSelectedStatus(report.status);
      setAdminNotes(report.adminNotes || "");
      setErrorMessage(null);
    }
  }, [report, open]);

  if (!report) return null;

  const handleAdminUpdate = async () => {
    setErrorMessage(null);
    try {
      await updateMutation.mutateAsync({
        id: report.id,
        data: {
          status: selectedStatus,
          adminNotes,
        },
      });
      onOpenChange(false);
      onSuccess?.(
        `Case ${report.referenceNumber} status updated to ${selectedStatus.replace("_", " ")}.`,
      );
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to update investigation status.");
    }
  };

  const handleReporterSubmitDraft = async () => {
    setErrorMessage(null);
    try {
      await submitDraftMutation.mutateAsync(report.id);
      onOpenChange(false);
      onSuccess?.(
        `Report ${report.referenceNumber} has been submitted for investigation.`,
      );
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to submit draft report.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Content
        className="gap-5 max-h-[90vh] overflow-y-auto"
        maxWidth="!w-[95vw] sm:!w-[680px]"
      >
        <Dialog.Header className="relative pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5 flex-wrap pr-8">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-mono text-xs font-semibold">
              <Hash className="w-3.5 h-3.5" />
              {report.referenceNumber}
            </span>
            <ReportStatusBadge status={report.status} />
          </div>
          <Dialog.Title className="text-lg font-bold text-gray-900 mt-2">
            {report.title}
          </Dialog.Title>
          <Dialog.Close className="absolute right-0 top-1 flex items-center justify-center text-gray-400 hover:text-gray-600">
            <XCircleIcon className="w-5 h-5" />
          </Dialog.Close>
        </Dialog.Header>

        {errorMessage && (
          <div className="p-3 rounded bg-red-50 border-l-4 border-red-500 text-xs text-red-600">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-sky-600" />
              Category
            </span>
            <span className="font-semibold text-gray-800">
              {REPORT_CATEGORY_LABELS[report.category] || report.category}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              Incident Date
            </span>
            <span className="font-semibold text-gray-800">
              {moment(report.incidentDate).format("DD MMMM YYYY")}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              Last Updated
            </span>
            <span className="font-semibold text-gray-800">
              {moment(report.updatedAt).format("DD MMM YYYY, HH:mm")}
            </span>
          </div>

          {report.reporter && (
            <div className="flex flex-col gap-1 sm:col-span-3 pt-2 border-t border-gray-200/60">
              <span className="text-gray-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-600" />
                Submitted By
              </span>
              <span className="font-semibold text-gray-800">
                {report.reporter.name} ({report.reporter.email})
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Incident Description
          </h3>
          <div className="p-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
            {report.description}
          </div>
        </div>

        {!isAdmin && report.adminNotes && (
          <div className="grid gap-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              Investigation / Administrator Notes
            </h3>
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-950 whitespace-pre-wrap leading-relaxed">
              {report.adminNotes}
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="grid gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <ShieldAlert className="w-4 h-4 text-sky-600" />
              Administrator Case Management
            </div>

            <div className="grid gap-2">
              <label className="text-xs font-semibold text-gray-700">
                Investigation Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    status: ReportStatusEnum.SUBMITTED,
                    label: "Submitted",
                  },
                  {
                    status: ReportStatusEnum.UNDER_REVIEW,
                    label: "Under Review",
                  },
                  {
                    status: ReportStatusEnum.RESOLVED,
                    label: "Resolved",
                  },
                ].map((item) => (
                  <button
                    key={item.status}
                    type="button"
                    onClick={() => setSelectedStatus(item.status)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition flex items-center justify-center gap-1.5 ${
                      selectedStatus === item.status
                        ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {selectedStatus === item.status && (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Investigation Notes / Resolution Summary
              </label>
              <Textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add investigation findings, actions taken, or resolution notes..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
              <Button
                type="button"
                disabled={updateMutation.isPending}
                onClick={handleAdminUpdate}
              >
                {updateMutation.isPending && (
                  <Loader2Icon className="w-4 h-4 animate-spin mr-1.5" />
                )}
                Update Investigation Status
              </Button>
            </div>
          </div>
        )}

        {!isAdmin && (
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            {report.status === ReportStatusEnum.DRAFT && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onOpenChange(false);
                    onEditDraft?.(report);
                  }}
                >
                  <FilePenLine className="w-4 h-4 mr-1.5" />
                  Edit Draft
                </Button>
                <Button
                  type="button"
                  disabled={submitDraftMutation.isPending}
                  onClick={handleReporterSubmitDraft}
                >
                  {submitDraftMutation.isPending ? (
                    <Loader2Icon className="w-4 h-4 animate-spin mr-1.5" />
                  ) : (
                    <Send className="w-4 h-4 mr-1.5" />
                  )}
                  Submit Report Now
                </Button>
              </>
            )}
          </div>
        )}
      </Dialog.Content>
    </Dialog>
  );
};
