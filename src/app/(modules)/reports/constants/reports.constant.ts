import { ReportCategoryEnum, ReportStatusEnum } from "../types/reports.types";

export const REPORT_CATEGORY_LABELS: Record<ReportCategoryEnum, string> = {
  [ReportCategoryEnum.MISUSE_OF_RESOURCES]: "Misuse of Resources",
  [ReportCategoryEnum.FRAUD]: "Fraud & Financial Irregularity",
  [ReportCategoryEnum.CORRUPTION]: "Bribery & Corruption",
  [ReportCategoryEnum.HARASSMENT]: "Workplace Harassment",
  [ReportCategoryEnum.SAFETY_VIOLATION]: "Health & Safety Violation",
  [ReportCategoryEnum.CONFLICT_OF_INTEREST]: "Conflict of Interest",
  [ReportCategoryEnum.DATA_PRIVACY_BREACH]: "Data & Privacy Breach",
  [ReportCategoryEnum.OTHER]: "Other Misconduct",
};

export const REPORT_STATUS_LABELS: Record<ReportStatusEnum, string> = {
  [ReportStatusEnum.DRAFT]: "Draft",
  [ReportStatusEnum.SUBMITTED]: "Submitted",
  [ReportStatusEnum.UNDER_REVIEW]: "Under Review",
  [ReportStatusEnum.RESOLVED]: "Resolved",
};

export const REPORT_CATEGORIES_OPTIONS = Object.entries(
  REPORT_CATEGORY_LABELS,
).map(([value, label]) => ({
  value: value as ReportCategoryEnum,
  label,
}));
