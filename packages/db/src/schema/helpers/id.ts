import { text } from "drizzle-orm/sqlite-core";

export const id = text("id")
  .primaryKey()
  .$defaultFn(() => Bun.randomUUIDv7());
