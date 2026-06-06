import { and, eq } from "drizzle-orm";

import type { RepoId, UserId } from "@/types/branded";

import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function selectRepo({
  id,
  userId,
}: {
  id: RepoId;
  userId: UserId;
}) {
  const [selectedRepo] = await db
    .select()
    .from(repoTable)
    .where(and(eq(repoTable.id, id), eq(repoTable.userId, userId)));

  return selectedRepo ?? null;
}
