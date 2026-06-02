import type { Branded } from "@repo/types/branded";

export type RealPath = Branded<string, "RealPath">;

export type SafePath = Branded<string, "SafePath">;

export type FilePath = Branded<string, "FilePath">;

export type DirectoryPath = Branded<string, "DirectoryPath">;
