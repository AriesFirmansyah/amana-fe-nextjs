"use client";

import moment from "moment";

import { type FC, type ReactNode, useEffect } from "react";
import { type InternalAxiosRequestConfig, AxiosError } from "axios";

import { axios } from "@/core/libraries/axios/index.libs";
import { isDev } from "@/config/environment";
import { useAuthState } from "./store/useAuthStore";
import { SignatureUtil } from "@/core/utilities/signature";

import { useLogout } from "./useLogout";

type HTTPProviderProps = {
  children: ReactNode;
};

export const HTTPProvider: FC<HTTPProviderProps> = ({ children }) => {
  const {
    state: {
      access: { token },
    },
  } = useAuthState();

  const { logout } = useLogout();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        if (token) request.headers.Authorization = `Bearer ${token}`;
        const { url = "", method = "GET" } = request;

        const timestamp = moment().format();
        const signature = SignatureUtil.generate(
          url,
          method?.toUpperCase(),
          timestamp,
        );

        request.headers["x-api-timestamp"] = timestamp;
        request.headers["x-api-signature"] = signature;

        return request;
      },
    );

    const responseInterceptor = axios.interceptors.response.use(
      undefined,
      (error: Error) => {
        const serverError = {
          name: "Internal Server Error",
          message:
            "Something  went wrong at the server side. Please try again in a moment.",
        };

        console.log("error", error);

        if (error instanceof AxiosError) {
          if (error.response) {
            if (isDev) console.log("Response Error: ", error.toJSON());

            const {
              response: { data, status },
            } = error;

            const unauthorizedError = {
              name: "Session Expired",
              message: "Please try to sign in again.",
            };

            if (status === 401) {
              logout();

              return Promise.reject({
                ...error,
                name: unauthorizedError.name,
                message: unauthorizedError.message,
              });
            }

            return Promise.reject({
              ...error,
              name: data.title || serverError.name,
              message: data.detail || data.message || serverError.message,
              stack: data.stack,
            });
          } else if (error.request) {
            if (isDev) console.log("Request Error: ", error.toJSON());

            const defaultError = {
              name: "Connection Disconnected",
              message:
                "You have been disconnected with the server. Please try to sign in again.",
            };

            switch (error.code) {
              case "ECONNABORTED":
                return Promise.reject({
                  ...error,
                  name: "Connection Timeout",
                  message: "The server took to long to respond.",
                });
              case "ERR_NETWORK":
                logout();

                return Promise.reject({
                  ...error,
                  name: defaultError.name,
                  message: defaultError.message,
                });
              default:
                return Promise.reject({
                  ...error,
                  name: serverError.name,
                  message: serverError.message,
                });
            }
          } else {
            return Promise.reject({
              ...error,
              name: "An error occured",
              message: error.message,
            });
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return children;
};
