import type { Branded } from "@repo/types/branded";

import { join } from "node:path";

import type { RepoName } from "@/utils/validators";

import { REPO_DIR_SUFFIX } from "@/utils/constants";
import { gitEnvVars } from "@/utils/env-vars";

export type RepoPath = Branded<string, "RepoPath">;

export function getRepoPath(repoName: RepoName): RepoPath {
  const repoDir = repoName + REPO_DIR_SUFFIX;
  const repoPath = join(gitEnvVars.GIT_DIR_PATH, repoDir);
  return repoPath as RepoPath;
}
