# Pull Requests

A PR serves two purposes: it gives CodeRabbit the technical context to review well, and it gives future-you a record of why a decision was made.

---

## When to Open a PR

Open a PR for anything that touches app logic. See `branching.md` for the full guideline on when to branch vs. commit directly to `main`.

---

## PR Title

Follow the same format as commits:

```
<prefix>(<location>/<area>): <what changed>
```

```
feat(user/auth): add sign-in page and Better Auth integration
fix(agent/loop): handle empty stdout from sandbox gracefully
db(db/schema): add messages table
```

---

## PR Description Template

```markdown
## What

<!-- One or two sentences. What does this PR do? -->

## Why

<!-- One or two sentences. What problem does it solve? -->

## How

<!-- The non-obvious technical decisions. Not a file-by-file walkthrough —
     just the choices that aren't self-evident from reading the diff. -->

## Notes

<!-- Anything the reviewer should watch out for. Known limitations,
     intentional shortcuts, or follow-up work deferred to a later PR. -->
```

Not every section needs to be long. A small PR might have one sentence per section. Leave a section blank if there is genuinely nothing to say — do not pad it.

---

## Before Opening

- [ ] Branch is up to date with `main`
- [ ] `bun run check` passes (types, lint, format)
- [ ] Commit messages follow the convention in `commits.md`
- [ ] PR title follows the commit format
- [ ] Description is filled in

## Before Merging

- [ ] CodeRabbit review is addressed — either fixed or explicitly acknowledged in a comment
- [ ] No unresolved threads
- [ ] `bun run check` still passes after any review changes
