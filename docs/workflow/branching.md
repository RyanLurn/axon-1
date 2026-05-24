# Branching

Branching is flexible — use judgment rather than strict rules. The guidelines below are a starting point. Adjust as you go.

---

## The General Guideline

**Branch for anything that touches app logic.** Skip the branch for trivial changes.

Trivial changes that can go directly to `main`:

- Documentation only
- Formatting / style commits
- Minor chores like adding a dependency to the workspace catalog

Everything else — new features, bug fixes, refactors, schema changes — gets a branch and a PR. This gives CodeRabbit a chance to review before the code hits `main`.

When in doubt, branch. The cost of an unnecessary branch is low. The cost of a missed review on a logic bug is higher.

---

## Branch Naming

```
<prefix>/<location>-<short-description>
```

Use the same prefixes as commits. Keep the description short — two to four words, `kebab-case`.

```
feat/user-auth-sign-in-page
feat/agent-api-notification-endpoints
fix/agent-loop-empty-stdout
db/db-messages-table
chore/root-prettier-setup
docs/root-naming-conventions
```

---

## Lifecycle

1. Branch off `main`
2. Commit your work
3. Open a PR against `main`
4. Review, adjust if needed
5. Merge and delete the branch

Keep branches short-lived. A branch that lives for more than a few days is a signal that the scope is too large — consider splitting the work.
