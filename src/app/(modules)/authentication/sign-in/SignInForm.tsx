import { useState } from "react";
import { useSignInForm } from "./hooks/useSignInForm";

import { Loader2Icon, XIcon, EyeIcon, EyeOff } from "lucide-react";

import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Form, FormProvider } from "@/core/components/ui/form";

export const SignInForm = () => {
  const { form, onSubmit, state } = useSignInForm();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormProvider {...form}>
      {state.errorMessage && (
        <div className="w-full flex items-start gap-4 border-l-4 border-red-500 p-4 bg-red-50 text-red-600 text-xs rounded">
          <div className="flex flex-col flex-1">
            <p className="font-bold">{state.errorMessage.message}</p>
            <p>{state.errorMessage.description}</p>
          </div>
          <button type="button" onClick={state.clearErrorMessage}>
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      <form
        className="w-full flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form.Field
          control={form.control}
          name="username"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>Email Address</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  type="email"
                  placeholder="e.g. reporter@amana.id"
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
              <Form.Label required>Password</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  rightAddon={
                    <div
                      className="cursor-pointer pointer-events-auto"
                      onClick={() => setShowPassword(!showPassword)}
                      title="toggle-password-visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-neutral-tertiary" />
                      ) : (
                        <EyeIcon className="w-4 h-4 text-neutral-tertiary" />
                      )}
                    </div>
                  }
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Button
          disabled={state.isLoading}
          type="submit"
          className="w-full"
        >
          {state.isLoading && <Loader2Icon className="animate-spin mr-2 w-4 h-4" />}
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
};
