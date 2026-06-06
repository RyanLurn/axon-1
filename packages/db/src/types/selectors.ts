import type { RepoName, RepoId } from "@/types/branded";

export type RepoSelector =
  | {
      column: "name";
      value: RepoName;
    }
  | {
      column: "id";
      value: RepoId;
    };
