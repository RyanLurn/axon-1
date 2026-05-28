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

export const accountTable = sqliteTable(
  "accounts",
  {
    id,
    userId,
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
      mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
      mode: "timestamp_ms",
    }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    ...timestamps,
  },
  (table) => [index("user_id_index").on(table.userId)]
);

export const verificationTable = sqliteTable(
  "verifications",
  {
    id,
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    ...timestamps,
  },
  (table) => [index("identifier_index").on(table.identifier)]
);
