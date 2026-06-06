import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { and, eq } from "drizzle-orm";

import type { RepoId, UserId } from "@/types/branded";
import type { SelectedRepo } from "@/types/inferred";

import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function selectRepo({
  id,
  userId,
}: {
  id: RepoId;
  userId: UserId;
}): Promise<Result<SelectedRepo | null, UnexpectedError>> {
  try {
    const [selectedRepo] = await db
      .select()
      .from(repoTable)
      .where(and(eq(repoTable.id, id), eq(repoTable.userId, userId)));

    return { success: true, data: selectedRepo ?? null };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while selecting repo "${id}".`,
        cause: error,
      }),
    };
  }
}
