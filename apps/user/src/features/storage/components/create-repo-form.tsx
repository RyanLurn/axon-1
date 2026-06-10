import { useRouter } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  createRepoInputValidator,
  createRepoFn,
} from "@/features/storage/server-functions/create-repo";
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  Field,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateRepoForm() {
  const router = useRouter();

  const form = useForm({
    formId: "create-repo-form",
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: createRepoInputValidator,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await createRepoFn({
          data: value,
        });
        toast.success(`Repository "${value.name}" created.`);
        await router.navigate({
          to: "/storage/$repoName",
          params: { repoName: value.name },
        });
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          "code" in error &&
          error.code === "REPO_NAME_TAKEN_ERROR"
        ) {
          formApi.setFieldMeta("name", (prev) => ({
            ...prev,
            errors: [{ message: `"${value.name}" is already taken.` }],
          }));
          return;
        }
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="flex flex-col gap-8"
      id={form.formId}
    >
      <FieldGroup>
        <form.Field
          validators={{
            onChange: createRepoInputValidator.shape.name,
          }}
          name="name"
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder="my-repo"
                  name={field.name}
                  id={field.name}
                  autoFocus
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field
          validators={{
            onChange: createRepoInputValidator.shape.description,
          }}
          name="description"
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Description{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="A short description of this repository"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  name={field.name}
                  id={field.name}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <form.Subscribe
        selector={(state) => ({
          isPristine: state.isPristine,
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
      >
        {({ isPristine, canSubmit, isSubmitting }) => (
          <Button
            disabled={isPristine || !canSubmit || isSubmitting}
            className="self-start"
            form={form.formId}
            type="submit"
          >
            {isSubmitting ? "Creating..." : "Create repository"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
