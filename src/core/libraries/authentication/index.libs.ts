import { IUser } from "@/app/(modules)/authentication/core/types/user.types";
import { EncryptionUtil } from "@/core/utilities/encryption";
import { type NextRequest } from "next/server";

export const isAuthenticated = (request: NextRequest) => {
  const userData = getCookie(request, "user");
  const accessToken = getCookie(request, "access_token");

  return Boolean(accessToken && userData);
};

export const getUserFromRequest = (request: NextRequest): IUser | null => {
  const userCookie = getCookie(request, "user");
  if (!userCookie) return null;
  try {
    return JSON.parse(userCookie) as IUser;
  } catch (_e) {
    return null;
  }
};

const getCookie = (request: NextRequest, key: string) => {
  const cookies = request.cookies.getAll();

  const directCookie = cookies.find((v) => v.name === key)?.value;
  if (directCookie) return directCookie;
  const encryptedCookie = cookies.find((v) => {
    try {
      return EncryptionUtil.AESdecrypt(v.name) === key;
    } catch (_e) {
      return false;
    }
  })?.value;

  if (!encryptedCookie) return null;

  try {
    const value = EncryptionUtil.AESdecrypt(encryptedCookie);
    return value || null;
  } catch (_e) {
    return null;
  }
};
