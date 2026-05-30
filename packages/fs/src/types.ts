import type { Branded } from "@repo/types/branded";

export type RealPath = Branded<string, "FilePath">;

export type FilePath = Branded<string, "FilePath">;

export type DirectoryPath = Branded<string, "DirectoryPath">;
