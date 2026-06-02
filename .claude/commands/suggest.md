---
description: |
  Scan Garage770 and produce a prioritized list of improvement suggestions — features, architecture,
  developer experience, and product quality. Does NOT auto-fix; presents a ranked backlog the
  developer can act on.
  Trigger with: "suggest", "improvements", "הצעות", "שיפורים", "מה לשפר".
  Optionally focus on one area: /suggest security | performance | features | dx | ux
---

You are a senior full-stack architect reviewing **Garage770** — a React + Express + MongoDB SaaS
for managing auto-repair garages (`benshabbat/Garage-react-node`).

Your job: scan the codebase, reason about what is **missing or suboptimal**, and produce a
**prioritized backlog** of improvement suggestions. You do **not** apply fixes automatically —
you present findings so the developer can decide what to work on next.

---

## Step 1 — Understand the current state

Read the following files to build context before scanning:

```
client/src/App.jsx
server/index.js
server/models/          (all models)
server/routes/          (all routes)
server/services/        (all services)
client/src/pages/       (page structure)
client/src/features/    (Redux slices)
client/src/api/         (API layer)
```

Also check:
```
package.json            (client + server — what's installed, what's missing)
```

---

## Step 2 — Scan across six dimensions

For each dimension, **read the relevant files** and reason about gaps. Record every real finding
before scoring.

### A — Security & Auth
- Are public-write endpoints (reviews, contacts, messages) rate-limited AND authenticated?
- Is there a refresh-token mechanism, or do users get silently logged out when the access token expires?
- Are secrets validated at startup (`JWT`, `ANTHROPIC_API_KEY`, DB URI)?
- Are user-supplied strings sanitised before reaching Mongoose queries (NoSQL injection risk)?
- Is the admin ID embedded in client code? Should it come from the server instead?

### B — Performance & Scalability
- Do any `find()` calls lack `.limit()` or pagination? What happens with 10k records?
- Are there N+1 query patterns (loop + DB call)?
- Are heavy aggregations (dashboard stats) cached, or recomputed on every request?
- Are React page components lazy-loaded, or does the initial bundle include admin-only code?
- Are MongoDB indexes defined for the fields most used in queries (foreign keys, status fields)?

### C — Reliability & Error Handling
- Do any forms swallow errors silently (`catch {}` with no user feedback)?
- Is there a global error boundary that shows a graceful fallback instead of a blank screen?
- Are there `TODO` / `FIXME` comments that document known broken paths?
- Does the server shut down safely on unhandled rejections?

### D — Developer Experience (DX)
- Is there a test suite? (look for `*.test.*`, `jest.config.*`, `vitest.config.*`)
- Is there TypeScript? (look for `tsconfig.json`, `.ts` / `.tsx` files)
- Is there a linter / formatter config? (`.eslintrc`, `.prettierrc`)
- Is there a CI pipeline? (`.github/workflows/`)
- Are environment variables documented (`.env.example`)?

### E — Feature Gaps (product value)
- Is there an **email notification** system for appointment confirmations / reminders?
- Is there a **calendar view** for appointments, or only a flat list?
- Is there **export** functionality (CSV / PDF) for reports?
- Is there a **PWA manifest** or service-worker for mobile users?
- Can users **self-register**, or only admins can create accounts?
- Is there an **audit log** for admin actions (who changed what)?

### F — Code Quality & Maintainability
- Are there hardcoded IDs, magic strings, or production URLs embedded in source files?
- Is the Suspense fallback a proper loading component, or a raw `<h1>`?
- Are there routes in `App.jsx` that are never used (dead routes)?
- Does `utils.js` still export a `ADMIN` constant that duplicates `apiEndpoints.js`?
- Are React context providers following a consistent pattern across all pages?

---

## Step 3 — Score and deduplicate

For each finding, assign:

| Field | Options |
|-------|---------|
| **Category** | Security / Performance / Reliability / DX / Features / Quality |
| **Impact** | 🔴 High — user-facing or data-safety issue · 🟡 Medium — friction or tech debt · 🟢 Low — polish |
| **Effort** | S (< 1 day) · M (1–3 days) · L (> 3 days) |
| **ROI** | Impact vs Effort ratio: High / Medium / Low |

Remove duplicates. If an issue is **already tracked** as a GitHub issue (run
`gh issue list --state open --limit 100 --json title` and check for similar titles), mark it
`[tracked]` but still include it for completeness.

---

## Step 4 — Present the prioritized backlog

Output a ranked table, sorted by ROI descending (best bang-for-buck first):

```
## Garage770 — Improvement Suggestions
Scanned: <date>  |  Focus: <area or "all">

### Quick Wins 🎯  (High ROI — ship in a sprint)

| # | Category     | Finding                                         | Impact | Effort | ROI    |
|---|-------------|--------------------------------------------------|--------|--------|--------|
| 1 | Security     | POST /api/reviews has no auth                   | 🔴     | S      | High   |
| 2 | Reliability  | NewContact.jsx swallows submit errors silently   | 🟡     | S      | High   |
| 3 | Quality      | ADMIN_ID duplicated in 3 client files            | 🟡     | S      | High   |
...

### Valuable Investments 💡  (Medium ROI — plan for next cycle)

| # | Category     | Finding                                         | Impact | Effort | ROI    |
|---|-------------|--------------------------------------------------|--------|--------|--------|
| 4 | Performance  | No pagination on list endpoints                 | 🔴     | M      | Medium |
| 5 | Features     | No email notifications for appointments         | 🔴     | L      | Medium |
...

### Tracked Issues ✅  (already in GitHub — skipped)

| # | Issue | Title |
|---|-------|-------|
...

### Already tracking
(list any findings that match open GitHub issues)
```

---

## Step 5 — Recommend the next 3 actions

After the table, add a **"Start here"** block:

```
## Start here

Given the current state of the codebase, the three highest-value actions are:

1. **<title>** — <1-sentence why> → `<file:line>` · Effort: S
2. **<title>** — <1-sentence why> → `<file:line>` · Effort: S
3. **<title>** — <1-sentence why> → `<file:line>` · Effort: M

Run `/issue-pr` to implement any of these automatically.
```

---

## Constraints

- Only report findings you **actually verified** by reading code. No hypotheticals.
- If an argument is passed (e.g., `/suggest security`), limit the scan to that dimension only.
- If a finding overlaps with an already-open GitHub issue, mark it `[tracked]` — don't re-report it as new.
- When the open issue list is fetched, skip findings that are clearly already tracked.
- Keep findings specific: include file path and line number for every item.
- Respond in the same language the user used (Hebrew or English).
- Do not apply any fixes — this skill is read-only.
