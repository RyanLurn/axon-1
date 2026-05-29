import type { BetterAuthOptions } from "better-auth";

import {
  verificationTable,
  accountTable,
  sessionTable,
} from "@repo/db/schema/tables/auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { userTable } from "@repo/db/schema/tables/user";
import { db } from "@repo/db";

import { authEnvVars } from "@/env-vars";

export const baseAuthOptions: BetterAuthOptions = {
  secret: authEnvVars.BETTER_AUTH_SECRET,
  baseURL: authEnvVars.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: userTable,
      session: sessionTable,
      account: accountTable,
      verification: verificationTable,
    },
  }),
  advanced: {
    database: {
      // Let Drizzle ORM generate the id. See `packages/db/src/schema/helpers/id.ts`.
      generateId: false,
    },
  },
};
