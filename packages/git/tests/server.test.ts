import { beforeAll, afterAll } from "bun:test";

import { gitServer } from "@/index";

let testServer: Bun.Server<undefined>;

beforeAll(() => {
  console.log("[SETUP] Setting up Git CGI server test...");

  testServer = Bun.serve({
    port: 3000,
    fetch: gitServer.fetch,
  });
  console.log(`[SETUP] Test Git server running at ${testServer.url.href}`);
});

afterAll(async () => {
  await testServer.stop();
});
