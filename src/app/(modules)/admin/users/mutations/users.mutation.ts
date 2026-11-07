import { z } from "zod";

import { axios } from "@/core/libraries/axios/index.libs";
import { useMutation } from "@tanstack/react-query";
import { addUserSchema } from "../schemas/addUser.schema";
import { client } from "@/app/_/plugins/react-query";

export const useSubmitUserMutation = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof addUserSchema>) => {
      return axios.post("/api/v1/authentication/register", data);
    },

    onSuccess() {
      client.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
