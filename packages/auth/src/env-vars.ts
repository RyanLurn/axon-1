import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const authEnvVars = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
  },
  runtimeEnv: process.env,
});
