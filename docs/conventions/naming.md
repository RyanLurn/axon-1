# Naming Conventions

The goal of this document is to eliminate the "what should I call this?" moment. When in doubt, find the closest analogy in this file and follow it. If something is not covered here, follow the existing codebase and document it.

## Files and Directories

Use `kebab-case` for all file and directory names, without exception.

```
src/
  components/
    message-bubble.tsx     ✅
    MessageBubble.tsx      ❌
  lib/
    format-date.ts         ✅
    formatDate.ts          ❌
```

This applies to React component files too — the file is `kebab-case`, the exported component inside is `PascalCase`.

---

## Route Files (TanStack Start)

Follow TanStack Router's file-based routing conventions, using the **directory style** (not the `.` dot-separated flat style).

```
routes/
  __root.tsx              ← root layout
  _authed/
    route.tsx             ← pathless layout for authenticated routes
    dashboard/
      index.tsx           ← /dashboard
      settings.tsx        ← /dashboard/settings
  index.tsx               ← /
  about.tsx               ← /about
```

Follow TanStack Router's reserved filename conventions (`__root.tsx`, `route.tsx`, `index.tsx`, etc.) exactly as documented.

---

## TypeScript

### Variables and Functions

Use `camelCase`.

```ts
const loopIteration = 1;
function formatTimestamp(date: Date) { ... }
```

### Constants

Use `SCREAMING_SNAKE_CASE`.

```ts
const MESSAGE_SENDERS = ["user", "agent"] as const;
const MAX_RETRY_COUNT = 3;
```

### Types and Interfaces

Use `PascalCase`. Do not prefix interfaces with `I`. Do not suffix types with `Type`.

Default to `interface` for object-like shapes. Use `type` when you need type-specific behavior — discriminated unions, mapped types, conditional types, etc.

```ts
// Object shape → interface
interface LoopIteration {
  id: string;
  startedAt: Date;
  status: IterationStatus;
}

// Discriminated union → type
type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };
```

### Zod Schemas and Inferred Types

Name the schema with `camelCase` and a `Validator` suffix. The inferred type drops the suffix.

```ts
const userValidator = z.object({
  id: z.uuidv7(),
  email: z.email(),
});

type User = z.infer<typeof userValidator>;
```

---

## React Components

Component names use `PascalCase`. Props interfaces are named `[ComponentName]Props`. Follow the shadcn/ui pattern: extend native HTML element props where appropriate, forward `className`, and spread remaining props.

```tsx
interface MessageBubbleProps extends ComponentProps<"div"> {
  message: Message;
}

export function MessageBubble({
  message,
  className,
  ...props
}: MessageBubbleProps) {
  return (
    <div className={cn("...", className)} {...props}>
      ...
    </div>
  );
}
```

The file is `kebab-case`, the export is `PascalCase`:

```
message-bubble.tsx  → exports  MessageBubble
```

Use named export instead of default export.

---

## Database (Drizzle + SQLite)

### Tables

- Table variable names use `camelCase` with a `Table` suffix: `messageTable`, `userTable`
- The actual SQL table name (first argument to `sqliteTable`) uses **plural `snake_case`**: `"messages"`, `"users"`

```ts
export const messageTable = sqliteTable("messages", {
  ...
});
```

### Columns

- Column variable names (the object key) use `camelCase`: `readAt`, `createdAt`
- The actual SQL column name (first argument to the column helper) uses `snake_case`: `"read_at"`, `"created_at"`

```ts
export const messageTable = sqliteTable("messages", {
  id,
  sender: text("sender", { enum: MESSAGE_SENDERS }).notNull(),
  content: text("content").notNull(),
  readAt: integer("read_at", { mode: "timestamp_ms" }),
  ...timestampsWithDelete,
});
```

### Junction Tables (Many-to-Many)

Name them by joining the two table names with `To`: `userToRoleTable` → SQL name `"user_to_role"`.

### Enums

Define enum values as a `SCREAMING_SNAKE_CASE` constant array, then reference it in the column definition.

```ts
const MESSAGE_SENDERS = ["user", "agent"] as const;

sender: text("sender", { enum: MESSAGE_SENDERS }).notNull();
```

---

## Packages and Workspaces

All packages follow the `@repo/[kebab-case-name]` naming pattern.

```
@repo/db
@repo/types
@repo/typescript
@repo/eslint
```

---

## Environment Variables

Use a flat namespace with `SCREAMING_SNAKE_CASE`. No per-app prefixing.

```
DATABASE_URL
ANTHROPIC_API_KEY
BETTER_AUTH_SECRET
```
