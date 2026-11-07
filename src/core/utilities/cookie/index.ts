import Cookies from "js-cookie";

import { EncryptionUtil } from "../encryption";

export const Cookie = {
  getAll: () =>
    Object.fromEntries(
      Object.entries(Cookies.get()).map(([name, value]) => [
        EncryptionUtil.AESdecrypt(name),
        EncryptionUtil.AESdecrypt(value),
      ]),
    ),
  set: (key: string, value: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(
      EncryptionUtil.AESencrypt(key),
      EncryptionUtil.AESencrypt(value),
      options,
    ),
  get: (key: string) =>
    Cookies.get()
      ? EncryptionUtil.AESdecrypt(
          Object.values(
            Object.fromEntries(
              Object.entries(Cookies.get()).filter(
                ([name]) => EncryptionUtil.AESdecrypt(name) === key,
              ),
            ),
          )?.[0],
        )
      : null,
  delete: (key: string, options?: Cookies.CookieAttributes) =>
    Cookies.get()
      ? Cookies.remove(
          Object.keys(
            Object.fromEntries(
              Object.entries(Cookies.get()).filter(
                ([name]) => EncryptionUtil.AESdecrypt(name) === key,
              ),
            ),
          )?.[0],
          options,
        )
      : null,

  clearAll: () =>
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    }),
};
