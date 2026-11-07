"use client";

import { Fragment, useState } from "react";
import moment from "moment";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  FilePenLine,
  Filter,
  InboxIcon,
  Loader2Icon,
  LogOut,
  PlusIcon,
  Send,
  ShieldCheck,
  Trash2,
  Users,
  XIcon,
} from "lucide-react";

import { useAuthState } from "../authentication/core/store/useAuthStore";
import { useLogout } from "../authentication/core/useLogout";
import { UserRoleEnum } from "../authentication/core/types/user-role.types";
import { useDebouncedValue } from "@/core/hooks/debounce";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Table } from "@/core/components/ui/table";
import { DropdownMenu } from "@/core/components/ui/dropdown";
import { cn } from "@/core/libraries/tailwind";

import { IIncidentReport, ReportStatusEnum } from "./types/reports.types";
import {
  REPORT_CATEGORIES_OPTIONS,
  REPORT_CATEGORY_LABELS,
} from "./constants/reports.constant";
import { useGetReportsQuery } from "./queries/reports.query";
import { useSubmitDraftReportMutation } from "./mutations/reports.mutation";
import { DashboardSummary } from "./components/DashboardSummary";
import { ReportStatusBadge } from "./components/ReportStatusBadge";
import { ReportFormDialog } from "./components/ReportFormDialog";
import { ReportDetailDialog } from "./components/ReportDetailDialog";
import { DeleteReportDialog } from "./components/DeleteReportDialog";

export const ReportsDashboardView = () => {
  const { state } = useAuthState();
  const { logout } = useLogout();
  const submitDraftMutation = useSubmitDraftReportMutation();

  const user = state.account.profile;
  const role = state.access.role || user?.role || UserRoleEnum.REPORTER;
  const isAdmin = role === UserRoleEnum.ADMIN;

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedReport, setSelectedReport] = useState<IIncidentReport | null>(
    null,
  );
  const [detailDialogOpen, setDetailDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [toastBanner, setToastBanner] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(searchValue, 400);

  const reportsQuery = useGetReportsQuery({
    enabled: Boolean(state.access.token),
    params: {
      keywords: debouncedSearch || undefined,
      status: selectedStatus !== "ALL" ? selectedStatus : undefined,
      category: selectedCategory !== "ALL" ? selectedCategory : undefined,
      page,
      size: pageSize,
    },
  });

  const reports = reportsQuery.data?.reports || [];
  const summary = reportsQuery.data?.summary;
  const meta = reportsQuery.data?.meta;

  const showToast = (msg: string) => {
    setToastBanner(msg);
    setTimeout(() => {
      setToastBanner((prev) => (prev === msg ? null : prev));
    }, 5000);
  };

  const handleOpenCreate = () => {
    setSelectedReport(null);
    setFormMode("create");
    setFormDialogOpen(true);
  };

  const handleOpenEdit = (report: IIncidentReport) => {
    setSelectedReport(report);
    setFormMode("edit");
    setFormDialogOpen(true);
  };

  const handleOpenDetail = (report: IIncidentReport) => {
    setSelectedReport(report);
    setDetailDialogOpen(true);
  };

  const handleOpenDelete = (report: IIncidentReport) => {
    setSelectedReport(report);
    setDeleteDialogOpen(true);
  };

  const handleQuickSubmitDraft = async (report: IIncidentReport) => {
    try {
      await submitDraftMutation.mutateAsync(report.id);
      showToast(
        `Draft report "${report.title}" (${report.referenceNumber}) submitted successfully!`,
      );
    } catch (_e) {
      console.error(_e);
    }
  };

  const statusTabs = [
    { key: "ALL", label: "All Reports" },
    ...(!isAdmin ? [{ key: ReportStatusEnum.DRAFT, label: "Draft" }] : []),
    { key: ReportStatusEnum.SUBMITTED, label: "Submitted" },
    { key: ReportStatusEnum.UNDER_REVIEW, label: "Under Review" },
    { key: ReportStatusEnum.RESOLVED, label: "Resolved" },
  ];

  return (
    <Fragment>
      {/* Detailed Report View & Admin Review Modal */}
      <ReportDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        report={selectedReport}
        role={role}
        onEditDraft={(rep) => handleOpenEdit(rep)}
        onSuccess={showToast}
      />

      {/* Create / Edit Draft Modal */}
      <ReportFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        mode={formMode}
        report={selectedReport}
        onSuccess={showToast}
      />

      {/* Delete Draft Confirmation Modal */}
      <DeleteReportDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        report={selectedReport}
        onSuccess={showToast}
      />

      <div className="min-h-screen flex flex-col bg-gray-50/50">
        {/* Top Navigation Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900">
                    Amana Whistleblowing Platform
                  </h1>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide",
                      isAdmin
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-sky-100 text-sky-700",
                    )}
                  >
                    {isAdmin ? "Administrator" : "Reporter"}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Confidential Incident Reporting & Case Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user && (
                <div className="hidden sm:flex flex-col items-end text-xs">
                  <span className="font-semibold text-gray-800">
                    {user.name}
                  </span>
                  <span className="text-gray-500">{user.email}</span>
                </div>
              )}

              {isAdmin && (
                <Link href="/admin/users">
                  <Button
                    variant="outline"
                    className="text-xs"
                  >
                    <Users className="w-4 h-4 mr-1.5" />
                    Manage Users
                  </Button>
                </Link>
              )}

              <Button
                variant="outline"
                onClick={logout}
                className="text-xs !border-red-200 !text-red-600 hover:!bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl w-full mx-auto px-6 py-8 grid gap-8">
          {toastBanner && (
            <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{toastBanner}</span>
              </div>
              <button
                type="button"
                onClick={() => setToastBanner(null)}
                className="text-emerald-600 hover:text-emerald-800"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Section 1: Reporting Dashboard Summary */}
          <section className="grid gap-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isAdmin
                    ? "Case Investigation Dashboard"
                    : "My Incident Reports Dashboard"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isAdmin
                    ? "Monitor submitted reports, review incident details, and update investigation statuses."
                    : "Create new incident reports, manage your saved drafts, and track investigation status."}
                </p>
              </div>

              {!isAdmin && (
                <Button onClick={handleOpenCreate}>
                  <PlusIcon className="w-4 h-4 mr-1.5" />
                  Create Incident Report
                </Button>
              )}
            </div>

            <DashboardSummary
              summary={summary}
              role={role}
              loading={reportsQuery.isLoading}
            />
          </section>

          {/* Section 2: Search, Filter & Incident Reports Table */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 grid gap-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Status Filter Tabs */}
              <div className="bg-gray-100 rounded-xl p-1 flex flex-wrap gap-1 w-fit">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(tab.key);
                      setPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      selectedStatus === tab.key
                        ? "bg-white text-gray-900 shadow-sm font-semibold"
                        : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search by Title & Filter by Category */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                <DropdownMenu>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      aria-label="Filter by category"
                      className="inline-flex items-center justify-between gap-2.5 min-w-[210px] w-full sm:w-auto rounded-lg border border-neutral-outline bg-white py-2 px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:border-primary-500 transition"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Filter className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">
                          {selectedCategory === "ALL"
                            ? "All Categories"
                            : REPORT_CATEGORY_LABELS[
                                selectedCategory as keyof typeof REPORT_CATEGORY_LABELS
                              ] || selectedCategory}
                        </span>
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content
                    align="end"
                    className="w-[220px] rounded-xl border border-gray-200 p-1.5 shadow-lg"
                  >
                    <DropdownMenu.Item
                      onSelect={() => {
                        setSelectedCategory("ALL");
                        setPage(1);
                      }}
                      className={cn(
                        "flex items-center justify-between gap-2 px-2.5 py-2 text-xs rounded-lg cursor-pointer transition-colors",
                        selectedCategory === "ALL"
                          ? "bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 hover:text-sky-800"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      )}
                    >
                      <span>All Categories</span>
                      {selectedCategory === "ALL" && (
                        <Check className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                      )}
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="my-1 bg-gray-100" />

                    {REPORT_CATEGORIES_OPTIONS.map((opt) => {
                      const isSelected = selectedCategory === opt.value;
                      return (
                        <DropdownMenu.Item
                          key={opt.value}
                          onSelect={() => {
                            setSelectedCategory(opt.value);
                            setPage(1);
                          }}
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

                <div className="w-full sm:w-[260px]">
                  <Input.Search
                    value={searchValue}
                    onChange={(val) => {
                      setSearchValue(val);
                      setPage(1);
                    }}
                    className="rounded-lg"
                    placeholder="Search by title or reference #..."
                  />
                </div>
              </div>
            </div>

            {/* Reports Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <Table className="w-full">
                <Table.Header>
                  <Table.Row className="bg-gray-50">
                    <Table.Head className="text-xs font-semibold text-gray-600">
                      Reference #
                    </Table.Head>
                    <Table.Head className="text-xs font-semibold text-gray-600">
                      Title
                    </Table.Head>
                    <Table.Head className="text-xs font-semibold text-gray-600">
                      Category
                    </Table.Head>
                    <Table.Head className="text-xs font-semibold text-gray-600">
                      Incident Date
                    </Table.Head>
                    {isAdmin && (
                      <Table.Head className="text-xs font-semibold text-gray-600">
                        Reporter
                      </Table.Head>
                    )}
                    <Table.Head className="text-xs font-semibold text-gray-600">
                      Status
                    </Table.Head>
                    <Table.Head className="text-xs font-semibold text-gray-600 text-right">
                      Actions
                    </Table.Head>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {reportsQuery.isLoading ? (
                    <Table.Row>
                      <Table.Cell
                        colSpan={isAdmin ? 7 : 6}
                        className="h-32 text-center"
                      >
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                          <Loader2Icon className="w-5 h-5 animate-spin text-sky-600" />
                          <span>Loading incident reports...</span>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ) : reports.length === 0 ? (
                    <Table.Row>
                      <Table.Cell
                        colSpan={isAdmin ? 7 : 6}
                        className="h-36 text-center"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 text-xs text-gray-400">
                          <InboxIcon className="w-8 h-8 stroke-1" />
                          <p className="font-medium text-gray-600">
                            No incident reports found
                          </p>
                          <p>
                            {!isAdmin
                              ? "Create a new incident report or adjust your search filters."
                              : "No submitted reports match your current filter criteria."}
                          </p>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    reports.map((report) => (
                      <Table.Row
                        key={report.id}
                        className="hover:bg-gray-50/80 transition"
                      >
                        <Table.Cell className="font-mono text-xs font-semibold text-slate-700 whitespace-nowrap">
                          {report.referenceNumber}
                        </Table.Cell>
                        <Table.Cell className="max-w-[280px]">
                          <div
                            className="font-semibold text-xs text-gray-900 truncate cursor-pointer hover:text-sky-600"
                            onClick={() => handleOpenDetail(report)}
                          >
                            {report.title}
                          </div>
                          <div className="text-[11px] text-gray-500 truncate mt-0.5">
                            {report.description}
                          </div>
                        </Table.Cell>
                        <Table.Cell className="text-xs text-gray-700 whitespace-nowrap">
                          {REPORT_CATEGORY_LABELS[report.category] ||
                            report.category}
                        </Table.Cell>
                        <Table.Cell className="text-xs text-gray-600 whitespace-nowrap">
                          {moment(report.incidentDate).format("DD MMM YYYY")}
                        </Table.Cell>
                        {isAdmin && (
                          <Table.Cell className="text-xs text-gray-700 whitespace-nowrap">
                            <div className="font-medium">
                              {report.reporter?.name || "Employee"}
                            </div>
                            <div className="text-[11px] text-gray-400">
                              {report.reporter?.email}
                            </div>
                          </Table.Cell>
                        )}
                        <Table.Cell className="whitespace-nowrap">
                          <ReportStatusBadge status={report.status} />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenDetail(report)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{isAdmin ? "Review Case" : "View"}</span>
                            </button>

                            {!isAdmin &&
                              report.status === ReportStatusEnum.DRAFT && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEdit(report)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 transition"
                                    title="Edit Draft"
                                  >
                                    <FilePenLine className="w-3.5 h-3.5" />
                                    <span>Edit</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleQuickSubmitDraft(report)
                                    }
                                    disabled={submitDraftMutation.isPending}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
                                    title="Submit Report"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Submit</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleOpenDelete(report)}
                                    className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
                                    title="Delete Draft"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>

            {/* Pagination Footer */}
            {meta && meta.total_page >= 1 && (
              <div className="flex items-center justify-between pt-2 text-xs text-gray-600">
                <span>
                  Showing page <strong>{meta.page}</strong> of{" "}
                  <strong>{Math.max(1, meta.total_page)}</strong> (
                  {meta.total_data} total reports)
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="text-xs py-1 px-3"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    disabled={page >= Math.max(1, meta.total_page)}
                    onClick={() =>
                      setPage((p) =>
                        Math.min(Math.max(1, meta.total_page), p + 1),
                      )
                    }
                    className="text-xs py-1 px-3"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </Fragment>
  );
};
