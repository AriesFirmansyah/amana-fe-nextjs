import { axios } from "@/core/libraries/axios/index.libs";
import { useMutation } from "@tanstack/react-query";
import {
  SignInMutationProps,
  SignInMutationResponse,
} from "../types/sign-in.mutation.types";

export const useSignInMutation = () => {
  const endpoint = "/api/v1/authentication/login";

  return useMutation({
    mutationFn: (args: SignInMutationProps) => {
      return axios.post<BaseResponse<SignInMutationResponse>>(endpoint, {
        ...args.data,
      });
    },
  });
};
