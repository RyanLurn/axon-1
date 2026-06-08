import type { RepoNotFoundError } from "@repo/db/errors/repo-not-found";
import type { RepoSelector } from "@repo/db/validators/repo/selector";
import type { UnexpectedError } from "@repo/errors/unexpected";
import type { NoAccessError } from "@repo/fs/errors/no-access";
import type { UserId } from "@repo/db/types/branded";
import type { Result } from "@repo/types/result";

import { updateRepoDeletionStatus } from "@repo/db/queries/repo/update-deletion-status";
import { deleteRepo as deleteRepoRow } from "@repo/db/queries/repo/delete";
import { remove } from "@repo/fs/remove";

import { getRepoPath } from "@/utils/get-repo-path";

export async function deleteRepo({
  userId,
  selector,
}: {
  userId: UserId;
  selector: RepoSelector;
}): Promise<Result<null, RepoNotFoundError | UnexpectedError | NoAccessError>> {
  // Step 1: Mark the row as being deleted.
  // If this fails, nothing has changed — return early.
  const updateResult = await updateRepoDeletionStatus({
    selector,
    userId,
    deletionStartedAt: new Date(),
  });
  if (!updateResult.success) {
    return updateResult;
  }
  const repoName = updateResult.data;
  const repoPath = getRepoPath(repoName);

  // Step 2: Remove the directory from the filesystem.
  // If this fails, the row stays tombstoned — reconciliation job handles it later.
  const removeResult = await remove(repoPath);
  if (!removeResult.success) {
    const removeError = removeResult.error;
    if (removeError.code !== "NO_ENTRY_ERROR") {
      console.error(
        `[deleteRepo] Failed to remove bare repo at "${repoPath}". Row is tombstoned. Manual reconciliation required.`,
        removeResult.error
      );
      return {
        success: false,
        error: removeError,
      };
    }
    // TODO: Build a better edge case reporting system.
    console.warn(
      `[deleteRepo] Repo named "${repoName}" doesn't exist at "${repoPath}" but its record still lives in the database. Proceeding to delete this ghost record.`,
      removeError
    );
  }

  // Step 3: Delete the row from the DB.
  // If this fails, the directory is gone but the row stays tombstoned — reconciliation job handles it later.
  const deleteResult = await deleteRepoRow({ selector, userId });
  if (!deleteResult.success) {
    const deleteError = deleteResult.error;
    if (deleteError.code === "REPO_NOT_FOUND_ERROR") {
      console.warn(
        // TODO: Build a better edge case reporting system.
        `[deleteRepo] No repo with the name ${repoName} was found in the database. Proceed to pass this as a success.`,
        deleteError
      );
    } else {
      console.error(
        `[deleteRepo] Failed to delete repo row after successful filesystem removal. Row is tombstoned. Manual reconciliation required.`,
        deleteError
      );
      return deleteResult;
    }
  }

  return { success: true, data: null };
}
