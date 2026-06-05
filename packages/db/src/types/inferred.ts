import type { StrictOmit } from "@repo/types/strict-omit";

import type { repoTable } from "@/schema/tables/git";
import type { UserId } from "@/types/branded";

export type SelectedRepo = typeof repoTable.$inferSelect;
export type InsertedRepo = typeof repoTable.$inferInsert;

export interface SelectedUserRepo extends StrictOmit<
  SelectedRepo,
  "agentId" | "userId"
> {
  userId: UserId;
}
export interface InsertedUserRepo extends StrictOmit<
  InsertedRepo,
  "agentId" | "userId"
> {
  userId: UserId;
}
