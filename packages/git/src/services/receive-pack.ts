import type { NoEntryError } from "@repo/fs/errors/no-entry";
import type { Result } from "@repo/types/result";

import { resolveRealPath } from "@repo/fs/resolve-real-path";
import { UnexpectedError } from "@repo/errors/unexpected";

export async function spawnReceivePack({
  repoPath,
  requestBody,
}: {
  repoPath: string;
  requestBody: ReadableStream;
}): Promise<Result<Uint8Array<ArrayBuffer>, UnexpectedError | NoEntryError>> {
  try {
    const gitProcess = Bun.spawn(["git-receive-pack", repoPath], {
      stdin: requestBody,
      stderr: "pipe",
    });

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
          message: `Something went wrong while spawning git-receive-pack for repo at ${repoPath}.`,
          cause: new Error(error),
        }),
      };
    }

    const rawOutput = await Bun.readableStreamToBytes(gitProcess.stdout);
    return {
      isOk: true,
      data: rawOutput,
    };
  } catch (error) {
    return {
      isOk: false,
      error: new UnexpectedError({
        message: `Something went wrong while spawning git-receive-pack for repo at ${repoPath}.`,
        cause: error,
      }),
    };
  }
}
