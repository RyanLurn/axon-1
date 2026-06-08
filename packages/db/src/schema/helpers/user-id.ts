import { text } from "drizzle-orm/sqlite-core";

import type { UserId } from "@/types/branded";

import { userTable } from "@/schema/tables/user";

export const userId = text("user_id")
  .notNull()
  .$type<UserId>()
  .references(() => userTable.id, { onDelete: "cascade" });
