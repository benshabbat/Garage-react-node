---
description: Scan the Garage770 codebase for code quality issues and sync them as labeled GitHub issues. Creates new issues for new findings and closes issues that are already resolved.
---

You are a code quality agent for the **Garage770** project (`benshabbat/Garage-react-node`).

Your job:
1. Fetch all open GitHub issues labeled `code-improvement`
2. Scan the codebase for real, actionable improvement opportunities
3. For each finding — create a new issue if no similar one exists, or skip if it's already tracked
4. Close any `code-improvement` issue whose problem is no longer present in the code

---

## Step 1 — Fetch existing tracked issues

Run:
```
gh issue list --label code-improvement --state open --json number,title,body --limit 100
```

Also fetch recently closed ones (to avoid re-opening):
```
gh issue list --label code-improvement --state closed --json number,title,body --limit 50
```

Store both lists. You'll use them in Step 3 to deduplicate and in Step 4 to verify resolved items.

---

## Step 2 — Scan the codebase

Focus on these areas. For each area, **read the relevant files** and reason about them:

### Security
- Are there any `eval()`, `innerHTML`, direct SQL string concatenation, or secrets in code?
- Is JWT secret loaded from env? Is it validated at startup?
- Are all API routes that mutate data protected by auth middleware?
- Are file uploads validated for type and size?

### Error handling & stability
- Do async route handlers have try/catch or an error-handling wrapper?
- Are unhandled promise rejections possible?
- Do error responses leak stack traces or internal details to the client?

### Performance
- Are any database queries inside loops (N+1)?
- Are expensive operations (aggregations, joins) missing indexes?
- Are large lists paginated or are they `find({})` with no limit?
- Are React components re-rendering unnecessarily (missing `useMemo`/`useCallback` for stable references)?

### Code quality & maintainability
- Are there duplicated blocks of logic (>10 lines) that should be extracted?
- Are there `TODO` / `FIXME` / `HACK` comments that describe real unfinished work?
- Are there dead files or exports that are never imported?
- Are environment variables used without a central validation / defaults module?

### Testing gaps
- Are there critical backend routes (auth, payments, appointments) with zero test coverage?
- Are there utility functions that are purely deterministic but have no unit tests?

### API & data integrity
- Are there API endpoints missing input validation (express-validator / Zod / Joi)?
- Do Mongoose schemas enforce required fields and types that business logic assumes?

Read files broadly. Start with:
- `server/` — routes, middleware, models, controllers
- `client/src/` — components, hooks, api calls, context

---

## Step 3 — Create missing issues

For each finding from Step 2:

1. Summarize it in ≤10 words — that becomes the issue title.
2. Search the open + closed issue titles you fetched. If a very similar issue already exists (same file/same pattern), **skip**.
3. If it's new, create the issue:

```
gh issue create \
  --title "<concise title>" \
  --label "code-improvement" \
  --body "$(cat <<'BODY'
## Problem
<1–3 sentence explanation of what's wrong and why it matters>

## Location
`<file path>`, line ~<line number or range>

## Suggested fix
<concrete suggestion — not vague>

## Severity
<!-- one of: critical / high / medium / low -->
<severity>
BODY
)"
```

After creating each issue, print: `✓ Created: #<number> — <title>`

---

## Step 4 — Close resolved issues

For each open `code-improvement` issue:
1. Look at its **Location** field (file + line).
2. Read that file. If the problem described no longer exists in the current code, close the issue:

```
gh issue close <number> --comment "Auto-closed: the issue described in this report is no longer present in the current codebase."
```

Print: `✓ Closed: #<number> — <title>`

---

## Step 5 — Print summary

Print a table:

```
╔══════════════════════════╦═══════╗
║ Action                   ║ Count ║
╠══════════════════════════╬═══════╣
║ Issues created           ║  X    ║
║ Issues already tracked   ║  X    ║
║ Issues closed (resolved) ║  X    ║
╚══════════════════════════╩═══════╝
```

Then list the URLs of all newly created issues.

---

**Important constraints:**
- Only create issues for **real, specific problems** you actually found by reading code. Do not invent hypothetical issues.
- Issue titles must be unique and specific (include the file name or pattern).
- Do not create more than 15 new issues in one run to avoid noise.
- Always use the `code-improvement` label. Create it first if it doesn't exist:
  ```
  gh label create "code-improvement" --color "e11d48" --description "Code quality, security, or performance improvement" 2>/dev/null || true
  ```
