import { eq } from "drizzle-orm";

import type { UserId } from "@/types/branded";

import { repoTable } from "@/schema/tables/git";
import { db } from "@/index";

export async function selectAllUserRepos(userId: UserId) {
  const repos = await db
    .select()
    .from(repoTable)
    .where(eq(repoTable.userId, userId));

  return repos;
}
