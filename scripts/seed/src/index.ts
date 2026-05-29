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

  console.log("User seeded successfully");
}

try {
  await main();
} catch (error) {
  console.error(error);
}
