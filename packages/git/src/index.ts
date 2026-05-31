import { validator } from "hono/validator";
import { prettifyError } from "zod";
import { join } from "node:path";
import { Hono } from "hono";

import { gitServiceValidator, repoNameValidator } from "@/validators";
import { spawnUploadPackAd } from "@/services/upload-pack";
import { gitEnvVars } from "@/env-vars";

export const gitServer = new Hono().get(
  "/:repo/info/refs",
  validator("param", (value, c) => {
    const validationResult = repoNameValidator.safeParse(value["repo"]);

    if (!validationResult.success) {
      console.log(prettifyError(validationResult.error));
      return c.text("Invalid request", 400);
    }

    return validationResult.data;
  }),
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

    if (service === "git-upload-pack") {
      const spawnResult = await spawnUploadPackAd(repoPath);

      if (!spawnResult.isOk) {
        const error = spawnResult.error;
        console.error(error);

        if (error.code === "NO_ENTRY_ERROR") {
          return c.text("Repository not found", 404);
        }

        return c.text("Internal server error", 500);
      }

      c.header("Content-Type", `application/x-${service}-advertisement`);
      c.header("Cache-Control", "no-cache");
      console.log(spawnResult.data);
      return c.text(spawnResult.data, 200);
    }

    console.error(`Client requested the ${service} service.`);
    return c.json(
      {
        error: {
          code: "UNSUPPORTED_SERVICE_ERROR",
          message: `The ${service} service is currently unsupported.`,
        },
      },
      400
    );
  }
);
