import type { Branded } from "@repo/types/branded";

export type RealPath = Branded<string, "RealPath">;
export type RealFilePath = Branded<string, "RealFilePath">;
export type RealDirectoryPath = Branded<string, "RealDirectoryPath">;

export type SafePath = Branded<string, "SafePath">;
export type SafeFilePath = Branded<string, "SafeFilePath">;
export type SafeDirectoryPath = Branded<string, "SafeDirectoryPath">;
