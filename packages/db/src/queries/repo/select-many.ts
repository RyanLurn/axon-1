import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { isNull, and, eq } from "drizzle-orm";

import type { SelectedRepo } from "@/types/inferred";
import type { UserId } from "@/types/branded";

import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function selectRepos({
  userId,
}: {
  userId: UserId;
}): Promise<Result<SelectedRepo[], UnexpectedError>> {
  try {
    const repos = await db
      .select()
      .from(repoTable)
      .where(
        and(eq(repoTable.userId, userId), isNull(repoTable.deletionStartedAt))
      );

    return { success: true, data: repos };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: "Something went wrong while selecting repos.",
        cause: error,
      }),
    };
  }
}
