import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { schema } from "../schemas/sign-in.schema";
import { useAuthentication } from "../../core/useAuthentication";

export const useSignInForm = () => {
  const { authenticate, state } = useAuthentication();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    authenticate.withUsernameAndPassword({
      username: values.username,
      password: values.password,
    });
  }

  return {
    form,
    state,
    onSubmit,
  };
};
