# Frontend Standards (Angular Shell + React Remote + MFE)

## Microfrontend Architecture

- **Shell** (Angular 16): Host application — navigation, toolbar, auth, routing
- **Remotes** (React 18): Feature applications loaded as web components via Module Federation
- Communication between shell and remotes is URL-based routing only (no cross-framework props/events)

### Module Federation

**Shell (host):**
- `module-federation.config.js`: name `'shell'`, empty remotes array, all shared libs singleton + eager
- Remote entries loaded dynamically from `assets/module-federation.manifest.json`
- Uses `@angular-architects/module-federation-tools` `WebComponentWrapper` to render remotes

**Remote (spa-3ncount3r):**
- Exposes entry via `module-federation.config.js`: `'./spa-3ncount3r-app': './src/remote-exports/entry.remote.tsx'`
- Entry point defines a Custom Element extending `HTMLElement`
- Registers as `customElements.define('spa-3ncount3r-app', AppWebComponent)`
- Renders full React app (with all providers) inside `connectedCallback()`

---

## Angular Shell Conventions

### Module Structure
- Uses **NgModules** (not standalone components)
- Single `AppModule` with all declarations
- Component prefix: `nctr` (e.g., `selector: 'nctr-root'`)

### Routing
- Static `RouterService` class builds routes from MF manifest at startup
- Not an injectable service — uses static methods
- Remote apps rendered via `WebComponentWrapper`

### Auth
- `@auth0/auth0-angular` with `provideAuth0()` in module providers
- Observable auth state: `auth.isAuthenticated$ | async` in templates
- Config sourced from environment files

### Styling
- SCSS for component styles
- Angular Material components for UI

### File Naming
- Standard Angular kebab-case: `app.component.ts`, `router.service.ts`
- Services: `*.service.ts`

---

## React Remote (spa-3ncount3r) Conventions

### Component Hierarchy

```
components/
├── pages/         → Route-level page components (one per route)
├── modules/       → Feature-level composite components
├── elements/      → Reusable atomic/generic components
├── layouts/       → Layout wrappers
├── modals/        → Dialog/modal components
├── icons/         → SVG icon components
└── dialog-handlers/ → Dialog orchestration logic
```

### File & Folder Naming

| Type | File Pattern | Export Name |
|------|-------------|-------------|
| Component | `{name}.tsx` in `kebab-case/` folder | PascalCase `EncounterCreatureListItem` |
| Styles | `{component-name}.styles.ts` | Exported `sx` style objects |
| Service | `{entity}.service.ts` | Exported async functions |
| View Model | `{entity}.view-model.ts` | PascalCase class |
| Hook | `{hookName}.hook.ts` | `useXxxXxx` |
| Converter | `{source}To{target}.converter.ts` | Exported functions |
| Context interface | `{name}.context-interface.ts` | `IXxxContext` interface |
| Context provider | `{name}.context-provider.tsx` | `XxxContextProvider` + `useXxxContext` |

### Component Patterns

- **Functional components** with `React.FC<Props>`
- Props interfaces defined directly above the component
- Use MUI components (`Card`, `Chip`, `Grid`, `Typography`, `Stack`, etc.)
- Style via exported `sx` objects (not inline objects, not CSS modules)
- Collocate styles: `{component-name}.styles.ts` alongside component file

```tsx
// Pattern
interface MyComponentProps {
    viewModel: SomeViewModel;
    onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({viewModel, onAction}) => {
    return (<Card sx={cardStyles}>...</Card>);
}
```

### State Management

- **React Context + useState** (no Redux, no MobX)
- Each domain context lives in `providers/{context-name}/` with:
  - `{name}.context-interface.ts` — interface defining state + setters
  - `{name}.context-provider.tsx` — provider implementation + `useXxxContext()` hook
- Context provides state values and setter functions
- Default context values throw errors to catch uninitialized usage

### Service Layer

- Pure exported async functions (not classes, not hooks)
- One file per domain entity: `encounter.service.ts`, `creature.service.ts`, etc.
- Uses **axios** for HTTP
- Auth token passed as parameter and set in `Authorization: bearer` header
- Returns typed view model instances
- Environment config for `apiBaseUrl` and `activeRuleSystem`

```typescript
export async function getEncounters(accessToken: string): Promise<EncounterViewModel[]> {
    const response = await axios.get(`${BASE_URL}encounters/${RULE_SYSTEM}`, {
        headers: { 'Authorization': `bearer ${accessToken}` }
    });
    return response.data as EncounterViewModel[];
}
```

### View Models

- TypeScript **classes** with default property values (not interfaces)
- Use inheritance where appropriate: `EncounterCreatureViewModel extends CreatureViewModel`
- Properties are `camelCase` matching API JSON response shape
- Act as both type definitions and constructible objects

### Routing

- `react-router-dom` v6 with `createBrowserRouter`
- Routes defined in top-level `Router.tsx` factory function accepting `baseName`
- Page components used as route elements

### Theming & Styling

- MUI `createTheme` in `theme.tsx` with extensive component overrides
- D&D 5e aesthetic: parchment backgrounds, custom fonts, colors (`#58180D`, `#C0AD6A`)
- Custom fonts via `@font-face` in `assets/fonts.css`
- Component styles: export named `sx` object constants from `.styles.ts` files
- Compose styles with spread: `sx={{...base, ...(condition ? override : {})}}`

### App Root Structure

- `App` is a **class component** wrapping provider hierarchy
- Provider nesting (outer → inner): `ThemeProvider` → `Auth0Provider` → domain contexts → `BusyLoadingContext` → `RouterProvider`

---

## Shared Frontend Conventions

### Environment Config
Both apps use file-replacement strategy managed by webpack/nx:
- `environment.ts` (base)
- `environment.dev.ts` (local development)
- `environment.prod.ts` (production)

Contains: `apiBaseUrl`, `activeRuleSystem`, `auth.domain`, `auth.clientId`

### Auth
- Auth0 for both shell and remote
- Shell: `@auth0/auth0-angular`
- Remote: `@auth0/auth0-react`
- Both configured from their respective environment files

### Testing
- **Jest** for unit tests (`*.spec.ts` / `*.spec.tsx`)
- `jest-preset-angular` for Angular components
- `@testing-library/react` for React components
- **Cypress** for E2E tests (`shell-e2e/`, `spa-3ncount3r-e2e/`)

### Linting
- ESLint with `@nx/eslint-plugin`
- Nx module boundary enforcement enabled
- Prettier for formatting
