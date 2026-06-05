import type { StrictOmit } from "@repo/types/strict-omit";

import type { AgentId, UserId } from "@/types/branded";
import type { repoTable } from "@/schema/tables/git";

export type SelectedRepo = typeof repoTable.$inferSelect;
export interface SelectedUserRepo extends StrictOmit<
  SelectedRepo,
  "agentId" | "userId"
> {
  userId: UserId;
}
export interface SelectedAgentRepo extends StrictOmit<
  SelectedRepo,
  "agentId" | "userId"
> {
  agentId: AgentId;
}

export type InsertedRepo = typeof repoTable.$inferInsert;
export interface InsertedUserRepo extends StrictOmit<
  InsertedRepo,
  "agentId" | "userId"
> {
  userId: UserId;
}
export interface InsertedAgentRepo extends StrictOmit<
  InsertedRepo,
  "agentId" | "userId"
> {
  agentId: AgentId;
}
