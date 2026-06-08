import type { RepoPath } from "@repo/db/types/branded";
import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";

export async function spawnInitBare({
  repoPath,
}: {
  repoPath: RepoPath;
}): Promise<Result<null, UnexpectedError>> {
  try {
    const gitProcess = Bun.spawn(
      ["git", "init", "--bare", "--end-of-options", repoPath],
      { stdout: "ignore", stderr: "pipe" }
    );

    const [stderr, exitCode] = await Promise.all([
      gitProcess.stderr.text(),
      gitProcess.exited,
    ]);

    if (exitCode !== 0) {
      return {
        success: false,
        error: new UnexpectedError({
          message: `Failed to initialize bare repo at ${repoPath}.`,
          cause: new Error(stderr),
        }),
      };
    }

    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while initializing bare repo at ${repoPath}.`,
        cause: error,
      }),
    };
  }
}
