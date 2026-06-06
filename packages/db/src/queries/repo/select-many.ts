import { eq } from "drizzle-orm";

import type { UserId } from "@/types/branded";

import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function selectManyRepos({ userId }: { userId: UserId }) {
  return db.select().from(repoTable).where(eq(repoTable.userId, userId));
}
