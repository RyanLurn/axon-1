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

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/constants";
import { authEnvVars } from "@/env-vars";

export const auth = betterAuth({
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
  emailAndPassword: {
    enabled: true,
    // Single user created at deployment -> no need for sign up
    disableSignUp: true,
    // For context, these lengths are the same as Better Auth's default.
    // We extracted them into variables so that we can later use them in Zod schemas.
    minPasswordLength: MIN_PASSWORD_LENGTH,
    maxPasswordLength: MAX_PASSWORD_LENGTH,
  },
  // Better Auth docs specifies that the tanstackStartCookies plugin must come last in the array.
  plugins: [tanstackStartCookies()],
});
