# C# / .NET Backend Standards

## Framework & Configuration

- Target **.NET 8.0** for all projects
- Use **minimal hosting model** (top-level `Program.cs`, no `Startup.cs`)
- Enable `ImplicitUsings`
- Use `System.Text.Json` for serialization (not Newtonsoft)
- Configuration via `IOptions<T>` pattern with config POCOs in `Configurations/`

## Project Architecture

There are two layers of backend APIs:

| Project | Role |
|---------|------|
| `DDD.3ncount3r.API` | Data CRUD API (direct MongoDB access) |
| `DDD.charact3r.API` | Data CRUD API (direct MongoDB access) |
| `DDD.orch3strator` | BFF/Orchestrator (aggregates downstream APIs, applies rule-system strategy) |
| `DDD.Byoapi.Integrations` | External API client library |
| `DDD.Common` | Shared base classes, interfaces, configs, extensions |

## Folder Structure (per API project)

```
Controllers/       → One controller per domain aggregate
Services/          → Business logic / data access
Models/            → Internal domain models (MongoDB-annotated)
ViewModels/        → External-facing DTOs (JSON-annotated)
MapperProfiles/    → AutoMapper profiles (data APIs only)
Validators/        → FluentValidation validators (data APIs only)
Configurations/    → Config POCOs for Options pattern
Strategies/        → Strategy pattern (orchestrator only)
  ├── {Domain}/    → Grouped by domain (Encounters/, Characters/, etc.)
  ├── StrategyBase.cs
  └── StrategyFactory.cs
Converters/        → Manual model↔viewmodel converters (orchestrator only)
Extensions/        → Extension methods
```

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Model | `{Entity}Model` | `EncounterModel` |
| ViewModel | `{Entity}ViewModel` | `EncounterViewModel` |
| Service | `{Entity}Service` or `{Plural}Service` | `EncountersService` |
| Controller | `{Plural}Controller` | `EncountersController` |
| Validator | `{Entity}Validator` | `EncounterValidator` |
| MapperProfile | `{Entity}MapperProfile` | `EncounterMapperProfile` |
| Strategy | `{RuleSystem}{Entity}Strategy` | `DnD5eEncounterStrategy` |
| Base Strategy | `{Entity}BaseStrategy` | `EncounterBaseStrategy` |
| Converter | `{RuleSystem}{Entity}ModelConverter` | `Dnd5eEncounterModelConverter` |
| Config | `{Feature}Config` | `MongoDbConfig` |

Namespaces use underscore prefix for numeric starts: `DDD._3ncount3r.API`

## Controller Patterns

- Route template: `[Route("api/[controller]/{ruleSystem}")]`
- Always decorate with `[ApiController]`
- Inject dependencies via constructor
- User identity via `User.SubjectId()` extension method (from `ClaimsPrincipalExtensions`)

**Data API controllers** (DDD.3ncount3r.API, DDD.charact3r.API):
```csharp
// Pattern: Validate → Map → Service → Map → Return
ValidationResult result = _validator.Validate(model);
if (!result.IsValid) throw new ValidationException(result.ToString());
string id = await _dataService.Insert(userId, ruleSystem, _mapper.Map<Model>(viewModel));
return _mapper.Map<ViewModel>(await _dataService.GetById(userId, ruleSystem, id));
```

**Orchestrator controllers**:
```csharp
// Pattern: Factory → Strategy → Execute
EncounterBaseStrategy strat = _stratFactory.Create<EncounterBaseStrategy>(ruleSystem);
return await strat.GetEncounters(User.SubjectId());
```

## Service Patterns

**Data APIs** use the template method pattern:
- Inherit from `DataService<T> : IDataService<T>` (in DDD.Common)
- Override `CollectionName`, `DoVersioning`, `CalculateModelDelta`
- Override `DoGet` / `DoGetById` for custom queries (e.g., MongoDB aggregation lookups)
- Base class handles: transactions, history tracking, lazy initialization

**Orchestrator** uses abstract HTTP service:
- Inherit from `DataApiBaseService<TModel>`
- Implement `GetList`, `GetById`, `Insert`, `Update`
- Use `HttpClient` with `ReadFromJsonAsync<T>()`

## Dependency Injection

- Register services as `Scoped`
- Use `IOptions<T>` for configuration binding
- **Keyed services** for rule-system resolution: `AddKeyedScoped<TBase, TConcrete>("ruleSystem")`
- `StrategyFactory` resolves via `IServiceProvider.GetKeyedService<T>(key)`
- AutoMapper via `AddAutoMapper(typeof(Profile))`
- FluentValidation via `AddScoped<IValidator<T>, ConcreteValidator>()`

## Model Conventions

**MongoDB Models** (data APIs):
```csharp
[BsonElement("camelCase")]     // Always camelCase BSON field names
[BsonIgnoreIfNull]             // Omit null fields from documents
[BsonIgnoreExtraElements]      // On class level for forward compatibility
```

**ViewModels** (API responses):
```csharp
[JsonPropertyName("camelCase")] // Always camelCase JSON property names
```

**Base entity**: All models inherit `BaseEntityModel` with `Id` (ObjectId), `UserId`, `RuleSystem`.

## Strategy Pattern (Orchestrator)

Hierarchy: `StrategyBase` → `{Entity}BaseStrategy` (abstract domain methods) → `{RuleSystem}{Entity}Strategy`

Strategies:
- Are responsible for orchestrating calls to downstream data APIs and BYOAPIs
- Perform model conversion and enrichment
- Are resolved by rule system key at runtime

## Converter Pattern (Orchestrator)

- Interface: `IModelConverter<TModel, TViewModel>` with `Map()`, `Convert()`, `ConvertReverse()`
- Factory: `IModelConverterFactory` resolves converters by rule system key
- No AutoMapper in the orchestrator — use manual converters

## Validation

- Use **FluentValidation** in data APIs
- One validator per ViewModel: `AbstractValidator<TViewModel>`
- Validate in the controller action before any persistence
- Throw `ValidationException(result.ToString())` on failure

## Authentication

- JWT Bearer via Auth0 (`Microsoft.AspNetCore.Authentication.JwtBearer`)
- Configure `Authority` and `Audience` from `appsettings.json`
- `app.MapControllers().RequireAuthorization()` for blanket auth (orchestrator)
- Extract user ID: `User.SubjectId()` extension method

## API Route Design

Pattern: `api/{controller}/{ruleSystem}/{userId?}/{id?}`
- `ruleSystem` is always the first route parameter
- Data APIs include `userId` in route; orchestrator derives it from JWT
- HTTP verbs: GET (list/detail), POST (create), PUT (update)

## Key Libraries

| Package | Usage |
|---------|-------|
| `MongoDB.Driver` | Data persistence |
| `AutoMapper` | Model↔ViewModel mapping (data APIs) |
| `FluentValidation` | Request validation (data APIs) |
| `Swashbuckle.AspNetCore` | Swagger/OpenAPI |
| `Microsoft.AspNetCore.Authentication.JwtBearer` | Auth |

## Notes

- `api-cl3anslat3` (Node.js) is deprecated and scheduled for C# rewrite — ignore it
- No global exception handling middleware exists yet
- CORS configured in `Program.cs` with named policies
- Swagger configured with Bearer token security definition
