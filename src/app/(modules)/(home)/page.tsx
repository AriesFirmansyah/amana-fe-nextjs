import { Metadata } from "next";
import { HomeView } from "./View";

export const metadata: Metadata = {
  title: "Whistleblowing & Case Management Platform",
};

const Page = () => {
  return <HomeView />;
};

export default Page;
