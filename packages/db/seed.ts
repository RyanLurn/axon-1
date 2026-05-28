import { seed } from "drizzle-seed";

import { userTable } from "@/schema/tables/user";
import { db } from "@/index";

async function main() {
  await seed(db, { userTable }, { count: 1 });
}

await main();
