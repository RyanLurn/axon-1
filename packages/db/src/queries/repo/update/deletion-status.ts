import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { isNull, and, eq } from "drizzle-orm";

import type { RepoName, UserId } from "@/types/branded";
import type { RepoSelector } from "@/types/selectors";

import { RepoNotFoundError } from "@/errors/repo-not-found";
import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function updateRepoDeletionStatus({
  selector,
  userId,
  deletionStartedAt,
}: {
  selector: RepoSelector;
  userId: UserId;
  deletionStartedAt: Date | null;
}): Promise<Result<RepoName, RepoNotFoundError | UnexpectedError>> {
  try {
    const [updatedRepo] = await db
      .update(repoTable)
      .set({ deletionStartedAt })
      .where(
        and(
          eq(repoTable[selector.column], selector.value),
          eq(repoTable.userId, userId),
          isNull(repoTable.deletionStartedAt)
        )
      )
      .returning();

    if (!updatedRepo) {
      return {
        success: false,
        error: new RepoNotFoundError(selector),
      };
    }

    return { success: true, data: updatedRepo.name };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while updating deletion status of repo with ${selector.column} "${selector.value}".`,
        cause: error,
      }),
    };
  }
}
