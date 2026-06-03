import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";

import type { RepoPath } from "@/utils/get-repo-path";

import { RepoAlreadyInitializedError } from "@/errors/repo-already-initialized";

export async function spawnInitBare(
  repoPath: RepoPath
): Promise<Result<string, RepoAlreadyInitializedError | UnexpectedError>> {
  try {
    const revParseProcess = Bun.spawn(["git-rev-parse", "--git-dir"], {
      cwd: repoPath,
      stderr: "pipe",
    });

    const exitCode = await revParseProcess.exited;

    if (exitCode === 0) {
      return {
        success: false,
        error: new RepoAlreadyInitializedError({ repoPath }),
      };
    }

    if (exitCode !== 128) {
      const error = await revParseProcess.stderr.text();
      return {
        success: false,
        error: new UnexpectedError({
          message: `Failed to check if a repository has already been initialized in "${repoPath}".`,
          cause: new Error(error),
        }),
      };
    }

    // If the exit code is 128, it's likely that a repo hasn't been initialized yet.
    // In this case, we pass through to the next step of initializing a bare repo.
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while checking if a repository has already been initialized in "${repoPath}".`,
        cause: error,
      }),
    };
  }

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
