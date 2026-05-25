# Commit Conventions

Commits follow a structured format based on Conventional Commits, extended with prefixes and scopes specific to this monorepo.

---

## Format

```
<prefix>(<location>/<area>): <what changed>
```

All three parts are required. Keep the message short and specific — describe what changed, not why. Save the "why" for the PR description.

---

## Prefix

| Prefix     | When to use                                            |
| ---------- | ------------------------------------------------------ |
| `feat`     | New functionality                                      |
| `fix`      | Bug fix                                                |
| `chore`    | Tooling, config, dependencies, scaffolding             |
| `refactor` | Code change with no behavior change                    |
| `docs`     | Documentation only                                     |
| `style`    | Formatting, no logic change                            |
| `test`     | Adding or fixing tests                                 |
| `perf`     | Performance improvement                                |
| `security` | Security-related change                                |
| `wip`      | Work in progress — committing to save state, not ready |

---

## Location

Location identifies which workspace was changed.

| Location            | Workspace                 |
| ------------------- | ------------------------- |
| `root`              | Monorepo root             |
| `user`              | `@repo/user`              |
| `agent`             | `@repo/agent`             |
| `agent-api`         | `@repo/agent-api`         |
| `db`                | `@repo/db`                |
| `types`             | `@repo/types`             |
| `typescript-config` | `@repo/typescript-config` |
| `eslint-config`     | `@repo/eslint-config`     |
| `tsdown-config`     | `@repo/tsdown-config`     |

If a change touches multiple workspaces, prefer splitting into separate commits. If that is not practical, use the location of the primary change.

---

## Area

A short freeform label for the subsystem within the location. Keep it one word.

Examples: `ui`, `auth`, `loop`, `api`, `schema`, `routes`, `config`, `deps`, `types`.

Don't overthink this — pick the most obvious word for what you touched.

---

## Examples

```
feat(user/ui): add Button component from shadcn/ui
feat(user/auth): add sign-in page and Better Auth integration
feat(agent-api/notifications): add subscription endpoints
fix(agent/loop): handle empty stdout from sandbox gracefully
chore(root/deps): add zod to workspace catalog
chore(root/format): configure Prettier
style(root/format): run Prettier across all files
docs(root/docs): add START-HERE and naming convention files
refactor(user/auth): extract session validation into helper
wip(agent/loop): interpreter call scaffolded, not wired up yet
```

---

## When to Commit

Commit when **one logical thing is done**. Not one file, not one hour — one logical unit of work.

If you find yourself writing "and" in the commit message, that is a signal to split it into two commits.

```
// ❌ Two things
chore(root/format): configure Prettier and run formatting

// ✅ Two commits
chore(root/format): configure Prettier
style(root/format): run Prettier across all files
```

The `wip` prefix exists for when you need to save state mid-task without the work being complete. Use it freely — it is better than one giant commit at the end.
