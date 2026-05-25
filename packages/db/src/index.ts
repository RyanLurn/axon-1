import { drizzle } from "drizzle-orm/bun-sqlite";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { userTable } from "@/schema/tables/user";

const dbEnvVars = createEnv({
  server: {
    SQLITE_FILE_PATH: z.string().min(1),
  },
  runtimeEnv: process.env,
});

export const db = drizzle(dbEnvVars.SQLITE_FILE_PATH, {
  schema: { userTable },
});
