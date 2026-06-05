import type { InsertedUserRepo, SelectedUserRepo } from "@/types/inferred";

import { repoTable } from "@/schema/tables/git";
import { db } from "@/index";

export async function insertUserRepo(insertedRepo: InsertedUserRepo) {
  const [returnedRepo] = await db
    .insert(repoTable)
    .values(insertedRepo)
    .returning();

  if (returnedRepo === undefined) {
    return null;
  }

  return returnedRepo as SelectedUserRepo;
}
