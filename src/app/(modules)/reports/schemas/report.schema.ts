import * as z from "zod";
import { ReportCategoryEnum, ReportStatusEnum } from "../types/reports.types";

export const reportFormSchema = z.object({
  title: z
    .string({ required_error: "Report title is required." })
    .trim()
    .min(5, "Title must be at least 5 characters.")
    .max(191, "Title must not exceed 191 characters."),
  category: z.nativeEnum(ReportCategoryEnum, {
    errorMap: () => ({ message: "Please select an incident category." }),
  }),
  incidentDate: z
    .string({ required_error: "Incident date is required." })
    .min(1, "Incident date is required.")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Please enter a valid date.",
    }),
  description: z
    .string({ required_error: "Incident description is required." })
    .trim()
    .min(10, "Description must be at least 10 characters."),
});

export type ReportFormValues = z.infer<typeof reportFormSchema>;

export const adminReviewSchema = z.object({
  status: z.enum([
    ReportStatusEnum.SUBMITTED,
    ReportStatusEnum.UNDER_REVIEW,
    ReportStatusEnum.RESOLVED,
  ]),
  adminNotes: z.string().optional(),
});

export type AdminReviewValues = z.infer<typeof adminReviewSchema>;
