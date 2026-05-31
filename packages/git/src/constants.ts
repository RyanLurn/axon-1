export const REPO_NAME_MIN_LENGTH = 1;
export const REPO_NAME_MAX_LENGTH = 100;
export const REPO_NAME_ALLOWED_CHARACTERS_REGEX = /^[a-zA-Z0-9_-]+$/;

export const GIT_SERVICES = ["git-receive-pack", "git-upload-pack"] as const;
