import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { and, eq } from "drizzle-orm";

import type { RepoSelector } from "@/types/selectors";
import type { UserId } from "@/types/branded";

import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function deleteRepo({
  selector,
  userId,
}: {
  selector: RepoSelector;
  userId: UserId;
}): Promise<Result<null, UnexpectedError>> {
  try {
    await db
      .delete(repoTable)
      .where(
        and(
          eq(repoTable[selector.column], selector.value),
          eq(repoTable.userId, userId)
        )
      );

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
