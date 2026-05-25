import { defineConfig } from "drizzle-kit";

import { dbEnvVars } from "@/index";

export default defineConfig({
  dbCredentials: {
    url: dbEnvVars.SQLITE_FILE_PATH,
  },
  schema: "./src/schema/tables",
  out: "./migrations",
  dialect: "sqlite",
});
