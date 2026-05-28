import {
  verificationTable,
  accountTable,
  sessionTable,
} from "@repo/db/schema/tables/auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { userTable } from "@repo/db/schema/tables/user";
import { betterAuth } from "better-auth";
import { db } from "@repo/db";

import { authServerEnvVars } from "@/env-vars/server";

export const auth = betterAuth({
  secret: authServerEnvVars.BETTER_AUTH_SECRET,
  baseURL: authServerEnvVars.BETTER_AUTH_URL,
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
  emailAndPassword: {
    enabled: true,
    disableSignUp: true, // Single user created at deployment -> no need for sign up
  },
  // Better Auth docs specifies that the tanstackStartCookies plugin must come last in the array.
  plugins: [tanstackStartCookies()],
});
