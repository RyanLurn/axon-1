import { createAuthClient } from "better-auth/react";

import { authClientEnvVars } from "@/env-vars/client";

export const authClient = createAuthClient({
  baseURL: authClientEnvVars.VITE_BETTER_AUTH_URL,
});
