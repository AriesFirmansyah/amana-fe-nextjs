import { Metadata } from "next";
import { AdminUsersView } from "./View";

export const metadata: Metadata = {
  title: "Admin | Users",
};

const Page = () => <AdminUsersView />;

export default Page;
