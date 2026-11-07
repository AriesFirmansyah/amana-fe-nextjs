import { Metadata } from "next";
import { SignInView } from "./SignInView";

export const metadata: Metadata = {
  title: "Sign in",
};

const Page = () => {
  return <SignInView />;
};

export default Page;
