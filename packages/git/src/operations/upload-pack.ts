import type { NoAccessError } from "@repo/fs/errors/no-access";
import type { NoEntryError } from "@repo/fs/errors/no-entry";
import type { Result } from "@repo/types/result";

import { resolveRealPath } from "@repo/fs/resolve-real-path";
import { UnexpectedError } from "@repo/errors/unexpected";

import type { RepoPath } from "@/utils/get-repo-path";

export async function spawnUploadPack({
  repoPath,
  requestBody,
}: {
  repoPath: RepoPath;
  requestBody: ReadableStream;
}): Promise<
  Result<
    ReadableStream<Uint8Array<ArrayBuffer>>,
    UnexpectedError | NoAccessError | NoEntryError
  >
> {
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
      data: gitProcess.stdout,
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
