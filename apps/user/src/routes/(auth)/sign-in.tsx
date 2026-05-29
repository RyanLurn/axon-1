import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { BASE_ERROR_CODES } from "better-auth";
import { toast } from "sonner";

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
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
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const signInForm = useForm({
    onSubmit: async ({ value, formApi }) => {
      const { error } = await authClient.signIn.email({
        ...value,
        rememberMe: true,
        callbackURL: ChatRoute.to,
      });

      if (error) {
        if (error.code === BASE_ERROR_CODES.INVALID_EMAIL.code) {
          formApi.setErrorMap({
            onChange: {
              fields: {
                email: error.message,
              },
            },
          });
        } else {
          toast.error(error.message ?? "Failed to sign in.");
        }
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
    <div className="flex size-full flex-col items-center justify-center">
      <Card className="w-full sm:max-w-sm">
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
                validators={{
                  onChange: emailValidator,
                }}
                name="email"
              >
                {(field) => {
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
              </signInForm.Field>
              <signInForm.Field
                validators={{
                  onChange: passwordValidator,
                }}
                name="password"
              >
                {(field) => {
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
              </signInForm.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <signInForm.Subscribe
            selector={(state) => ({
              isPristine: state.isPristine,
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ isPristine, canSubmit, isSubmitting }) => {
              return (
                <Button
                  disabled={isPristine || !canSubmit || isSubmitting}
                  form={signInForm.formId}
                  className="w-full"
                  type="submit"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              );
            }}
          </signInForm.Subscribe>
        </CardFooter>
      </Card>
    </div>
  );
}
