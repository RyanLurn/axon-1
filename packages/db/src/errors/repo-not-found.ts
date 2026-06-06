import { BaseError } from "@repo/errors/base";

import type { RepoSelector } from "@/types/selectors";

export class RepoNotFoundError extends BaseError<"REPO_NOT_FOUND_ERROR", null> {
  constructor({ selector }: { selector: RepoSelector }) {
    super({
      name: "RepoNotFoundError",
      message: `Unable to find repo with ${selector.column} "${selector.value}".`,
      code: "REPO_NOT_FOUND_ERROR",
      cause: null,
    });
  }
}
