import { axios } from "@/core/libraries/axios/index.libs";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/app/_/plugins/react-query";
import {
  ReportCategoryEnum,
  ReportStatusEnum,
} from "../types/reports.types";

export type CreateReportPayload = {
  title: string;
  category: ReportCategoryEnum;
  description: string;
  incidentDate: string;
  status?: ReportStatusEnum.DRAFT | ReportStatusEnum.SUBMITTED;
};

export type UpdateReportPayload = {
  id: number;
  data: {
    title?: string;
    category?: ReportCategoryEnum;
    description?: string;
    incidentDate?: string;
    status?: ReportStatusEnum;
    adminNotes?: string;
  };
};

export const useCreateReportMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateReportPayload) => {
      return axios.post("/api/v1/reports", payload);
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};

export const useUpdateReportMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateReportPayload) => {
      return axios.put(`/api/v1/reports/${id}`, data);
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: ["reports"] });
      client.invalidateQueries({ queryKey: ["report_detail"] });
    },
  });
};

export const useSubmitDraftReportMutation = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return axios.patch(`/api/v1/reports/${id}/submit`);
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: ["reports"] });
      client.invalidateQueries({ queryKey: ["report_detail"] });
    },
  });
};

export const useDeleteReportMutation = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`/api/v1/reports/${id}`);
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};
