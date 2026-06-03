import { beforeAll, afterAll } from "bun:test";

import { gitServer } from "@/index";

let testServer: Bun.Server<undefined>;

beforeAll(() => {
  testServer = Bun.serve({
    port: 3000,
    fetch: gitServer.fetch,
  });
  console.log(`Test Git server running at ${testServer.url.href}`);
});

afterAll(async () => {
  await testServer.stop();
});
