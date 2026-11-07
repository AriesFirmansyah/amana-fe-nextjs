export type ConfigType = {
  appEnv: "development" | "production" | "local";
  api: {
    key?: string;
    host?: string;
  };
  cookies: {
    domain?: string;
  };
  hostname: {
    domain?: string;
  };
  encryption: {
    secretKey?: string;
  };
  signature: {
    iv?: string;
    key?: string;
  };
};
