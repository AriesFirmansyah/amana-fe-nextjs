"use client";

import { useState } from "react";
import { AlertTriangle, Loader2Icon, Trash2, XCircleIcon } from "lucide-react";
import { Dialog } from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { IIncidentReport } from "../types/reports.types";
import { useDeleteReportMutation } from "../mutations/reports.mutation";

type DeleteReportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: IIncidentReport | null;
  onSuccess?: (message: string) => void;
};

export const DeleteReportDialog = ({
  open,
  onOpenChange,
  report,
  onSuccess,
}: DeleteReportDialogProps) => {
  const deleteMutation = useDeleteReportMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!report) return null;

  const handleConfirmDelete = async () => {
    setErrorMsg(null);
    try {
      await deleteMutation.mutateAsync(report.id);
      onOpenChange(false);
      onSuccess?.(
        `Draft report "${report.title}" (${report.referenceNumber}) deleted successfully.`,
      );
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to delete draft report.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="gap-4" maxWidth="!w-[92vw] sm:!w-[460px]">
        <Dialog.Header className="relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <Dialog.Title className="text-base font-bold text-gray-900">
                Delete Draft Report?
              </Dialog.Title>
              <Dialog.Description>
                This action cannot be undone.
              </Dialog.Description>
            </div>
          </div>
          <Dialog.Close className="absolute right-0 top-1 text-gray-400 hover:text-gray-600">
            <XCircleIcon className="w-5 h-5" />
          </Dialog.Close>
        </Dialog.Header>

        {errorMsg && (
          <div className="p-3 rounded bg-red-50 border-l-4 border-red-500 text-xs text-red-600">
            {errorMsg}
          </div>
        )}

        <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 text-xs grid gap-1">
          <span className="font-mono text-gray-500">
            {report.referenceNumber}
          </span>
          <span className="font-semibold text-gray-800">{report.title}</span>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={deleteMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={deleteMutation.isPending}
            className="!bg-red-600 hover:!bg-red-700 !text-white !border-red-600"
            onClick={handleConfirmDelete}
          >
            {deleteMutation.isPending ? (
              <Loader2Icon className="w-4 h-4 animate-spin mr-1.5" />
            ) : (
              <Trash2 className="w-4 h-4 mr-1.5" />
            )}
            Yes, Delete Draft
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
