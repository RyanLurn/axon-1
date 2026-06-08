import type { StrictOmit } from "@repo/types/strict-omit";
import type { UserId } from "@repo/db/types/branded";

import type { userAuth } from "@/index";

export type AppUser = StrictOmit<typeof userAuth.$Infer.Session.user, "id"> & {
  id: UserId;
};
