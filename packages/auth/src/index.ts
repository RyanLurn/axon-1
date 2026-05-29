import { tanstackStartCookies } from "better-auth/tanstack-start";
import { betterAuth } from "better-auth";

import { emailPasswordOptions } from "@/options/email-password";
import { baseAuthOptions } from "@/options/base";

export const userAuth = betterAuth({
  ...baseAuthOptions,
  emailAndPassword: {
    ...emailPasswordOptions,
    disableSignUp: true,
  },
  // Better Auth docs specifies that the tanstackStartCookies plugin must come last in the array.
  plugins: [tanstackStartCookies()],
});
