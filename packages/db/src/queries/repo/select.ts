import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { and, eq } from "drizzle-orm";

import type { RepoSelector } from "@/types/selectors";
import type { SelectedRepo } from "@/types/inferred";
import type { UserId } from "@/types/branded";

import { RepoNotFoundError } from "@/errors/repo-not-found";
import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function selectRepo({
  selector,
  userId,
}: {
  selector: RepoSelector;
  userId: UserId;
}): Promise<Result<SelectedRepo, RepoNotFoundError | UnexpectedError>> {
  try {
    const [selectedRepo] = await db
      .select()
      .from(repoTable)
      .where(
        and(
          eq(repoTable[selector.column], selector.value),
          eq(repoTable.userId, userId)
        )
      );

    if (!selectedRepo) {
      return {
        success: false,
        error: new RepoNotFoundError(selector),
      };
    }

    return { success: true, data: selectedRepo };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while selecting repo with with ${selector.column} "${selector.value}".`,
        cause: error,
      }),
    };
  }
}
