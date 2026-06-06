import { sqliteTable, integer, index, text } from "drizzle-orm/sqlite-core";

import type { RepoName, RepoId } from "@/types/branded";

import { timestamps } from "@/schema/helpers/timestamps";
import { userId } from "@/schema/helpers/user-id";
import { id } from "@/schema/helpers/id";

export const repoTable = sqliteTable(
  "repos",
  {
    id: id.$type<RepoId>(),
    userId,
    name: text("name").notNull().unique().$type<RepoName>(),
    description: text("description"),
    deletionStartedAt: integer("deletion_started_at", { mode: "timestamp_ms" }),
    ...timestamps,
  },
  (table) => [
    index("repos_deletion_started_at_index").on(table.deletionStartedAt),
  ]
);
