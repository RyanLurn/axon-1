import { validator } from "hono/validator";
import { logger } from "hono/logger";
import { prettifyError } from "zod";
import { join } from "node:path";
import { Hono } from "hono";

import { gitServiceValidator, repoNameValidator } from "@/validators";
import { spawnReceivePack } from "@/services/receive-pack";
import { spawnInfoRefsAd } from "@/services/info-refs";
import { gitEnvVars } from "@/env-vars";

const repoPathParamValidator = validator("param", (value, c) => {
  const validationResult = repoNameValidator.safeParse(value["repo"]);

  if (!validationResult.success) {
    console.log(prettifyError(validationResult.error));
    return c.text("Invalid request", 400);
  }

  return validationResult.data;
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
      const repo = c.req.valid("param");
      const service = c.req.valid("query");

      const repoPath = join(gitEnvVars.GIT_DIR_PATH, repo);

      const spawnResult = await spawnInfoRefsAd({ repoPath, service });

      if (!spawnResult.isOk) {
        const error = spawnResult.error;
        console.error(error);

        if (error.code === "NO_ENTRY_ERROR") {
          return c.text("Repository not found", 404);
        }

        return c.text("Internal server error", 500);
      }

      return new Response(spawnResult.data, {
        status: 200,
        headers: {
          "Content-Type": `application/x-${service}-advertisement`,
          "Cache-Control": "no-cache",
        },
      });
    }
  )
  .post("/:repo/git-receive-pack", repoPathParamValidator, async (c) => {
    const repo = c.req.valid("param");
    const repoPath = join(gitEnvVars.GIT_DIR_PATH, repo);

    const requestBody = c.req.raw.body;

    if (requestBody === null) {
      return c.text("Invalid request", 400);
    }

    const spawnResult = await spawnReceivePack({ repoPath, requestBody });

    if (!spawnResult.isOk) {
      const error = spawnResult.error;
      console.error(error);

      if (error.code === "NO_ENTRY_ERROR") {
        return c.text("Repository not found", 404);
      }

      return c.text("Internal server error", 500);
    }

    return spawnResult.data;
  });
