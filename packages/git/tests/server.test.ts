import { beforeAll, afterAll } from "bun:test";

import { gitServer } from "@/index";

let testServer: Bun.Server<undefined>;

beforeAll(async () => {
  testServer = Bun.serve({
    port: 3000,
    fetch: gitServer.fetch,
  });
});

afterAll(async () => {
  await testServer.stop();
});
