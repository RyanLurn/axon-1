import { createEnv } from "@t3-oss/env-core";
import { isAbsolute } from "node:path";
import { z } from "zod";

export const gitEnvVars = createEnv({
  server: {
    GIT_DIR_PATH: z
      .string()
      .min(1)
      .refine((value) => isAbsolute(value)),
  },
  runtimeEnv: process.env,
});
