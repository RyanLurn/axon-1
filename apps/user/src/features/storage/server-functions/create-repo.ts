import { repoNameValidator } from "@repo/db/validators/repo/name";
import { setResponseStatus } from "@tanstack/react-start/server";
import { createRepo } from "@repo/git/operations/create-repo";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { authMiddleware } from "@/features/auth/middleware";

const createRepoInputValidator = z.object({
  name: repoNameValidator,
  description: z.string().min(1).max(255).optional(),
});

export const createRepoFn = createServerFn()
  .middleware([authMiddleware])
  .inputValidator(createRepoInputValidator)
  .handler(async ({ context, data }) => {
    const createRepoResult = await createRepo({
      userId: context.user.id,
      ...data,
    });

    if (!createRepoResult.success) {
      const error = createRepoResult.error;
      if (error.code === "REPO_NAME_TAKEN_ERROR") {
        setResponseStatus(409);
        throw new Error("A repo with that name already exists");
      }
      setResponseStatus(500);
      throw new Error("Internal server error");
    }
  });
