---
description: |
  Scan Garage770 components for logic/UI mixing — useState, useEffect, handlers, or derived data
  living directly inside JSX components — and extract them into dedicated custom hooks.
  Trigger with: "separate", "split", "logic", "extract logic", "logic ui", "הפרדה", "לוגיקה".
  Optionally pass a folder or file to focus: /separate-logic client/src/pages/users
---

You are a senior React architect working on **Garage770** — a React + Express SaaS for managing auto-repair garages.
Your job is to separate logic from UI: extract business logic, state, and side-effects out of JSX components into
dedicated custom hooks, leaving components as thin wrappers that only render.

## Project context

- **State**: Zustand stores in `client/src/stores/` — `adminStore`, `userStore`, `authStore`, `uiStores`
- **Existing hook conventions** in `client/src/pages/<entity>/hooks/`:
  - `use<Entity>Handlers` — event handlers (button clicks, form submits)
  - `use<Entity>AdminHandlers` — admin-specific handlers
  - `use<Entity>Actions` — API calls (CRUD)
  - `use<Entity>Form` — form state + validation
  - `use<Entity>Modals` — modal open/close state
- **Components** live in `client/src/components/` and `client/src/pages/<entity>/components/`
- **Good separation already exists** in most pages (e.g., `Cars.jsx`, `Users.jsx`) — don't touch those
- **Do NOT touch** Zustand store files, server code, or test files

---

## Phase 1 — Discover mixing violations

Scan the target path (or `client/src/` by default) for JSX components that contain:

### Category A — State living in UI
- `useState` declared directly inside a `.jsx` component (not in a hook file)
- `useReducer` in a `.jsx` component

### Category B — Side-effects in UI
- `useEffect` declared directly inside a `.jsx` component
- `useCallback` / `useMemo` computing derived data (not memoizing handlers) in `.jsx`

### Category C — Business logic in UI
- `async` functions or `await` calls defined inside a `.jsx` component
- Inline event handlers longer than 3 lines
- Data transformation (`.map`, `.filter`, `.sort`, `.reduce`) on store/prop data, producing
  intermediate variables that are then passed to JSX — when this logic is non-trivial (>5 lines)
- Validation logic (`if (!field)`, regex tests, error accumulation) in JSX files

### Category D — Derived JSX data that belongs in a hook
- Variables like `trTh`, `trTd`, `columns`, `rows` built from store data inside the component
  body — these are data-transformation concerns, not rendering concerns, and should be
  returned from a hook

For each violation found, record:
```
File: <path>
Category: A / B / C / D
Lines: <line range>
Description: <what the logic does>
```

---

## Phase 2 — Score and prioritize

Score each violation:

| Score | Criteria |
|-------|----------|
| **High** | useState + useEffect together (full stateful logic in UI), async operations, or >20 lines of logic |
| **Medium** | A single useState OR a single useEffect OR data transformation >10 lines |
| **Low** | Inline handler <5 lines, simple derived constant, cosmetic extraction |

Print a numbered list ordered by score:

```
## Logic/UI mixing violations found

1. [High] NewLogin.jsx — useState + handleChange + onSubmit (authentication flow in UI)
   File: client/src/components/login/NewLogin.jsx, lines 10–16
2. [Medium] UsersTable.jsx — useState sortConfig + handleSortHeader + trTh/trTd construction
   File: client/src/pages/users/UsersTable.jsx, lines 24–61
...
```

---

## Phase 3 — Apply the fixes

Fix **High** and **Medium** items automatically. For each fix:

### Naming the new hook

Follow the existing convention:
- If extracting form state + submission → `use<Entity>Form` (check if one exists; extend it)
- If extracting event handlers → `use<Entity>Handlers` (check if one exists; extend it)
- If extracting table-row/column construction → `use<Entity>TableRows` in the same hooks folder
- If no entity is obvious → `use<ComponentName>Logic` next to the component file

### What to extract

Extract into the hook:
- All `useState` declarations and their setters
- All `useEffect` calls
- All `useCallback` / `useMemo` for non-trivial logic
- All async handler functions
- All data-transformation blocks that produce intermediate variables passed to JSX
- `trTh` / `trTd` / column definitions built from dynamic data

Keep in the component:
- The JSX `return` statement
- Calls to the hook (`const { ... } = useXxx()`)
- Static config arrays that never change (e.g., `const COLUMNS = [...]`) — these are fine inline
  if they contain no runtime logic

### Rules while fixing

1. Read the file before editing.
2. Create the hook file if it doesn't exist; add to it if it does.
3. The hook must import its own Zustand selectors — don't pass store slices as props.
4. Return exactly what the component needs — no over-exposure.
5. Do not change behavior — this is pure extraction, not rewriting.
6. Do not add new npm packages.
7. After extraction, run a grep to confirm no leftover logic in the component.

### Example transformation

**Before** (`NewLogin.jsx`):
```jsx
export default function NewLogin({ isOpen }) {
  const login = useAuthStore((s) => s.login);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e) => { e.preventDefault(); login(formData); };
  return ( ... );
}
```

**After** — new `useLoginForm.js`:
```js
export function useLoginForm() {
  const login = useAuthStore((s) => s.login);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e) => { e.preventDefault(); login(formData); };
  return { formData, handleChange, onSubmit };
}
```

**After** — slimmed `NewLogin.jsx`:
```jsx
export default function NewLogin({ isOpen }) {
  const { formData, handleChange, onSubmit } = useLoginForm();
  return ( ... );  // identical JSX, zero logic
}
```

---

## Phase 4 — Report

After all fixes, print:

```
## Logic/UI separation complete

| Component | Score  | Hook created / extended     | Logic lines moved |
|-----------|--------|-----------------------------|-------------------|
| ...       | High   | useLoginForm (new)          | 8                 |
| ...       | Medium | useUsersTableRows (new)     | 22                |
| ...       | Low    | Skipped (manual)            | —                 |

Total logic lines removed from components: ~X
New hook files created: X
Existing hook files extended: X
```

List any **Low** items that were skipped so the developer can handle them manually.

---

## Constraints

- Read every file before editing it.
- When an argument is passed (e.g., `/separate-logic client/src/pages/users`), limit the scan and fixes to that path.
- Do not touch files with uncommitted changes unless the user explicitly confirms.
- Do not modify `.css`, `.test.js`, store files, or server files.
- Respond in the same language the user used (Hebrew or English).
