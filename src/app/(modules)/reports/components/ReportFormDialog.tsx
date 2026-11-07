"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import {
  Check,
  ChevronDown,
  Loader2Icon,
  Save,
  Send,
  XCircleIcon,
  XIcon,
} from "lucide-react";

import { Dialog } from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { Textarea } from "@/core/components/ui/textarea";
import { Button } from "@/core/components/ui/button";
import { DropdownMenu } from "@/core/components/ui/dropdown";
import { Form, FormProvider } from "@/core/components/ui/form";
import { cn } from "@/core/libraries/tailwind";

import {
  IIncidentReport,
  ReportCategoryEnum,
  ReportStatusEnum,
} from "../types/reports.types";
import {
  REPORT_CATEGORIES_OPTIONS,
  REPORT_CATEGORY_LABELS,
} from "../constants/reports.constant";
import {
  reportFormSchema,
  ReportFormValues,
} from "../schemas/report.schema";
import {
  useCreateReportMutation,
  useUpdateReportMutation,
} from "../mutations/reports.mutation";

type ReportFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  report?: IIncidentReport | null;
  onSuccess?: (message: string) => void;
};

export const ReportFormDialog = ({
  open,
  onOpenChange,
  mode,
  report,
  onSuccess,
}: ReportFormDialogProps) => {
  const createMutation = useCreateReportMutation();
  const updateMutation = useUpdateReportMutation();

  const [submitAction, setSubmitAction] = useState<
    ReportStatusEnum.DRAFT | ReportStatusEnum.SUBMITTED
  >(ReportStatusEnum.DRAFT);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: "",
      category: ReportCategoryEnum.MISUSE_OF_RESOURCES,
      incidentDate: moment().format("YYYY-MM-DD"),
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      setErrorMessage(null);
      if (mode === "edit" && report) {
        form.reset({
          title: report.title,
          category: report.category,
          incidentDate: moment(report.incidentDate).format("YYYY-MM-DD"),
          description: report.description,
        });
      } else {
        form.reset({
          title: "",
          category: ReportCategoryEnum.MISUSE_OF_RESOURCES,
          incidentDate: moment().format("YYYY-MM-DD"),
          description: "",
        });
      }
    }
  }, [open, mode, report, form]);

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleFormSubmit = async (
    values: ReportFormValues,
    targetStatus: ReportStatusEnum.DRAFT | ReportStatusEnum.SUBMITTED,
  ) => {
    setErrorMessage(null);
    setSubmitAction(targetStatus);

    try {
      if (mode === "create") {
        await createMutation.mutateAsync({
          ...values,
          status: targetStatus,
        });
        onOpenChange(false);
        onSuccess?.(
          targetStatus === ReportStatusEnum.SUBMITTED
            ? "Report created and submitted successfully."
            : "Report saved as draft.",
        );
      } else if (mode === "edit" && report) {
        await updateMutation.mutateAsync({
          id: report.id,
          data: {
            ...values,
            status: targetStatus,
          },
        });
        onOpenChange(false);
        onSuccess?.(
          targetStatus === ReportStatusEnum.SUBMITTED
            ? "Draft report updated and submitted successfully."
            : "Draft report updated successfully.",
        );
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Failed to save incident report. Please try again.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="gap-4 max-h-[90vh] overflow-y-auto" maxWidth="!w-[95vw] sm:!w-[600px]">
        <Dialog.Header className="relative pb-3 border-b border-gray-100">
          <Dialog.Title className="text-lg font-bold text-gray-900">
            {mode === "create"
              ? "Create New Incident Report"
              : `Edit Draft Report (${report?.referenceNumber})`}
          </Dialog.Title>
          <Dialog.Description>
            {mode === "create"
              ? "Provide accurate details of the incident. You can save as a draft first or submit directly for review."
              : "Update the details of your draft report before submitting it to the investigation team."}
          </Dialog.Description>
          <Dialog.Close className="absolute right-0 top-2 flex items-center justify-center text-gray-400 hover:text-gray-600">
            <XCircleIcon className="w-5 h-5" />
          </Dialog.Close>
        </Dialog.Header>

        <FormProvider {...form}>
          {errorMessage && (
            <div className="flex items-start gap-3 border-l-4 border-red-500 p-3 bg-red-50 text-red-600 text-xs rounded">
              <div className="flex-1">{errorMessage}</div>
              <button type="button" onClick={() => setErrorMessage(null)}>
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          <Form
            className="grid gap-4"
            onSubmit={form.handleSubmit((vals) =>
              handleFormSubmit(vals, submitAction),
            )}
          >
            <Form.Field
              control={form.control}
              name="title"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>Incident Title</Form.Label>
                  <Form.Control>
                    <Input
                      {...field}
                      placeholder="e.g. Suspected Misuse of Company Resources"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Field
                control={form.control}
                name="category"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label required>Category</Form.Label>
                    <DropdownMenu>
                      <Form.Control>
                        <DropdownMenu.Trigger asChild>
                          <button
                            type="button"
                            className="w-full flex items-center justify-between gap-2 rounded border border-neutral-outline bg-neutral-text py-2 px-3 text-xs text-neutral-default hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:border-primary-500 transition"
                          >
                            <span className="truncate">
                              {REPORT_CATEGORY_LABELS[field.value] ||
                                field.value}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          </button>
                        </DropdownMenu.Trigger>
                      </Form.Control>
                      <DropdownMenu.Content
                        align="start"
                        className="w-[260px] rounded-xl border border-gray-200 p-1.5 shadow-lg"
                      >
                        {REPORT_CATEGORIES_OPTIONS.map((opt) => {
                          const isSelected = field.value === opt.value;
                          return (
                            <DropdownMenu.Item
                              key={opt.value}
                              onSelect={() => field.onChange(opt.value)}
                              className={cn(
                                "flex items-center justify-between gap-2 px-2.5 py-2 text-xs rounded-lg cursor-pointer transition-colors",
                                isSelected
                                  ? "bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 hover:text-sky-800"
                                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                              )}
                            >
                              <span>{opt.label}</span>
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                              )}
                            </DropdownMenu.Item>
                          );
                        })}
                      </DropdownMenu.Content>
                    </DropdownMenu>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name="incidentDate"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label required>Incident Date</Form.Label>
                    <Form.Control>
                      <Input
                        {...field}
                        type="date"
                        max={moment().format("YYYY-MM-DD")}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </div>

            <Form.Field
              control={form.control}
              name="description"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>Incident Description</Form.Label>
                  <Form.Control>
                    <Textarea
                      {...field}
                      rows={5}
                      placeholder="Describe what happened, when, where, and any relevant context or evidence..."
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                className="!border-sky-600 !text-sky-700 hover:!bg-sky-50"
                onClick={form.handleSubmit((vals) =>
                  handleFormSubmit(vals, ReportStatusEnum.DRAFT),
                )}
              >
                {isLoading && submitAction === ReportStatusEnum.DRAFT ? (
                  <Loader2Icon className="w-4 h-4 animate-spin mr-1.5" />
                ) : (
                  <Save className="w-4 h-4 mr-1.5" />
                )}
                Save as Draft
              </Button>
              <Button
                type="button"
                disabled={isLoading}
                onClick={form.handleSubmit((vals) =>
                  handleFormSubmit(vals, ReportStatusEnum.SUBMITTED),
                )}
              >
                {isLoading && submitAction === ReportStatusEnum.SUBMITTED ? (
                  <Loader2Icon className="w-4 h-4 animate-spin mr-1.5" />
                ) : (
                  <Send className="w-4 h-4 mr-1.5" />
                )}
                Submit Report
              </Button>
            </div>
          </Form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
};
