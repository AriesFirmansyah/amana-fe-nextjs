"use client";

import { ReactNode, Suspense } from "react";

import useConnection from "@/core/hooks/Connection";

import { Error } from "@/core/components/layout/error";
import { Loader } from "@/core/components/ui/loaders";
import { LoginBanner as AuthenticationBanner } from "@/core/constant/images";

const AuthenticationLayout = ({ children }: { children: ReactNode }) => {
  const isOnline = useConnection();

  if (!isOnline) {
    return (
      <div className="flex min-h-screen lg:items-center lg:justify-center">
        <Error status={505} />
      </div>
    );
  }

  const FallbackHandler = () => {
    return (
      <div className="flex min-h-screen lg:items-center lg:justify-center lg:container ">
        <Loader />
      </div>
    );
  };

  return (
    <Suspense fallback={<FallbackHandler />}>
      <main className="flex flex-col justify-center w-full min-h-screen gap-5 2xl: 2xl:flex-row p-5">
        <aside
          id="leftside"
          className="relative grid items-center justify-center 2xl:w-1/2 lg:flex font-work-sans h-fit 2xl:h-screen"
        >
          <AuthenticationBanner className="object-contain w-[350px] h-[300px] 2xl:h-full sm:w-[400px] max-w-[800px] 2xl:w-full" />
        </aside>
        <section
          id="rightside"
          className="grid justify-center 2xl:items-center 2xl:w-1/2 font-work-sans "
        >
          {children}
        </section>
      </main>
    </Suspense>
  );
};

export default AuthenticationLayout;
