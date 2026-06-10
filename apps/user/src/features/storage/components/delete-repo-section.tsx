import { useRouter } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  FieldGroup,
  FieldLabel,
  FieldError,
  Field,
} from "@/components/ui/field";
import { deleteRepoFn } from "@/features/storage/server-functions/delete-repo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DeleteRepoSection({ repoName }: { repoName: string }) {
  const router = useRouter();

  const deleteRepoForm = useForm({
    formId: "delete-repo-form",
    defaultValues: {
      confirmation: "",
    },
    validators: {
      onSubmit: z.object({
        confirmation: z.literal(repoName, {
          error: `Type "${repoName}" to confirm.`,
        }),
      }),
    },
    onSubmit: async () => {
      try {
        await deleteRepoFn({
          data: { column: "name", value: repoName },
        });
        toast.success(`Repository "${repoName}" deleted.`);
        await router.navigate({ to: "/storage" });
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6">
      <h2 className="text-sm font-medium text-destructive">
        Delete this repository
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        This action cannot be undone. Type{" "}
        <span className="font-mono font-medium text-foreground">
          {repoName}
        </span>{" "}
        to confirm.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void deleteRepoForm.handleSubmit();
        }}
        id={deleteRepoForm.formId}
        className="mt-4"
      >
        <FieldGroup>
          <deleteRepoForm.Field
            validators={{
              onChange: z.literal(repoName, {
                error: `Type "${repoName}" to confirm.`,
              }),
            }}
            name="confirmation"
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className="sr-only">
                    Confirm repository name
                  </FieldLabel>
                  <Input
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    placeholder={repoName}
                    autoComplete="off"
                    name={field.name}
                    id={field.name}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </deleteRepoForm.Field>
        </FieldGroup>

        <deleteRepoForm.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
            confirmationValue: state.values.confirmation,
          })}
        >
          {({ canSubmit, isSubmitting, confirmationValue }) => (
            <Button
              disabled={
                !canSubmit || isSubmitting || confirmationValue !== repoName
              }
              form={deleteRepoForm.formId}
              variant="destructive"
              className="mt-4"
              type="submit"
            >
              {isSubmitting ? "Deleting..." : "Delete repository"}
            </Button>
          )}
        </deleteRepoForm.Subscribe>
      </form>
    </div>
  );
}
