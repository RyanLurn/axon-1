import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";

import type { RepoPath } from "@/utils/get-repo-path";

export async function spawnInitBare(
  repoPath: RepoPath
): Promise<Result<string, UnexpectedError>> {
  try {
    const gitProcess = Bun.spawn(["git-init", "--bare"], {
      cwd: repoPath,
      stderr: "pipe",
    });

    const exitCode = await gitProcess.exited;

    if (exitCode !== 0) {
      const error = await gitProcess.stderr.text();
      return {
        success: false,
        error: new UnexpectedError({
          message: `git-init --bare exited with code "${exitCode}" after being spawned in "${repoPath}".`,
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
        message: `Something went wrong while spawning git-init --bare in "${repoPath}".`,
        cause: error,
      }),
    };
  }
}
