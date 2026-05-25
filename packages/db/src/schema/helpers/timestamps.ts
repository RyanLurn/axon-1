import { integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(unixepoch() * 1000)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$onUpdate(() => new Date()),
};
