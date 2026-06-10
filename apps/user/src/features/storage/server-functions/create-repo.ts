import { repoNameValidator } from "@repo/db/validators/repo/name";
import { setResponseStatus } from "@tanstack/react-start/server";
import { createRepo } from "@repo/git/operations/create-repo";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createInternalServerError, UIError } from "@/lib/error";
import { authMiddleware } from "@/features/auth/middleware";

export const createRepoInputValidator = z.object({
  name: repoNameValidator,
  description: z.string().max(255),
});

export const createRepoFn = createServerFn()
  .middleware([authMiddleware])
  .inputValidator(createRepoInputValidator)
  .handler(async ({ context, data }) => {
    // Transform description here because TanStack Form doesn't work well when undefined/null is in defaultValues
    const description =
      data.description.trim().length === 0 ? undefined : data.description;

    const createRepoResult = await createRepo({
      userId: context.user.id,
      name: data.name,
      description,
    });

    if (!createRepoResult.success) {
      const error = createRepoResult.error;
      if (error.code === "REPO_NAME_TAKEN_ERROR") {
        setResponseStatus(409);
        throw new UIError({
          message: "A repo with that name already exists",
          code: error.code,
        });
      }
      setResponseStatus(500);
      throw createInternalServerError();
    }

    return createRepoResult.data;
  });
