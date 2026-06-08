import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { and, eq } from "drizzle-orm";

import type { RepoSelector } from "@/validators/repo/selector";
import type { UserId } from "@/types/branded";

import { RepoNotFoundError } from "@/errors/repo-not-found";
import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function deleteRepo({
  selector,
  userId,
}: {
  selector: RepoSelector;
  userId: UserId;
}): Promise<Result<null, RepoNotFoundError | UnexpectedError>> {
  try {
    const [deletedRepo] = await db
      .delete(repoTable)
      .where(
        and(
          eq(repoTable[selector.column], selector.value),
          eq(repoTable.userId, userId)
        )
      )
      .returning();

    if (!deletedRepo) {
      return {
        success: false,
        error: new RepoNotFoundError(selector),
      };
    }

    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while deleting repo with ${selector.column} "${selector.value}".`,
        cause: error,
      }),
    };
  }
}
