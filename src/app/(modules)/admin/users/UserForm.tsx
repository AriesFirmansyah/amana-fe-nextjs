import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Form, FormProvider } from "@/core/components/ui/form";
import { Loader2Icon, EyeIcon, EyeOff, XIcon } from "lucide-react";
import { addUserSchema } from "./schemas/addUser.schema";
import { useSubmitUserMutation } from "./mutations/users.mutation";

export const AddUserForm = (props: { onDestroy(): void }) => {
  const submitMutation = useSubmitUserMutation();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      password: "",
      password_confirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addUserSchema>) => {
    submitMutation.mutate(values);
  };

  useEffect(() => {
    if (submitMutation.isSuccess) {
      props.onDestroy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMutation]);

  return (
    <FormProvider {...form}>
      {submitMutation.isError && (
        <div className="flex items-start gap-4 border-l-4 border-red-500 p-4 bg-fail-50 text-red-500 text-xs rounded">
          <div className="flex-1 flex flex-col">
            <p className="font-bold">{submitMutation.failureReason?.message}</p>
            <p>{submitMutation.error?.stack}</p>
          </div>
          <button onClick={submitMutation.reset}>
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}
      <Form
        className="grid gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form.Field
          control={form.control}
          name="name"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>Name</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Enter your fullname"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>Email</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Enter your email"
                  type="email"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="password"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>New Password</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="8-12 Characters, Alphanumeric"
                  type={showNewPassword ? "text" : "password"}
                  rightAddon={
                    <div
                      className="pointer-events-auto cursor-pointer"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="text-neutral-tertiary w-4 h-4" />
                      ) : (
                        <EyeIcon className="text-neutral-tertiary w-4 h-4" />
                      )}
                    </div>
                  }
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="password_confirm"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>Confirm Password</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="8-12 Characters, Alphanumeric"
                  type={showConfirmPassword ? "text" : "password"}
                  rightAddon={
                    <div
                      className="pointer-events-auto cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="text-neutral-tertiary w-4 h-4" />
                      ) : (
                        <EyeIcon className="text-neutral-tertiary w-4 h-4" />
                      )}
                    </div>
                  }
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <footer className="grid justify-end">
          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-fit"
          >
            {submitMutation.isPending && (
              <Loader2Icon className="animate-spin" />
            )}
            Submit
          </Button>
        </footer>
      </Form>
    </FormProvider>
  );
};
