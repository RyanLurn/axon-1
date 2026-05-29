import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import { Route as ChatRoute } from "@/routes/_authenticated/chat";
import { credentialsValidator } from "@/lib/auth/validators";
import { authClient } from "@/lib/auth/client";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const signInForm = useForm({
    onSubmit: async ({ value }) => {
      const { data, error } = await authClient.signIn.email({
        ...value,
        rememberMe: true,
        callbackURL: ChatRoute.to,
      });
    },
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: credentialsValidator,
    },
  });

  return <div>Hello "/(auth)/sign-in"!</div>;
}
