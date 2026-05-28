import {
  verificationTable,
  accountTable,
  sessionTable,
} from "@repo/db/schema/tables/auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { userTable } from "@repo/db/schema/tables/user";
import { betterAuth } from "better-auth";
import { db } from "@repo/db";

export const auth = betterAuth({
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
});
