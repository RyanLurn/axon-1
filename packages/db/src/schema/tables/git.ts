import { sqliteTable, check, index, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

import type { RepoPath, RepoName, RepoId } from "@/types/git";
import type { AgentId } from "@/types/agent-id";
import type { UserId } from "@/types/user-id";

import { timestamps } from "@/schema/helpers/timestamps";
import { agentTable } from "@/schema/tables/agent";
import { userTable } from "@/schema/tables/user";
import { id } from "@/schema/helpers/id";

export const repoTable = sqliteTable(
  "repos",
  {
    id: id.$type<RepoId>(),
    name: text("name").notNull().$type<RepoName>(),
    path: text("path").notNull().$type<RepoPath>(),
    userId: text("user_id")
      .$type<UserId>()
      .references(() => userTable.id, {
        onDelete: "cascade",
      }),
    agentId: text("agent_id")
      .$type<AgentId>()
      .references(() => agentTable.id, {
        onDelete: "cascade",
      }),
    ...timestamps,
  },
  (table) => [
    check(
      "exactly_one_owner_check",
      sql`(
        (${table.userId} IS NOT NULL AND ${table.agentId} IS NULL) OR
        (${table.userId} IS NULL  AND ${table.agentId} IS NOT NULL)
      )`
    ),
    index("repos_name_index").on(table.name),
    index("repos_user_id_idx").on(table.userId),
    index("repos_agent_id_idx").on(table.agentId),
  ]
);
