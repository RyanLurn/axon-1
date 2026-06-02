import type { NoEntryError } from "@repo/fs/errors/no-entry";
import type { Result } from "@repo/types/result";

import { resolveRealPath } from "@repo/fs/resolve-real-path";
import { UnexpectedError } from "@repo/errors/unexpected";
import { join } from "node:path";

import type { GitService } from "@/validators";
import type { ValidRepoName } from "@/types";

import { gitEnvVars } from "@/env-vars";

export async function spawnInfoRefsAd({
  repoName,
  service,
}: {
  repoName: ValidRepoName;
  service: GitService;
}): Promise<Result<Uint8Array<ArrayBuffer>, UnexpectedError | NoEntryError>> {
  const repoPath = join(gitEnvVars.GIT_DIR_PATH, repoName);

  try {
    const gitProcess = Bun.spawn([service, "--advertise-refs", repoPath], {
      stderr: "pipe",
    });

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
