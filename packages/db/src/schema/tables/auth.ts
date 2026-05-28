import { sqliteTable, integer, index, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "@/schema/helpers/timestamps";
import { userId } from "@/schema/helpers/user-id";
import { id } from "@/schema/helpers/id";

export const sessionTable = sqliteTable(
  "sessions",
  {
    id,
    userId,
    token: text("token").notNull().unique(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    ...timestamps,
  },
  (table) => [index("user_id_index").on(table.userId)]
);
