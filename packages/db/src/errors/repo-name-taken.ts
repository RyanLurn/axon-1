import type { SQLiteError } from "bun:sqlite";

import { BaseError } from "@repo/errors/base";

export class RepoNameTakenError extends BaseError<
  "REPO_NAME_TAKEN_ERROR",
  SQLiteError
> {
  constructor({ name, cause }: { name: string; cause: SQLiteError }) {
    super({
      name: "RepoNameTakenError",
      message: `A repo with the name "${name}" already exists.`,
      code: "REPO_NAME_TAKEN_ERROR",
      cause,
    });
  }
}
