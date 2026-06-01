import type { NoEntryError } from "@repo/fs/errors/no-entry";
import type { Result } from "@repo/types/result";

import { resolveRealPath } from "@repo/fs/resolve-real-path";
import { UnexpectedError } from "@repo/errors/unexpected";

export async function spawnUploadPack({
  repoPath,
  requestBody,
}: {
  repoPath: string;
  requestBody: ReadableStream;
}): Promise<Result<Response, UnexpectedError | NoEntryError>> {
  try {
    const gitProcess = Bun.spawn(
      ["git-upload-pack", "--stateless-rpc", repoPath],
      { stdin: requestBody, stderr: "pipe" }
    );

    const exitCode = await gitProcess.exited;

    if (exitCode !== 0) {
      const error = await gitProcess.stderr.text();

      const resolveRealPathResult = await resolveRealPath(repoPath);
      if (!resolveRealPathResult.isOk) {
        return resolveRealPathResult;
      }

      return {
        isOk: false,
        error: new UnexpectedError({
          message: `Something went wrong while spawning git-upload-pack for repo at ${repoPath}.`,
          cause: new Error(error),
        }),
      };
    }

    return {
      isOk: true,
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
      isOk: false,
      error: new UnexpectedError({
        message: `Something went wrong while spawning git-upload-pack for repo at ${repoPath}.`,
        cause: error,
      }),
    };
  }
}
