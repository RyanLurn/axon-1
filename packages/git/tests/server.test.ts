import { beforeAll, afterAll } from "bun:test";
import { remove } from "@repo/fs/remove";

import type { RepoName } from "@/utils/validators";

import { spawnInitBare } from "@/operations/create-repo";
import { getRepoPath } from "@/utils/get-repo-path";
import { gitServer } from "@/index";

let testServer: Bun.Server<undefined> | undefined = undefined;
const testRepoName = "server-test-repo" as RepoName;
const testRepoPath = getRepoPath(testRepoName);

beforeAll(async () => {
  console.log("[SETUP] Setting up Git CGI server test...");

  const initTestRepoResult = await spawnInitBare(testRepoPath);
  if (!initTestRepoResult.success) {
    console.error(`[SETUP] Failed to init ${testRepoName} at ${testRepoPath}.`);
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
  if (testServer) {
    await testServer.stop();
    console.log("[TEARDOWN] Git CGI server stopped.");
  }

  const removeTestRepoResult = await remove(testRepoPath, {
    force: true,
    recursive: true,
  });
  if (!removeTestRepoResult.success) {
    console.warn(
      `[TEARDOWN] Failed to remove ${testRepoName} at ${testRepoPath}.`
    );
    console.warn(removeTestRepoResult.error);
  } else {
    console.log(`[TEARDOWN] Removed ${testRepoName} at ${testRepoPath}.`);
  }
});
