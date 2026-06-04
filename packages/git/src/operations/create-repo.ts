import type { PathAlreadyExistsError } from "@repo/fs/errors/path-already-exists";
import type { NoAccessError } from "@repo/fs/errors/no-access";
import type { NoEntryError } from "@repo/fs/errors/no-entry";
import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { makeDirectory } from "@repo/fs/make-directory";

import type { RepoPath } from "@/utils/get-repo-path";

export async function createRepo({
  repoPath,
  isBare,
}: {
  repoPath: RepoPath;
  isBare: boolean;
}): Promise<
  Result<
    string,
    PathAlreadyExistsError | UnexpectedError | NoAccessError | NoEntryError
  >
> {
  const makeDirectoryResult = await makeDirectory({
    path: repoPath,
    recursive: true,
  });
  if (!makeDirectoryResult.success) {
    return makeDirectoryResult;
  }

  try {
    const gitProcess = Bun.spawn(["git", "init", isBare ? "--bare" : ""], {
      cwd: repoPath,
      stderr: "pipe",
    });

    const exitCode = await gitProcess.exited;

    if (exitCode !== 0) {
      const error = await gitProcess.stderr.text();
      return {
        success: false,
        error: new UnexpectedError({
          message: `Failed to initialize a bare repository in "${repoPath}".`,
          cause: new Error(error),
        }),
      };
    }

    const output = await gitProcess.stdout.text();
    return {
      success: true,
      data: output,
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while initializing a bare repository in "${repoPath}".`,
        cause: error,
      }),
    };
  }
}
