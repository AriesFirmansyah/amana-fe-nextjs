export enum ReportStatusEnum {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  RESOLVED = "RESOLVED",
}

export enum ReportCategoryEnum {
  FRAUD = "FRAUD",
  HARASSMENT = "HARASSMENT",
  SAFETY_VIOLATION = "SAFETY_VIOLATION",
  MISUSE_OF_RESOURCES = "MISUSE_OF_RESOURCES",
  CORRUPTION = "CORRUPTION",
  CONFLICT_OF_INTEREST = "CONFLICT_OF_INTEREST",
  DATA_PRIVACY_BREACH = "DATA_PRIVACY_BREACH",
  OTHER = "OTHER",
}

export interface IReportReporter {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface IIncidentReport {
  id: number;
  referenceNumber: string;
  title: string;
  category: ReportCategoryEnum;
  description: string;
  incidentDate: string;
  status: ReportStatusEnum;
  adminNotes?: string | null;
  reporterId: number;
  reporter?: IReportReporter;
  createdAt: string;
  updatedAt: string;
}

export interface IReportSummary {
  total: number;
  draft: number;
  submitted: number;
  underReview: number;
  resolved: number;
}

export interface GetReportsParams {
  keywords?: string;
  category?: string;
  status?: string;
  page?: number;
  size?: number;
}

export interface GetReportsResponse {
  reports: IIncidentReport[];
  meta: {
    page: number;
    size: number;
    total_data: number;
    total_page: number;
  };
  summary: IReportSummary;
}
