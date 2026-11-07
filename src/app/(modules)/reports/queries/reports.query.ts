import { axios } from "@/core/libraries/axios/index.libs";
import { useQuery } from "@tanstack/react-query";
import {
  GetReportsParams,
  GetReportsResponse,
  IIncidentReport,
} from "../types/reports.types";

export const useGetReportsQuery = (args: {
  enabled?: boolean;
  params?: GetReportsParams;
}) => {
  return useQuery({
    enabled: args.enabled ?? true,
    queryKey: ["reports", args.params],
    queryFn: async () => {
      const { data } = await axios.get("/api/v1/reports", {
        params: args.params,
      });
      return data;
    },
    select: (data): GetReportsResponse => data.data,
  });
};

export const useGetReportDetailQuery = (id?: number, enabled = true) => {
  return useQuery({
    enabled: Boolean(id) && enabled,
    queryKey: ["report_detail", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/v1/reports/${id}`);
      return data;
    },
    select: (data): IIncidentReport => data.data,
  });
};
