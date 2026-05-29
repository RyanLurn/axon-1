import { createAuthClient } from "better-auth/react";

import { clientEnvVars } from "@/lib/env-vars/client";

export const authClient = createAuthClient({
  baseURL: clientEnvVars.VITE_BETTER_AUTH_URL,
});
