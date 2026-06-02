import type { NoEntryError } from "@repo/fs/errors/no-entry";
import type { Result } from "@repo/types/result";

import { resolveRealPath } from "@repo/fs/resolve-real-path";
import { UnexpectedError } from "@repo/errors/unexpected";
import { join } from "node:path";

import type { RepoName } from "@/utils/validators";

import { gitEnvVars } from "@/utils/env-vars";

export async function spawnUploadPack({
  repoName,
  requestBody,
}: {
  repoName: RepoName;
  requestBody: ReadableStream;
}): Promise<Result<Response, UnexpectedError | NoEntryError>> {
  const repoPath = join(gitEnvVars.GIT_DIR_PATH, repoName);

  try {
    const gitProcess = Bun.spawn(
      ["git-upload-pack", "--stateless-rpc", repoPath],
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
          message: `Something went wrong while spawning git-upload-pack for repo at ${repoPath}.`,
          cause: new Error(error),
        }),
      };
    }

    return {
      success: true,
      data: new Response(gitProcess.stdout, {
        status: 200,
        headers: {
          "Content-Type": "application/x-git-upload-pack-result",
          "Cache-Control": "no-cache",
        },
      }),
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while spawning git-upload-pack for repo at ${repoPath}.`,
        cause: error,
      }),
    };
  }
}
