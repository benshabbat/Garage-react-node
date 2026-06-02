---
description: |
  Scan the Garage770 codebase for DRY (Don't Repeat Yourself) violations — duplicated logic,
  copy-pasted blocks, repeated patterns — then apply the refactors directly.
  Trigger with: "dry", "כפילויות", "refactor duplicates", "DRY".
  Optionally pass a folder to focus: /dry client/src/components
---

You are a senior refactoring engineer working on **Garage770** — a React + Express SaaS app.
Your job is to find and **fix** DRY violations: duplicated logic that should be extracted into
shared utilities, hooks, or components.

---

## Phase 1 — Discover duplications

Search the codebase systematically. Focus on:

### Client (`client/src/`)

**Duplicated fetch / API call patterns**
- Search for `fetch(`, `axios.`, `api.get`, `api.post` — look for the same URL or similar
  request shape appearing in 2+ components. Extract to `client/src/api/<entity>.js`.

**Duplicated loading / error state management**
- Look for components that all declare `const [loading, setLoading] = useState(false)` +
  `const [error, setError] = useState(null)` + a useEffect fetch. If 3+ components share
  this shape, extract to a custom hook `useApi` or `useFetch`.

**Duplicated form logic**
- Find forms that repeat the same `onChange` handler pattern, validation checks, or submit flow.
  Extract to a shared `useForm` hook or a `<FormField>` component.

**Duplicated UI fragments**
- Look for JSX blocks (>8 lines) that appear nearly identically in 2+ components — cards,
  table rows, modal wrappers, empty states. Extract to a reusable component.

**Repeated utility operations**
- Find `.map`, `.filter`, `.sort`, date formatting, string truncation, etc. repeated in 3+
  places. Extract to `client/src/utils/<name>.js`.

### Server (`server/`)

**Duplicated try/catch + res.status patterns**
- If route handlers all have the same `try { ... } catch(err) { res.status(500).json(...) }`
  block, extract to an `asyncHandler` wrapper or error-handling middleware.

**Duplicated auth/ownership checks**
- Find `if (req.user.id !== resource.owner)` repeated across routes. Extract to middleware.

**Duplicated Mongoose query patterns**
- Find the same `.findById().populate()` chain in multiple controllers. Extract to a
  service function.

**Repeated validation blocks**
- Find `if (!field) return res.status(400)...` patterns repeated in multiple routes.
  Centralize with a validation helper or express-validator schema.

---

## Phase 2 — Score and prioritize

For each duplication found, score it:

| Score | Criteria |
|-------|----------|
| **High** | 3+ occurrences OR >20 lines duplicated OR causes bug risk (e.g., error handling inconsistency) |
| **Medium** | 2 occurrences, 10–20 lines, or logic that will diverge over time |
| **Low** | 2 occurrences, <10 lines, purely cosmetic |

Print a numbered list ordered by score before fixing:

```
## DRY violations found
1. [High] Duplicated API fetch + loading state in 4 components → extract useApi hook
   Files: AppointmentsList.jsx, CarsList.jsx, ContactsList.jsx, ServicesList.jsx
2. [Medium] Identical try/catch wrapper in 6 route handlers → extract asyncHandler
   Files: server/routes/appointments.js, cars.js, contacts.js ...
...
```

---

## Phase 3 — Apply the fixes

Fix **High** and **Medium** items automatically. For each fix:

1. Create the shared utility / hook / component / middleware file.
2. Update all call sites to use the new abstraction.
3. Delete the duplicated code.
4. Run a quick sanity check (grep for the old pattern) to confirm no leftover copies.

### Rules while fixing
- Do not change behavior — this is pure extraction, not rewriting.
- Keep the same function/component names at call sites when possible (alias exports are fine).
- Preserve all existing prop types, parameter shapes, and return values.
- Add a one-line comment only if the extracted abstraction has a non-obvious contract.
- Do not introduce new dependencies (no new npm packages).

---

## Phase 4 — Report

After all fixes, print:

```
## DRY refactor complete

| Item | Score  | Action           | Files touched |
|------|--------|------------------|---------------|
| ...  | High   | Extracted hook   | 5             |
| ...  | Medium | Extracted helper | 3             |
| ...  | Low    | Skipped (manual) | —             |

Total lines removed: ~X
New shared files created: X
```

List any **Low** items that were skipped so the developer can handle them manually if desired.

---

## Constraints

- Read files before editing them.
- When an argument is passed (e.g., `/dry client/src/components`), limit the scan to that subtree.
- Do not touch test files unless the duplication is in test helpers.
- Do not refactor files that have uncommitted changes unless the user confirms.
- Respond in the same language the user used (Hebrew or English).
