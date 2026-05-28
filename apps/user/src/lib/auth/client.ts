import { authClientEnvVars } from "@repo/auth/env-vars/client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: authClientEnvVars.VITE_BETTER_AUTH_URL,
});
