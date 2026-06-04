import type { NoAccessError } from "@repo/fs/errors/no-access";
import type { NoEntryError } from "@repo/fs/errors/no-entry";
import type { Result } from "@repo/types/result";

import { resolveRealPath } from "@repo/fs/resolve-real-path";
import { UnexpectedError } from "@repo/errors/unexpected";

import type { RepoPath } from "@/utils/get-repo-path";
import type { GitService } from "@/utils/validators";

export async function spawnInfoRefsAd({
  repoPath,
  service,
}: {
  repoPath: RepoPath;
  service: GitService;
}): Promise<
  Result<
    Uint8Array<ArrayBuffer>,
    UnexpectedError | NoAccessError | NoEntryError
  >
> {
  try {
    const gitProcess = Bun.spawn(
      [service, "--http-backend-info-refs", repoPath],
      {
        stderr: "pipe",
      }
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
          message: `Something went wrong while spawning ${service} ad for repo at ${repoPath}.`,
          cause: new Error(error),
        }),
      };
    }

    const outputBytes = await Bun.readableStreamToBytes(gitProcess.stdout);

    const prefix = new TextEncoder().encode(
      `00${service === "git-receive-pack" ? "1f" : "1e"}# service=${service}\n0000`
    );

    const merged = new Uint8Array(prefix.length + outputBytes.length);
    merged.set(prefix, 0);
    merged.set(outputBytes, prefix.length);

    return {
      success: true,
      data: merged,
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while spawning ${service} ad for repo at ${repoPath}.`,
        cause: error,
      }),
    };
  }
}
