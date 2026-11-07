"use client";

import { type FC, type ReactNode, useEffect } from "react";

import { useAccount } from "./useAccount";
import { useAuthState } from "./store/useAuthStore";
import { SplashScreen } from "@/core/components/layout/splash-screen";

export const AccountProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { profile } = useAccount();
  const { dispatch } = useAuthState();

  useEffect(() => {
    if (profile.data) dispatch.assignProfile(profile.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  if (profile.isLoading) return <SplashScreen />;
  return children;
};
