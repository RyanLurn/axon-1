import type { repoTable } from "@/schema/tables/repo";

export type SelectedRepo = typeof repoTable.$inferSelect;
