import { BaseError } from "@repo/errors/base";

import type { RepoPath } from "@/utils/get-repo-path";

export class RepoAlreadyInitializedError extends BaseError<
  "REPO_ALREADY_INITIALIZED_ERROR",
  null
> {
  repoPath: RepoPath;

  constructor({ message, repoPath }: { message?: string; repoPath: RepoPath }) {
    super({
      name: "RepoAlreadyInitializedError",
      message:
        message ??
        `A repository has already been initialized in "${repoPath}".`,
      code: "REPO_ALREADY_INITIALIZED_ERROR",
      cause: null,
    });
    this.repoPath = repoPath;
  }
}
