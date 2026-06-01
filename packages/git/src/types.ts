import type { Branded } from "@repo/types/branded";

export type ValidRepoName = Branded<string, "ValidRepoName">;

export type SafeRepoPath = Branded<string, "SafeRepoPath">;
