import { BaseError } from "@repo/errors/base";

import type { RepoPath } from "@/utils/get-repo-path";

export class AlreadyABareRepoError extends BaseError<
  "ALREADY_A_BARE_REPO_ERROR",
  null
> {
  repoPath: RepoPath;

  constructor({ message, repoPath }: { message?: string; repoPath: RepoPath }) {
    super({
      name: "AlreadyABareRepoError",
      message: message ?? `A bare repository already exists at "${repoPath}".`,
      code: "ALREADY_A_BARE_REPO_ERROR",
      cause: null,
    });
    this.repoPath = repoPath;
  }
}
