import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

import type { UserId } from "@/types/user-id";

import { timestamps } from "@/schema/helpers/timestamps";
import { id } from "@/schema/helpers/id";

export const userTable = sqliteTable("users", {
  id: id.$type<UserId>(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  ...timestamps,
});
