import type { RepoName, RepoPath } from "@repo/db/types/branded";

import { REPO_DIR_SUFFIX } from "@repo/db/validators/repo/name";
import { join } from "node:path";

import { gitEnvVars } from "@/utils/env-vars";

export function getRepoPath(repoName: RepoName): RepoPath {
  const repoDir = repoName + REPO_DIR_SUFFIX;
  const repoPath = join(gitEnvVars.GIT_DIR_PATH, repoDir);
  return repoPath as RepoPath;
}
