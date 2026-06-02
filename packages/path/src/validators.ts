import { isAbsolute } from "node:path";
import { z } from "zod";

import type { AbsolutePath } from "@/types";

import { ABSOLUTE_PATH_FORMAT } from "@/constants";

export const absolutePathValidator = z
  .stringFormat(ABSOLUTE_PATH_FORMAT, (value) => isAbsolute(value))
  .transform((value) => value as AbsolutePath);
