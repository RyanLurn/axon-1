import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { eq } from "drizzle-orm";

import type { SelectedUserRepo } from "@/types/inferred";
import type { UserId } from "@/types/branded";

import { repoTable } from "@/schema/tables/git";
import { db } from "@/index";

export async function selectAllUserRepos(
  userId: UserId
): Promise<Result<SelectedUserRepo[], UnexpectedError>> {
  try {
    const repos = await db
      .select()
      .from(repoTable)
      .where(eq(repoTable.userId, userId));

    return {
      success: true,
      data: repos as SelectedUserRepo[],
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `An unexpected error occurred while selecting repos for user "${userId}".`,
        cause: error,
      }),
    };
  }
}
