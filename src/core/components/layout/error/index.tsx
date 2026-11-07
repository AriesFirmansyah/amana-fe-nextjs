"use client";

import { useMemo } from "react";

import { NotFoundError } from "./not-found";
import { MaintenanceError } from "./maintenance";
import { NoConnectionError } from "./no-connection";
import { InternalServerError } from "./internal-server";

export const Error = (props: ErrorPageProps) => {
  const errorRendered = useMemo(() => {
    switch (props.status) {
      case 404:
        return <NotFoundError {...props} />;
      case 500:
        return <InternalServerError {...props} />;
      case 503:
        return <MaintenanceError {...props} />;
      case 505:
        return <NoConnectionError {...props} />;
      default:
        return <InternalServerError {...props} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full gap-10 font-work-sans lg:mt-10">
      {errorRendered}
    </div>
  );
};
