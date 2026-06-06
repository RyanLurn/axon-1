import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { and, eq } from "drizzle-orm";

import type { RepoId, UserId } from "@/types/branded";

import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function deleteRepo({
  id,
  userId,
}: {
  id: RepoId;
  userId: UserId;
}): Promise<Result<null, UnexpectedError>> {
  try {
    await db
      .delete(repoTable)
      .where(and(eq(repoTable.id, id), eq(repoTable.userId, userId)));

    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while deleting repo "${id}".`,
        cause: error,
      }),
    };
  }
}
