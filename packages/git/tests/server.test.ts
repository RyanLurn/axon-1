import { beforeAll, afterAll } from "bun:test";
import { remove } from "@repo/fs/remove";

import type { RepoName } from "@/utils/validators";

import { createRepo } from "@/operations/create-repo";
import { getRepoPath } from "@/utils/get-repo-path";
import { gitServer } from "@/index";

let testServer: Bun.Server<undefined> | undefined = undefined;
const testRepoName = "server-test-repo" as RepoName;
const testRepoPath = getRepoPath(testRepoName);

beforeAll(async () => {
  console.log("[SETUP] Setting up Git CGI server test...");

  // Create the test repo
  const createTestRepoResult = await createRepo({
    repoPath: testRepoPath,
    isBare: true,
  });
  if (!createTestRepoResult.success) {
    console.error(
      `[SETUP] Failed to create a bare repo for testing at "${testRepoPath}".`
    );
    throw createTestRepoResult.error;
  }
  console.log(`[SETUP] Created a bare repo for testing at "${testRepoPath}".`);

  // Start the test server
  testServer = Bun.serve({
    port: 3000,
    fetch: gitServer.fetch,
  });
  console.log(`[SETUP] Test Git server running at ${testServer.url.href}`);
});

afterAll(async () => {
  // Stop the test server
  if (testServer) {
    await testServer.stop();
    console.log("[TEARDOWN] Git CGI server stopped.");
  } else {
    console.warn(
      "[TEARDOWN] Git CGI server was never started. Skip stopping step."
    );
  }

  // Remove the test repo
  const removeTestRepoResult = await remove(testRepoPath, {
    force: true,
    recursive: true,
  });
  if (!removeTestRepoResult.success) {
    console.warn(
      `[TEARDOWN] Failed to remove ${testRepoName} at "${testRepoPath}".`
    );
    console.warn(removeTestRepoResult.error);
  } else {
    console.log(`[TEARDOWN] Removed ${testRepoName} at "${testRepoPath}".`);
  }
});
