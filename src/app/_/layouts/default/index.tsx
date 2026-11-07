"use client";

import React, { Fragment } from "react";
import useConnection from "@/core/hooks/Connection";
import { Error } from "@/core/components/layout/error";
import { cn } from "@/core/libraries/tailwind";

type Props = {
  children: React.ReactNode;
};

export const DefaultLayout = ({ children }: Props) => {
  const isOnline = useConnection();

  return (
    <Fragment>
      <main
        className={cn(
          "flex flex-col flex-1 h-full font-work-sans",
        )}
      >
        <section className="flex flex-col flex-1 w-full h-full">
          {isOnline ? children : <Error status={505} />}
        </section>
      </main>
    </Fragment>
  );
};
