import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";

import type { RepoPath } from "@/utils/get-repo-path";

export async function isBareRepo(
  repoPath: RepoPath
): Promise<Result<boolean, UnexpectedError>> {
  try {
    const gitProcess = Bun.spawn(["git-rev-parse", "--is-bare-repository"], {
      cwd: repoPath,
      stderr: "pipe",
    });

    const exitCode = await gitProcess.exited;

    if (exitCode !== 0) {
      const error = await gitProcess.stderr.text();
      return {
        success: false,
        error: new UnexpectedError({
          message: `"git-rev-parse --is-bare-repository" child process exited with code "${exitCode}" after being spawned in "${repoPath}".`,
          cause: new Error(error),
        }),
      };
    }

    const output = await gitProcess.stdout.text();
    return {
      success: true,
      data: output.trim() === "true",
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while spawning "git-rev-parse --is-bare-repository" child process in "${repoPath}".`,
        cause: error,
      }),
    };
  }
}
