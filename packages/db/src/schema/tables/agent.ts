import { sqliteTable, index, text } from "drizzle-orm/sqlite-core";

import type { AgentId } from "@/types/branded";

import { timestamps } from "@/schema/helpers/timestamps";
import { userId } from "@/schema/helpers/user-id";
import { id } from "@/schema/helpers/id";

export const agentTable = sqliteTable(
  "agents",
  {
    id: id.$type<AgentId>(),
    userId,
    name: text("name").notNull(),
    description: text("description"),
    ...timestamps,
  },
  (table) => [index("agents_user_id_index").on(table.userId)]
);
