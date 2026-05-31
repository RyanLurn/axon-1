import { z } from "zod";

import {
  REPO_NAME_ALLOWED_CHARACTERS_REGEX,
  REPO_NAME_MAX_LENGTH,
  REPO_NAME_MIN_LENGTH,
  GIT_SERVICES,
} from "@/constants";

export const repoNameValidator = z
  .string()
  .min(REPO_NAME_MIN_LENGTH)
  .max(REPO_NAME_MAX_LENGTH)
  .regex(REPO_NAME_ALLOWED_CHARACTERS_REGEX);

export const gitServiceValidator = z.enum(GIT_SERVICES);
