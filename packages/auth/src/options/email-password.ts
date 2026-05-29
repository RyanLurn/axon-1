import type { BetterAuthOptions } from "better-auth";

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/constants";

export const emailPasswordOptions: BetterAuthOptions["emailAndPassword"] = {
  enabled: true,
  minPasswordLength: MIN_PASSWORD_LENGTH,
  maxPasswordLength: MAX_PASSWORD_LENGTH,
};
