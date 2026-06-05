import type { Branded } from "@repo/types/branded";

export type UserId = Branded<string, "UserId">;
export type AgentId = Branded<string, "AgentId">;

export type RepoId = Branded<string, "RepoId">;
export type RepoName = Branded<string, "RepoName">;
export type RepoPath = Branded<string, "RepoPath">;
