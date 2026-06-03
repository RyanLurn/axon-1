import { validator } from "hono/validator";
import { logger } from "hono/logger";
import { prettifyError } from "zod";
import { Hono } from "hono";

import { gitServiceValidator, repoNameValidator } from "@/utils/validators";
import { spawnReceivePack } from "@/services/receive-pack";
import { spawnUploadPack } from "@/services/upload-pack";
import { spawnInfoRefsAd } from "@/services/info-refs";
import { getRepoPath } from "@/utils/get-repo-path";

const repoPathParamValidator = validator("param", (value, c) => {
  const validationResult = repoNameValidator.safeParse(value["repo"]);

  if (!validationResult.success) {
    console.log(prettifyError(validationResult.error));
    return c.text("Invalid request", 400);
  }

  return getRepoPath(validationResult.data);
});

export const gitServer = new Hono()
  .use(logger())
  .get(
    "/:repo/info/refs",
    repoPathParamValidator,
    validator("query", (value, c) => {
      const validationResult = gitServiceValidator.safeParse(value["service"]);

      if (!validationResult.success) {
        console.log(prettifyError(validationResult.error));
        return c.text("Invalid request", 400);
      }

      return validationResult.data;
    }),
    async (c) => {
      const repoPath = c.req.valid("param");
      const service = c.req.valid("query");

      const spawnResult = await spawnInfoRefsAd({ repoPath, service });

      if (spawnResult.success === false) {
        const error = spawnResult.error;
        console.error(error);

        if (error.code === "NO_ENTRY_ERROR") {
          return c.text("Repository not found", 404);
        }

        return c.text("Internal server error", 500);
      }

      return spawnResult.data;
    }
  )
  .post("/:repo/git-receive-pack", repoPathParamValidator, async (c) => {
    const repoPath = c.req.valid("param");
    const requestBody = c.req.raw.body;

    if (requestBody === null) {
      return c.text("Invalid request", 400);
    }

    const spawnResult = await spawnReceivePack({ repoPath, requestBody });

    if (spawnResult.success === false) {
      const error = spawnResult.error;
      console.error(error);

      if (error.code === "NO_ENTRY_ERROR") {
        return c.text("Repository not found", 404);
      }

      return c.text("Internal server error", 500);
    }

    return spawnResult.data;
  })
  .post("/:repo/git-upload-pack", repoPathParamValidator, async (c) => {
    const repoPath = c.req.valid("param");
    const requestBody = c.req.raw.body;

    if (requestBody === null) {
      return c.text("Invalid request", 400);
    }

    const spawnResult = await spawnUploadPack({ repoPath, requestBody });

    if (spawnResult.success === false) {
      const error = spawnResult.error;
      console.error(error);

      if (error.code === "NO_ENTRY_ERROR") {
        return c.text("Repository not found", 404);
      }

      return c.text("Internal server error", 500);
    }

    return spawnResult.data;
  });
