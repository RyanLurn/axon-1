import { setResponseStatus } from "@tanstack/react-start/server";
import { selectRepos } from "@repo/db/queries/repo/select-many";
import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/features/auth/middleware";

export const listReposFn = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const selectReposResult = await selectRepos({
      userId: context.user.id,
    });

    if (!selectReposResult.success) {
      setResponseStatus(500);
      throw new Error("Internal server error");
    }

    return selectReposResult.data;
  });
