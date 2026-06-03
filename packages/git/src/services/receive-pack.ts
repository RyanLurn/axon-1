import type { NoEntryError } from "@repo/fs/errors/no-entry";
import type { Result } from "@repo/types/result";

import { resolveRealPath } from "@repo/fs/resolve-real-path";
import { UnexpectedError } from "@repo/errors/unexpected";
import { join } from "node:path";

import type { RepoDir } from "@/utils/get-repo-dir";

import { gitEnvVars } from "@/utils/env-vars";

export async function spawnReceivePack({
  repoDir,
  requestBody,
}: {
  repoDir: RepoDir;
  requestBody: ReadableStream;
}): Promise<Result<Response, UnexpectedError | NoEntryError>> {
  const repoPath = join(gitEnvVars.GIT_DIR_PATH, repoDir);

  try {
    const gitProcess = Bun.spawn(
      ["git-receive-pack", "--stateless-rpc", repoPath],
      { stdin: requestBody, stderr: "pipe" }
    );

    const exitCode = await gitProcess.exited;

    if (exitCode !== 0) {
      const error = await gitProcess.stderr.text();

      const resolveRealPathResult = await resolveRealPath(repoPath);
      if (resolveRealPathResult.success === false) {
        return resolveRealPathResult;
      }

      return {
        success: false,
        error: new UnexpectedError({
          message: `Something went wrong while spawning git-receive-pack for repo at ${repoPath}.`,
          cause: new Error(error),
        }),
      };
    }

    return {
      success: true,
      data: new Response(gitProcess.stdout, {
        status: 200,
        headers: {
          "Content-Type": "application/x-git-receive-pack-result",
          "Cache-Control": "no-cache",
        },
      }),
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while spawning git-receive-pack for repo at ${repoPath}.`,
        cause: error,
      }),
    };
  }
}
