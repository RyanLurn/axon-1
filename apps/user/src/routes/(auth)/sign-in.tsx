import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import {
  credentialsValidator,
  passwordValidator,
  emailValidator,
} from "@/lib/auth/validators";
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  Field,
} from "@/components/ui/field";
import { Route as ChatRoute } from "@/routes/_authenticated/chat";
import { authClient } from "@/lib/auth/client";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const signInForm = useForm({
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        ...value,
        rememberMe: true,
        callbackURL: ChatRoute.to,
      });

      if (error) {
        toast.error(error.message ?? "Failed to sign in.");
      }
    },
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: credentialsValidator,
    },
    formId: "sign-in-form",
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Enter your credentials below to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void signInForm.handleSubmit();
          }}
          id={signInForm.formId}
        >
          <FieldGroup>
            <signInForm.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="youremail@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      name={field.name}
                      id={field.name}
                      type="email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              validators={{
                onChange: emailValidator,
              }}
              name="email"
            />
            <signInForm.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="************"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      name={field.name}
                      id={field.name}
                      type="password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              validators={{
                onChange: passwordValidator,
              }}
              name="password"
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
