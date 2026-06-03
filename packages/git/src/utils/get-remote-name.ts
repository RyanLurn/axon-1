import type { Branded } from "@repo/types/branded";

import type { RepoName } from "@/utils/validators";

import { REMOTE_REPO_SUFFIX } from "@/utils/constants";

export type RemoteName = Branded<string, "RemoteName">;

export function getRemoteName(repoName: RepoName): RemoteName {
  const remoteName = repoName + REMOTE_REPO_SUFFIX;
  return remoteName as RemoteName;
}
