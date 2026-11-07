import { Metadata } from "next";
import { ReportsDashboardView } from "./View";

export const metadata: Metadata = {
  title: "Whistleblowing & Case Management Platform",
};

const ReportsPage = () => {
  return <ReportsDashboardView />;
};

export default ReportsPage;
