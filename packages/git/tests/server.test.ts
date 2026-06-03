import { beforeAll, afterAll } from "bun:test";

import type { RepoName } from "@/utils/validators";

import { spawnInitBare } from "@/services/init-bare";
import { getRepoPath } from "@/utils/get-repo-path";
import { gitServer } from "@/index";

let testServer: Bun.Server<undefined>;
const testRepoName = "server-test-repo" as RepoName;
const testRepoPath = getRepoPath(testRepoName);

beforeAll(async () => {
  console.log("[SETUP] Setting up Git CGI server test...");

  const initTestRepoResult = await spawnInitBare(testRepoPath);
  if (!initTestRepoResult.success) {
    throw initTestRepoResult.error;
  }
  console.log(
    `[SETUP] Initialized a bare repo for testing at ${testRepoPath}.`
  );

  testServer = Bun.serve({
    port: 3000,
    fetch: gitServer.fetch,
  });
  console.log(`[SETUP] Test Git server running at ${testServer.url.href}`);
});

afterAll(async () => {
  await testServer.stop();
});
