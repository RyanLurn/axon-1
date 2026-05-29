import { BASE_ERROR_CODES } from "better-auth";
import { isAPIError } from "better-auth/api";
import { auth } from "@repo/auth";

import { envVars } from "@/env-vars";

// Code used to test sign in flow. NOT for production.
async function main() {
  await auth.api.signUpEmail({
    body: {
      name: envVars.SEED_NAME,
      email: envVars.SEED_EMAIL,
      password: envVars.SEED_PASSWORD,
    },
  });

  console.log("User seeded successfully.");
}

try {
  await main();
} catch (error) {
  if (
    isAPIError(error) &&
    error.body?.code ===
      BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL.code
  ) {
    console.warn("User already seeded.");
  } else {
    console.error(error);
  }
}
