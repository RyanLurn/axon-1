import { validator } from "hono/validator";
import { prettifyError } from "zod";
import { join } from "node:path";
import { Hono } from "hono";

import { spawnUploadPackAdvertisement } from "@/services/upload-pack/advertisement";
import { gitServiceValidator, repoNameValidator } from "@/validators";
import { gitEnvVars } from "@/env-vars";

export const gitServer = new Hono().get(
  "/:repoName/info/refs",
  validator("param", (value, c) => {
    const paramValidationResult = repoNameValidator.safeParse(
      value["repoName"]
    );

    if (!paramValidationResult.success) {
      console.log(prettifyError(paramValidationResult.error));
      return c.json(
        {
          error: { code: "VALIDATION_ERROR", message: "Invalid repo name." },
        },
        400
      );
    }

    return paramValidationResult.data;
  }),
  validator("query", (value, c) => {
    const queryValidationResult = gitServiceValidator.safeParse(
      value["service"]
    );

    if (!queryValidationResult.success) {
      console.log(prettifyError(queryValidationResult.error));
      return c.json(
        {
          error: { code: "VALIDATION_ERROR", message: "Invalid query param." },
        },
        400
      );
    }

    return queryValidationResult.data;
  }),
  async (c) => {
    const repoName = c.req.valid("param");
    const service = c.req.valid("query");

    const repoPath = join(gitEnvVars.GIT_DIR_PATH, repoName);

    if (service === "git-upload-pack") {
      const spawnResult = await spawnUploadPackAdvertisement(repoPath);

      if (!spawnResult.isOk) {
        const error = spawnResult.error;
        console.error(error);

        if (error.code === "NO_ENTRY_ERROR") {
          return c.json(
            {
              error: {
                code: "NOT_FOUND_ERROR",
                message: `The repo "${repoName}" doesn't exist.`,
              },
            },
            404
          );
        }

        return c.json(
          {
            error: { code: "INTERNAL_ERROR", message: "Something went wrong." },
          },
          500
        );
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
