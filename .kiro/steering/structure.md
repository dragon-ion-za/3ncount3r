# Project Structure

## Root Layout

```
/
├── apps/                   Frontend applications (Nx projects)
├── backends/               Backend APIs (Node.js and .NET)
├── data/                   SRD data files
├── deployments/            Docker and infrastructure configs
├── integrations/           External integration code
├── libs/                   Shared Nx libraries
├── tools/                  Nx workspace tooling
└── .github/workflows/      CI/CD pipelines
```

## Frontend Apps (`apps/`)

### `shell/` — Angular 16 Host
The microfrontend host application. Provides navigation, toolbar, auth, and routing.
- `src/app/` — Components, services, routing
- `src/environments/` — Environment configs
- `module-federation.config.js` — MF host config
- `webpack.config.js` / `webpack.prod.config.js` — Custom webpack

### `spa-3ncount3r/` — React 18 Remote
The main encounter management UI, loaded as a module federation remote.
- `src/app/` — Root App component
- `src/components/` — UI components organized by type:
  - `elements/` — reusable atomic components
  - `layouts/` — layout wrappers
  - `modules/` — feature modules
  - `pages/` — route-level page components
  - `modals/` — dialog/modal components
  - `icons/` — icon components
  - `dialog-handlers/` — dialog orchestration
- `src/services/` — API service layer (`*.service.ts`)
- `src/providers/` — React Context providers (state management)
- `src/hooks/` — Custom React hooks (`*.hook.ts`)
- `src/view-models/` — View model types (`*.view-model.ts`)
- `src/converters/` — Data transformation (`*.converter.ts`)
- `src/styles/` — Shared Emotion styles
- `src/remote-exports/` — Module federation entry point
- `src/environments/` — Environment configs

### `shell-e2e/` and `spa-3ncount3r-e2e/` — Cypress E2E Tests

## Backend APIs (`backends/`)

### Node.js APIs
- `api-3ncount3r/` — Encounter management API (Express, MongoDB)
- `api-cl3anslat3/` — BYOAPI providing SRD content (Express)

### .NET APIs (DDD Architecture)
- `DDD.3ncount3r.API/` — Encounter API rewrite
- `DDD.charact3r.API/` — Character management API
- `DDD.orch3strator/` — Orchestrator / BFF
- `DDD.Byoapi.Integrations/` — External API integrations
- `DDD.Common/` — Shared library

## Deployment (`deployments/`)

- `local/` — Docker Compose and config for local development
- `mine/` — Personal deployment configuration
- `reverse-proxy/` — NGINX config for CORS handling
- `db/` — Database setup/seeding

## Key Conventions

- Angular component prefix: `nctr` (e.g., `<nctr-root>`)
- File naming: kebab-case for Angular, PascalCase for React components
- Services: `*.service.ts`
- View models: `*.view-model.ts`
- Converters: `*.converter.ts`
- Hooks: `*.hook.ts`
- Each Nx project has its own `project.json` defining build targets
- Module federation manifests define remote entry points
