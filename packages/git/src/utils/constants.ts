export const REMOTE_REPO_SUFFIX = ".git";

export const REPO_NAME_FORMAT = "repo_name";
export const REPO_NAME_MAX_LENGTH = 100;
export const REPO_NAME_ALLOWED_CHARACTERS_REGEX = /^[a-zA-Z0-9_.-]+$/;

// Checking whether a name starts or ends with a period or hyphen can cover these cases.
// We just add them here for more detailed error messages.
export const RESERVED_GIT_NAMES = new Set([
  ".gitattributes",
  ".gitmodules",
  ".gitignore",
  ".git",
  "..",
  "--",
  "-",
  ".",
]);
// Even though the server runs on Linux, users may clone the repo down to their Windows PCs.
// That's why we also need to check for Windows reserved names.
export const RESERVED_WINDOWS_NAMES = new Set([
  "com0",
  "com1",
  "com2",
  "com3",
  "com4",
  "com5",
  "com6",
  "com7",
  "com8",
  "com9",
  "lpt0",
  "lpt1",
  "lpt2",
  "lpt3",
  "lpt4",
  "lpt5",
  "lpt6",
  "lpt7",
  "lpt8",
  "lpt9",
  "con",
  "prn",
  "aux",
  "nul",
]);

export const GIT_SERVICES = ["git-receive-pack", "git-upload-pack"] as const;
