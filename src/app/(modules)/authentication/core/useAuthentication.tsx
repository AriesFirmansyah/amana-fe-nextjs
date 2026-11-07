import config from "@/config/environment";
import moment from "moment";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSignInMutation } from "../sign-in/mutations/sign-in.mutation";

import { Cookie } from "@/core/utilities/cookie";
import { useAuthState } from "./store/useAuthStore";
import { client } from "@/app/_/plugins/react-query";
import { EncryptionUtil } from "@/core/utilities/encryption";

type AuthenticationPayload = {
  username: string;
  password: string;
};

export const useAuthentication = () => {
  const router = useRouter();

  const { state, dispatch } = useAuthState();

  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    description: string;
  }>();

  const withUsernameAndPasswordMutation = useSignInMutation();

  const clearErrorMessage = () => {
    setErrorMessage(undefined);
  };

  const withUsernameAndPassword = ({
    username,
    password,
  }: AuthenticationPayload) => {
    clearErrorMessage();
    const encryptedPassword = EncryptionUtil.AESencrypt(password);

    withUsernameAndPasswordMutation.mutate({
      data: {
        email: username,
        password: encryptedPassword,
      },
    });
  };

  useEffect(() => {
    if (withUsernameAndPasswordMutation.isSuccess) {
      const data = withUsernameAndPasswordMutation.data.data.data;

      dispatch.assignRole(data.user.role);
      dispatch.authenticate(data.tokens.access.token);
      dispatch.assignProfile(data.user);

      const expires = moment(data.tokens.refresh.expires).diff(
        moment(),
        "days",
      );

      Cookie.set("user", JSON.stringify(data.user), {
        expires,
        domain: config.cookies.domain,
      });

      Cookie.set("access_token", data.tokens.access.token, {
        expires: 365,
        domain: config.cookies.domain,
      });

      client.clear();
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withUsernameAndPasswordMutation.isSuccess]);

  useEffect(() => {
    if (withUsernameAndPasswordMutation.error) {
      setErrorMessage({
        description: withUsernameAndPasswordMutation.error.message,
        message: withUsernameAndPasswordMutation.error.name,
      });
    }
  }, [withUsernameAndPasswordMutation.error]);

  return {
    authenticate: {
      withUsernameAndPassword,
    },
    state: {
      ...state,
      isSuccess: withUsernameAndPasswordMutation.isSuccess,
      isError: withUsernameAndPasswordMutation.isError,
      isLoading: withUsernameAndPasswordMutation.isPending,
      errorMessage,
      clearErrorMessage,
    },
  };
};
