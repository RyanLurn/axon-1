import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { SQLiteError } from "bun:sqlite";

import type { RepoName, RepoId, UserId } from "@/types/branded";

import { RepoNameTakenError } from "@/errors/repo-name-taken";
import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function insertRepo({
  userId,
  name,
  description,
}: {
  userId: UserId;
  name: RepoName;
  description?: string;
}): Promise<Result<RepoId, RepoNameTakenError | UnexpectedError>> {
  try {
    const id = Bun.randomUUIDv7() as RepoId;

    await db.insert(repoTable).values({
      id,
      userId,
      name,
      description,
    });

    return { success: true, data: id };
  } catch (error) {
    if (
      error instanceof SQLiteError &&
      error.code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      return {
        success: false,
        error: new RepoNameTakenError({ name, cause: error }),
      };
    }

    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while inserting repo "${name}".`,
        cause: error,
      }),
    };
  }
}
