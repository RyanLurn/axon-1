# Start Here

This is the entry point for the `axon-1` codebase documentation. If you are an AI reviewer, a returning contributor, or just getting oriented — read this first before anything else.

---

## What Is This Repo?

`axon-1` is the monorepo for **Axon Milestone 1** — a 24/7 autonomous AI agent built for a single user (the founder). The agent writes JavaScript, executes it in a sandboxed environment, and loops continuously without waiting for human input.

This repo contains all the processes that run on the VPS: the user-facing web app, the agent loop, the agent's REST API, and the shared infrastructure code that ties them together.

## What This Repo Is Not

- **Not a multi-user or SaaS product.** Milestone 1 is single-user by design. Do not apply multi-tenancy patterns.
- **Not a general-purpose AI framework.** Axon is purpose-built for one specific architecture. Generalizations are out of scope.
- **Not a frontend-heavy project.** There is exactly one app with a browser-facing UI (`@repo/user`). All other apps are server-side processes.
- **Not using a conventional tool-calling approach.** The agent's "tools" are a Node.js runtime and a set of HTTP endpoints. There is no JSON tool registry.

---

## Monorepo Map

This repo uses Bun workspaces with Turborepo for task orchestration.

### `apps/` — Runnable Processes

These are the processes that run on the VPS. Each is a standalone application.

| Package           | Description                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@repo/user`      | The User Web App. The only process exposed to the public internet. Serves the Git platform (user-facing), the Change Request UI, and the chat interface. Built with React and TanStack Start.   |
| `@repo/agent`     | The Agent Loop. A `while-true` process that runs the three-call LLM pipeline (Interpreter → Decision Maker → Actor) continuously.                                                               |
| `@repo/agent-api` | The Agent API. A REST API that lives on `localhost` only. This is the agent's interface to everything outside its sandbox — notifications, chat messages, web search, Git operations, and more. |

> More apps may be added as the build progresses. This table will be updated accordingly.

### `packages/` — Shared Code

Internal packages consumed by the apps above. Not deployed independently.

| Package       | Description                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@repo/db`    | Database client, schema definitions, and migrations. Built on Drizzle ORM with SQLite. The single source of truth for all persistent data shapes. |
| `@repo/types` | Shared TypeScript utility types used across the monorepo. Examples: `Result`, `Branded`, `StrictOmit`. No runtime code — types only.              |

> There is no shared UI package (only one app has a frontend) and no shared auth package (auth logic is scoped entirely to `@repo/user`).

### `configs/` — Shared Tooling Config

| Package            | Description                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `@repo/typescript` | Base `tsconfig.json` files extended by each app and package.                                                                                 |
| `@repo/eslint`     | Shared ESLint configuration.                                                                                                                 |
| `@repo/tsdown`     | Shared `tsdown` config for building internal packages. `tsdown` is the `tsup` equivalent for Rolldown, maintained by the Vite/Rolldown team. |

---

## How to Navigate the Docs

| If you want to know...                                     | Go to...                    |
| ---------------------------------------------------------- | --------------------------- |
| The system architecture and how the processes relate       | `architecture/overview.md`  |
| How data flows through the system end-to-end               | `architecture/data-flow.md` |
| How authentication works                                   | `architecture/auth.md`      |
| The full tech stack with versions                          | `stack/overview.md`         |
| Why a specific package was chosen over alternatives        | `stack/packages.md`         |
| Naming conventions (files, variables, tables, components)  | `conventions/naming.md`     |
| Cross-cutting patterns (error handling, env vars, logging) | `conventions/patterns.md`   |
| Database conventions (table naming, migrations)            | `conventions/database.md`   |
| How to create a commit                                     | `workflow/commits.md`       |
| How to open and merge a PR                                 | `workflow/pr.md`            |
| Branching strategy                                         | `workflow/branching.md`     |

---

## Getting Started

Install dependencies:

```bash
bun install
```

> Environment setup (`.env` files, Docker, etc.) will be documented here incrementally as each app is brought online.

---

## A Note for AI Reviewers

This project uses a modern stack. Some versions may be ahead of your training data. Before flagging something as incorrect syntax or a deprecated pattern, check `stack/overview.md` for the canonical version list. Known packages with non-obvious API changes from older versions include: React 19, TanStack Start, Tailwind v4, Zod v4, Better Auth, and `tsdown`.

When reviewing logic, the most important context is how data flows between the three main processes (`@repo/user`, `@repo/agent`, `@repo/agent-api`) and through the shared database (`@repo/db`). Refer to `architecture/data-flow.md` for this.
