import { makeTemporaryDirectory } from "@repo/fs/make-temporary-directory";
import { beforeAll, afterAll } from "bun:test";
import { remove } from "@repo/fs/remove";

import type { RepoName } from "@/utils/validators";

import { createRepo } from "@/operations/create-repo";
import { getRepoPath } from "@/utils/get-repo-path";
import { gitServer } from "@/index";

let testServer: Bun.Server<undefined> | undefined = undefined;

const testRepoName = "test-repo" as RepoName;

const remoteRepoPath = getRepoPath(testRepoName);

let tempDirPath: undefined | string = undefined;

beforeAll(async () => {
  console.log("[SETUP] Setting up Git CGI server test...");

  // Create the temporary directory for "local" repos
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace("T", "_")
    .replace(/\..+/, "");
  const makeTemporaryDirectoryResult = await makeTemporaryDirectory(
    `test-${timestamp}-`
  );
  if (!makeTemporaryDirectoryResult.success) {
    console.error(
      `[SETUP] Failed to create the temporary directory for "local" repos.`
    );
    throw makeTemporaryDirectoryResult.error;
  }
  tempDirPath = makeTemporaryDirectoryResult.data;
  console.log(
    `[SETUP] Created the temporary directory for "local" repos at "${tempDirPath}".`
  );

  // Create the test repo
  const createTestRepoResult = await createRepo({
    repoPath: remoteRepoPath,
    isBare: true,
  });
  if (!createTestRepoResult.success) {
    console.error(
      `[SETUP] Failed to create a bare repo for testing at "${remoteRepoPath}".`
    );
    throw createTestRepoResult.error;
  }
  console.log(
    `[SETUP] Created a bare repo for testing at "${remoteRepoPath}".`
  );

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
  const removeTestRepoResult = await remove(remoteRepoPath, {
    force: true,
    recursive: true,
  });
  if (!removeTestRepoResult.success) {
    console.warn(
      `[TEARDOWN] Failed to remove ${testRepoName} at "${remoteRepoPath}".`
    );
    console.warn(removeTestRepoResult.error);
  } else {
    console.log(`[TEARDOWN] Removed ${testRepoName} at "${remoteRepoPath}".`);
  }

  // Remove the temporary directory
  if (tempDirPath) {
    const removeTempDirResult = await remove(tempDirPath, {
      force: true,
      recursive: true,
    });
    if (!removeTempDirResult.success) {
      console.warn(
        `[TEARDOWN] Failed to remove the temporary directory at "${tempDirPath}".`
      );
      console.warn(removeTempDirResult.error);
    } else {
      console.log(
        `[TEARDOWN] Removed the temporary directory at "${tempDirPath}".`
      );
    }
  } else {
    console.warn(
      "[TEARDOWN] The temporary directory was never created. Skip its removing step."
    );
  }
});
