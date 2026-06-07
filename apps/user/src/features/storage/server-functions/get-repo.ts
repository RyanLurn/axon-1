import { repoSelectorValidator } from "@repo/db/validators/repo/selector";
import { setResponseStatus } from "@tanstack/react-start/server";
import { selectRepo } from "@repo/db/queries/repo/select";
import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";

import { authMiddleware } from "@/lib/auth/middleware";

export const getRepo = createServerFn()
  .middleware([authMiddleware])
  .inputValidator(repoSelectorValidator)
  .handler(async ({ context, data }) => {
    const selectRepoResult = await selectRepo({
      selector: data,
      userId: context.user.id,
    });

    if (!selectRepoResult.success) {
      const error = selectRepoResult.error;
      if (error.code === "REPO_NOT_FOUND_ERROR") {
        throw notFound();
      }
      setResponseStatus(500);
      throw new Error("Internal server error");
    }

    return selectRepoResult.data;
  });
