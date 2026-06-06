import type { RepoName, RepoId, UserId } from "@/types/branded";

import { repoTable } from "@/schema/tables/repo";
import { db } from "@/index";

export async function insertOneRepo({
  userId,
  name,
  description,
}: {
  userId: UserId;
  name: RepoName;
  description?: string;
}): Promise<RepoId> {
  const id = Bun.randomUUIDv7() as RepoId;

  await db.insert(repoTable).values({
    id,
    userId,
    name,
    description,
  });

  return id;
}
