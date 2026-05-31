import { validator } from "hono/validator";
import { prettifyError } from "zod";
import { Hono } from "hono";

import { repoNameValidator } from "@/validators";

export const gitServer = new Hono().get(
  "/:repoName/info/refs",
  validator("param", (value, c) => {
    const validationResult = repoNameValidator.safeParse(value["repoName"]);

    if (!validationResult.success) {
      console.log(prettifyError(validationResult.error));
      return c.json(
        {
          error: { code: "VALIDATION_ERROR", message: "Invalid repo name." },
        },
        400
      );
    }

    return validationResult.data;
  }),
  (c) => {
    return c.json({ data: "Yay!" }, 200);
  }
);
