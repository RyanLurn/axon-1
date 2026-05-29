import { tanstackStartCookies } from "better-auth/tanstack-start";
import { betterAuth } from "better-auth";

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/constants";
import { baseAuthOptions } from "@/options/base";

export const auth = betterAuth({
  ...baseAuthOptions,
  emailAndPassword: {
    enabled: true,
    // Single user created at deployment -> no need for sign up
    // disableSignUp: true,
    minPasswordLength: MIN_PASSWORD_LENGTH,
    maxPasswordLength: MAX_PASSWORD_LENGTH,
  },
  // Better Auth docs specifies that the tanstackStartCookies plugin must come last in the array.
  plugins: [tanstackStartCookies()],
});
