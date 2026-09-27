# CloudShadow — Cloud Cost Intelligence

A working frontend prototype for CloudShadow: a cloud cost intelligence
platform that shows current spend, cost drivers, root-cause analysis,
service dependencies, and optimization recommendations.

Built with React + Vite + React Router + Recharts, using structured
mock data behind an API abstraction layer so the real backend can be
swapped in without touching any page or component.

## Running it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (defaults to `http://localhost:5173`).

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build
```

No environment variables or backend are required — everything runs
on mock data out of the box.

## Team / branches

| Area | Owner |
|---|---|
| Frontend | Aaditya |
| Backend | Sadaf |
| Engine | Pushpa + Manish |
| Data | Pushpa |
| Tests / Docs / Deployment | Team |

Branches: `feature/frontend`, `feature/backend`, `feature/graph`, `feature/engine`.

## Demo flow

1. Open the **Overview** dashboard — see current spend, the rising
   cost trend, and cost drivers.
2. Note **Network** as the top cost driver, and the **Root Cause**
   alert card at the bottom.
3. Click **View Analysis →** to open the **Root Cause** page and see
   the full cause → effect flow.
4. Open **Dependencies**, click on **Service A**, and see its
   dependencies/dependents and cost.
5. Open **Recommendations** and apply the top suggestion to see
   savings tracked.

## What's mocked

All data currently comes from `src/data/*.js` and is served through
`src/lib/api.js`, which simulates network latency. Nothing here talks
to a real AWS account or billing API.

## What the backend needs to expose

`src/lib/api.js` documents the intended REST surface — each function
maps to one endpoint:

- `GET /api/dashboard?period=30d` → summary, trend, drivers, root cause
- `GET /api/costs?period=30d` → summary, trend, drivers, category breakdown
- `GET /api/services` → service list
- `GET /api/services/:id` → single service detail
- `GET /api/dependencies` → nodes + edges for the dependency graph
- `GET /api/recommendations` → ranked optimization recommendations
- `GET /api/root-cause` → detailed root-cause record

Once these exist, replace the body of each function in `src/lib/api.js`
with a `fetch()` call returning the same shape — no other file needs
to change.

## Known limitations

- No authentication, real billing integration, or infrastructure
  changes — this is a frontend prototype on mock data, by design.
- The dependency graph uses a small fixed mock topology (6 nodes);
  a real graph engine would drive node positions and edges dynamically.
- "Apply" on a recommendation only updates local UI state — it doesn't
  persist or actually change any cloud configuration.
