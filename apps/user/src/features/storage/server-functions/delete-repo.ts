import { repoSelectorValidator } from "@repo/db/validators/repo/selector";
import { setResponseStatus } from "@tanstack/react-start/server";
import { deleteRepo } from "@repo/git/operations/delete-repo";
import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";

import { authMiddleware } from "@/features/auth/middleware";

export const deleteRepoFn = createServerFn()
  .middleware([authMiddleware])
  .inputValidator(repoSelectorValidator)
  .handler(async ({ context, data }) => {
    const deleteRepoResult = await deleteRepo({
      userId: context.user.id,
      selector: data,
    });

    if (!deleteRepoResult.success) {
      const error = deleteRepoResult.error;
      if (error.code === "REPO_NOT_FOUND_ERROR") {
        throw notFound();
      }
      setResponseStatus(500);
      throw new Error("Internal server error");
    }
  });
