"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OverallUsers } from "./OverallUsers";
import { Users } from "./Users";
import { Button } from "@/core/components/ui/button";

export const AdminUsersView = () => {
  return (
    <div className="max-w-7xl w-full mx-auto grid p-6 sm:p-10 gap-8 overflow-auto">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" className="text-xs">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Case Dashboard
          </Button>
        </Link>
      </div>
      <OverallUsers />
      <Users />
    </div>
  );
};
