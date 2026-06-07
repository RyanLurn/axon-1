import { z } from "zod";

export const GIT_SERVICES = ["git-receive-pack", "git-upload-pack"] as const;
export const gitServiceValidator = z.enum(GIT_SERVICES);
export type GitService = z.infer<typeof gitServiceValidator>;
