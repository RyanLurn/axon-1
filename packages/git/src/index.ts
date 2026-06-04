import { logger } from "hono/logger";
import { prettifyError } from "zod";
import { Hono } from "hono";

import { gitServiceValidator, repoNameValidator } from "@/utils/validators";
import { spawnReceivePack } from "@/operations/receive-pack";
import { spawnUploadPack } from "@/operations/upload-pack";
import { spawnInfoRefsAd } from "@/operations/info-refs";
import { getRepoPath } from "@/utils/get-repo-path";

export const gitServer = new Hono()
  .basePath("/git")
  .use(logger())
  .get("/:repo/info/refs", async (c) => {
    // Validate the :repo path param
    const parseRepoNameResult = repoNameValidator.safeParse(
      c.req.param("repo")
    );
    if (!parseRepoNameResult.success) {
      console.log(prettifyError(parseRepoNameResult.error));
      return c.text("Invalid request", 400);
    }
    const repoName = parseRepoNameResult.data;
    const repoPath = getRepoPath(repoName);

    // Validate the ?service query param
    const parseServiceQueryResult = gitServiceValidator.safeParse(
      c.req.query("service")
    );
    if (!parseServiceQueryResult.success) {
      console.log(prettifyError(parseServiceQueryResult.error));
      return c.text("Invalid request", 400);
    }
    const service = parseServiceQueryResult.data;

    // Spawn a Git child process to inform the client about the repo's refs
    const spawnAdResult = await spawnInfoRefsAd({ repoPath, service });
    if (!spawnAdResult.success) {
      const error = spawnAdResult.error;
      console.error(error);
      if (error.code === "NO_ENTRY_ERROR") {
        return c.text("Repository not found", 404);
      }
      return c.text("Internal server error", 500);
    }
    return new Response(spawnAdResult.data, {
      status: 200,
      headers: {
        "Content-Type": `application/x-${service}-advertisement`,
        "Cache-Control": "no-cache",
      },
    });
  })
  .post("/:repo/git-receive-pack", async (c) => {
    // Validate the :repo path param
    const parseRepoNameResult = repoNameValidator.safeParse(
      c.req.param("repo")
    );
    if (!parseRepoNameResult.success) {
      console.log(prettifyError(parseRepoNameResult.error));
      return c.text("Invalid request", 400);
    }
    const repoName = parseRepoNameResult.data;
    const repoPath = getRepoPath(repoName);

    // Get the request body
    const requestBody = c.req.raw.body;
    if (requestBody === null) {
      return c.text("Invalid request", 400);
    }

    // Spawn a Git child process to receive data from the client
    const spawnReceivePackResult = await spawnReceivePack({
      repoPath,
      requestBody,
    });
    if (!spawnReceivePackResult.success) {
      const error = spawnReceivePackResult.error;
      console.error(error);
      if (error.code === "NO_ENTRY_ERROR") {
        return c.text("Repository not found", 404);
      }
      return c.text("Internal server error", 500);
    }
    return new Response(spawnReceivePackResult.data, {
      status: 200,
      headers: {
        "Content-Type": "application/x-git-receive-pack-result",
        "Cache-Control": "no-cache",
      },
    });
  })
  .post("/:repo/git-upload-pack", async (c) => {
    // Validate the :repo path param
    const parseRepoNameResult = repoNameValidator.safeParse(
      c.req.param("repo")
    );
    if (!parseRepoNameResult.success) {
      console.log(prettifyError(parseRepoNameResult.error));
      return c.text("Invalid request", 400);
    }
    const repoName = parseRepoNameResult.data;
    const repoPath = getRepoPath(repoName);

    // Get the request body
    const requestBody = c.req.raw.body;
    if (requestBody === null) {
      return c.text("Invalid request", 400);
    }

    // Spawn a Git child process to send data to the client
    const spawnUploadPackResult = await spawnUploadPack({
      repoPath,
      requestBody,
    });
    if (!spawnUploadPackResult.success) {
      const error = spawnUploadPackResult.error;
      console.error(error);
      if (error.code === "NO_ENTRY_ERROR") {
        return c.text("Repository not found", 404);
      }
      return c.text("Internal server error", 500);
    }
    return new Response(spawnUploadPackResult.data, {
      status: 200,
      headers: {
        "Content-Type": "application/x-git-upload-pack-result",
        "Cache-Control": "no-cache",
      },
    });
  });
