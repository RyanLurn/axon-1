import type { RepoNameTakenError } from "@repo/db/errors/repo-name-taken";
import type { RepoName, UserId } from "@repo/db/types/branded";
import type { UnexpectedError } from "@repo/errors/unexpected";
import type { Result } from "@repo/types/result";

import { insertRepo } from "@repo/db/queries/repo/insert";
import { remove } from "@repo/fs/remove";

import { spawnInitBare } from "@/child-processes/init-bare";
import { getRepoPath } from "@/utils/get-repo-path";

export async function createRepo({
  userId,
  name,
  description,
}: {
  userId: UserId;
  name: RepoName;
  description?: string;
}): Promise<Result<null, RepoNameTakenError | UnexpectedError>> {
  const repoPath = getRepoPath(name);

  // Spawn first — if this fails, nothing was written to the DB.
  const spawnResult = await spawnInitBare({ repoPath });
  if (!spawnResult.success) {
    return spawnResult;
  }

  // Insert second — if this fails, clean up the bare repo directory.
  const insertResult = await insertRepo({ userId, name, description });
  if (!insertResult.success) {
    const removeResult = await remove(repoPath);
    if (!removeResult.success) {
      // The directory is now an orphan. Log loudly for manual reconciliation.
      // TODO: trigger reconciliation job.
      console.error(
        `[createRepo] Rollback failed: could not remove bare repo at "${repoPath}" after failed insert. Manual cleanup required.`,
        removeResult.error
      );
    }
    return insertResult;
  }

  return { success: true, data: null };
}
