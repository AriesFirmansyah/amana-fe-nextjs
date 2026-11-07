"use client";

import { SignInForm } from "./SignInForm";
import { ShieldCheck } from "lucide-react";

export const SignInView = () => {
  return (
    <div className="grid gap-6 max-w-[420px] w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Whistleblowing Platform
        </h1>
        <p className="text-xs text-gray-500">
          Secure Incident Reporting & Case Management System
        </p>
      </div>
      <SignInForm />
    </div>
  );
};
