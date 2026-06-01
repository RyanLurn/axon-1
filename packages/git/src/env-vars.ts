import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const gitEnvVars = createEnv({
  server: {
    GIT_DIR_PATH: z.string().min(1),
  },
  runtimeEnv: process.env,
});
