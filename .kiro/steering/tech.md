# Tech Stack & Build System

## Monorepo Tooling

- **Nx 16.3.2** — workspace orchestration, task caching, module boundary enforcement
- Projects defined via `project.json` per app (not angular.json targets)

## Frontend

| App | Framework | Port | Role |
|-----|-----------|------|------|
| `shell` | Angular 16 | 4200 | Host/shell application |
| `spa-3ncount3r` | React 18 | 4201 | Remote microfrontend |

- **Module Federation** via `@angular-architects/module-federation-tools` and custom webpack configs
- **Angular Material 16** — UI for the shell
- **MUI 5** — UI for the React remote
- **Emotion** — CSS-in-JS styling for React components
- **Auth0** — `@auth0/auth0-angular` (shell), `@auth0/auth0-react` (remote)
- **RxJS 7.8** — reactive patterns in Angular shell
- **TypeScript 5.0.2**
- **Webpack** — bundler with custom configs for module federation

## Backend

| API | Runtime | Database |
|-----|---------|----------|
| `api-3ncount3r` | Node.js / Express | MongoDB |
| `api-cl3anslat3` | Node.js / Express | File-based / MongoDB |
| `DDD.3ncount3r.API` | .NET / C# | — |
| `DDD.charact3r.API` | .NET / C# | — |
| `DDD.orch3strator` | .NET / C# | — |

The .NET backends follow DDD patterns: Controllers → Services → Models/ViewModels with MapperProfiles, Validators, and Strategies.

## Testing

- **Jest** — unit tests (`jest-preset-angular` for Angular, `@testing-library/react` for React)
- **Cypress** — e2e tests (`shell-e2e`, `spa-3ncount3r-e2e`)

## Linting & Formatting

- **ESLint** with `@nx/eslint-plugin`, `@angular-eslint`, `@typescript-eslint`
- **Prettier** for code formatting
- Nx module boundary enforcement enabled

## CI/CD

- **GitHub Actions** — separate pipelines per app
- Docker images published to `ghcr.io`
- Versioning via git tags with PowerShell scripts
- Branch strategy: `feat/*` → CI, `main` → CD

## Common Commands

```bash
# Install dependencies
npm install

# Serve the shell (Angular host)
npx nx serve shell

# Serve the React remote
npx nx serve spa-3ncount3r

# Build a specific project
npx nx run <project>:build
npx nx run shell:build:production

# Run unit tests
npx nx test shell
npx nx test spa-3ncount3r

# Run e2e tests
npx nx e2e shell-e2e

# Lint
npx nx lint shell
npx nx lint spa-3ncount3r

# Run affected commands (based on git changes)
npx nx affected --target=build
npx nx affected --target=test
npx nx affected --target=lint

# Start Node.js backend (from backend directory)
cd backends/api-3ncount3r && npm start

# Local Docker environment
docker compose -f deployments/local/docker-compose.yml up
```

## Environment Config

Each app uses file replacements for environment-specific config:
- `environment.ts` — default/base
- `environment.dev.ts` — local development
- `environment.prod.ts` — production
