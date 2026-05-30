import { isAbsolute } from "node:path";

import type { AbsolutePath } from "@/types";

export function validateAbsolutePath(path: string) {
  if (isAbsolute(path)) {
    return path as AbsolutePath;
  }
  return null;
}
