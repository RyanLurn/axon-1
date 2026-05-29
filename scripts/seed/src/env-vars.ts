import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@repo/auth/constants";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envVars = createEnv({
  server: {
    SQLITE_FILE_PATH: z.string().min(1),
    SEED_EMAIL: z.email(),
    SEED_PASSWORD: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  },
  runtimeEnv: process.env,
});
