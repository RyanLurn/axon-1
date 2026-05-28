import { text } from "drizzle-orm/sqlite-core";

import { userTable } from "@/schema/tables/user";

export const userId = text("user_id")
  .notNull()
  .references(() => userTable.id, { onDelete: "cascade" });
