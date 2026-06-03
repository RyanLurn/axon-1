import type { Branded } from "@repo/types/branded";

import type { RepoName } from "@/utils/validators";

import { REPO_DIR_SUFFIX } from "@/utils/constants";

export type RepoDir = Branded<string, "RepoDir">;

export function getRepoDir(repoName: RepoName): RepoDir {
  const remoteName = repoName + REPO_DIR_SUFFIX;
  return remoteName as RepoDir;
}
