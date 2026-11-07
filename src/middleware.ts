/** @format */

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import {
  getUserFromRequest,
  isAuthenticated,
} from "./core/libraries/authentication/index.libs";
import { UserRoleEnum } from "./app/(modules)/authentication/core/types/user-role.types";

export function middleware(request: NextRequest) {
  const isAuth = isAuthenticated(request);
  const { pathname } = request.nextUrl;

  if (pathname === "/authentication") {
    return NextResponse.redirect(
      new URL("/authentication/sign-in", request.url),
    );
  }

  if (pathname.startsWith("/authentication")) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuth) {
    return NextResponse.redirect(
      new URL("/authentication/sign-in", request.url),
    );
  }

  if (pathname.startsWith("/admin")) {
    const user = getUserFromRequest(request);
    if (user?.role !== UserRoleEnum.ADMIN) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/reports/:path*", "/admin/:path*", "/authentication/:path*"],
};
