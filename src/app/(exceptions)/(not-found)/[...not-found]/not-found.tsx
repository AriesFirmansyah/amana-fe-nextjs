"use client";

import { Error } from "@/core/components/layout/error";

const NotFound = () => {
  return (
    <div className="flex items-center flex-1 h-[100vh]">
      <Error status={404} />
    </div>
  );
};

export default NotFound;
