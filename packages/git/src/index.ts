import { validator } from "hono/validator";
import { prettifyError } from "zod";
import { Hono } from "hono";

import { gitServiceValidator, repoNameValidator } from "@/validators";

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
  (c) => {
    return c.json({ data: "Yay!" }, 200);
  }
);
