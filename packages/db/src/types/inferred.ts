import type { StrictOmit } from "@repo/types/strict-omit";

import type { repoTable } from "@/schema/tables/git";
import type { UserId } from "@/types/user-id";

export type SelectedRepo = typeof repoTable.$inferSelect;
export type InsertedRepo = typeof repoTable.$inferInsert;

export interface SelectedUserRepo extends StrictOmit<
  SelectedRepo,
  "agentId" | "userId"
> {
  userId: UserId;
}
