import { ConfigType } from "./types/index.types";

export const isDev = ["development", "local"].includes(
  process.env.APP_ENV || "",
);
export const isProd = process.env.APP_ENV === "production";
export const isTest = process.env.APP_ENV === "test";

const config: ConfigType = {
  appEnv: process.env.APP_ENV as ConfigType["appEnv"],
  api: {
    key: process.env.APP_API_KEY,
    host: process.env.APP_API_BASE_URL,
  },
  cookies: {
    domain: process.env.APP_COOKIE_DOMAIN,
  },
  hostname: {
    domain: process.env.APP_HOSTNAME_DOMAIN,
  },
  encryption: {
    secretKey: process.env.APP_ENCRYPTION_SECRET_KEY,
  },
  signature: {
    iv: process.env.APP_SIGNATURE_IV,
    key: process.env.APP_SIGNATURE_KEY,
  },
};

export default config;
