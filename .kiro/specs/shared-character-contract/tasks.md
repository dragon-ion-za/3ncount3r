# Implementation Plan: shared-character-contract

## Overview

This is a compiler-guided C# refactor that extracts the duplicated character wire
contract into a single canonical `CharacterContract` type in `DDD.Common`, then
repoints both `DDD.charact3r.API` (producer) and `DDD.orch3strator` (consumer) at
it. The migration is mechanical and order-sensitive: the shared type is introduced
first, each consumer is repointed, the old duplicated types are deleted last, and a
clean build of both projects is the gating verification.

Tasks follow the design's five-step Low-Level Design in a safe order. Each
implementation step ends with a build so the compiler surfaces any missed reference
before the next step proceeds. Optional test sub-tasks (marked `*`) validate the
correctness properties from the design.

## Tasks

- [x] 1. Add the shared `CharacterContract` to `DDD.Common`
  - [x] 1.1 Create `CharacterContract` and all nested contract types
    - Create `backends/DDD.Common/Contracts/Character/CharacterContract.cs` in namespace `DDD.Common.Contracts.Character`
    - Define `CharacterContract` with exactly these top-level fields: `id`, `userId`, `name`, `ruleSystem`, `size`, `race`, `classes`, `hitpoints`, `movementSpeeds`, `attributes`, `bonuses`, `proficiencies`, `spellcasting`, `languages`, `feats`, `inventory`
    - Define all nested types in the same file: `CharacterClassContract`, `RaceContract`, `HitpointContract`, `MovementSpeedContract`, `BonusContract`, `FeatContract`, `EquipmentContract`, `ProficiencyContract`, `SkillProficiencyContract`, `SpellcastingContract`, `SpellcastingClassContract`, `SpellRefContract`, `SlotTrackerContract`, `PactMagicContract`
    - Add extended class fields on `CharacterClassContract`: `subclass`, `isPrimaryClass`, `casterType`, `hitDie`
    - Annotate every serialized property with `[JsonPropertyName]` in camelCase; use `IEnumerable<T>` for collections and `Dictionary<string,int>` for `Attributes`
    - Allow `Proficiencies`, `Spellcasting`, and `Race` to be nullable (no placeholder objects); include only source-of-truth fields and `byoapiId` pointers (no derived values)
    - Field detail: design.md Data Models section and `docs/dnd-5e-character-sheet-rules.md` §15
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 7.1, 7.2, 7.4, 8.1_

  - [ ]* 1.2 Write round-trip serialization test for `CharacterContract`
    - **Property 2: Round-trip shape stability**
    - **Validates: Requirements 5.3**
    - Serialize a fully populated `CharacterContract` with `System.Text.Json`, deserialize back, assert deep equality of all source-of-truth fields including null and empty-collection values

- [x] 2. Verify `DDD.Common` builds clean
  - Run `dotnet build backends/DDD.Common/DDD.Common.csproj`
  - Confirm 0 errors and the new type is available under `DDD.Common.Contracts.Character`
  - _Requirements: 1.1, 1.7_

- [x] 3. Repoint `DDD.charact3r.API` at the shared contract
  - [x] 3.1 Update `CharacterMapperProfile` to map model ↔ contract
    - Edit `backends/DDD.charact3r.API/MapperProfiles/CharacterMapperProfile.cs`
    - Add `using DDD.Common.Contracts.Character;`
    - Change every `CreateMap<XModel, XViewModel>()` to `CreateMap<XModel, XContract>()` for the character and all nested types
    - Preserve the character reverse-map `ForMember` that sets `Id` to `ObjectId.Empty` when the source id is null/empty, else `ObjectId.Parse(source.Id)`
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.2 Update charact3r `CharactersController` to use the contract
    - Edit `backends/DDD.charact3r.API/Controllers/CharactersController.cs`
    - Add `using DDD.Common.Contracts.Character;`
    - Change character action return types and the POST/PUT request body parameter from `CharacterViewModel` to `CharacterContract`
    - Update `_mapper.Map<CharacterContract>(...)` and `_mapper.Map<CharacterModel>(contract)` calls; routes and behavior unchanged
    - _Requirements: 2.4, 2.5_

  - [x] 3.3 Delete the old charact3r view model
    - Delete `backends/DDD.charact3r.API/ViewModels/CharacterViewModel.cs`
    - _Requirements: 2.6, 9.3_

  - [ ]* 3.4 Write AutoMapper configuration validation test
    - **Property 1: No wire drift** / **Property 6: Compile-time completeness**
    - **Validates: Requirements 9.5**
    - Assert `configuration.AssertConfigurationIsValid()` for the character map set, confirming 0 unmapped members between `CharacterModel` (BSON) and `CharacterContract`

- [x] 4. Verify `DDD.charact3r.API` builds clean
  - Run `dotnet build backends/DDD.charact3r.API/DDD.charact3r.API.csproj`
  - Confirm 0 errors and that the BSON `CharacterModel` is unchanged
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 9.1_

- [x] 5. Repoint `DDD.orch3strator` at the shared contract (all six sites)
  - [x] 5.1 Update `Services/CharacterService.cs`
    - Edit `backends/DDD.orch3strator/Services/CharacterService.cs`
    - Swap `using DDD.orch3strator.Models.CharacterService;` for `using DDD.Common.Contracts.Character;`
    - Change base to `DataApiBaseService<CharacterContract>` and use `ReadFromJsonAsync<CharacterContract>()`
    - _Requirements: 3.1_

  - [x] 5.2 Update orchestrator DI registration in `Program.cs`
    - Edit `backends/DDD.orch3strator/Program.cs`
    - Register `AddScoped<DataApiBaseService<CharacterContract>, CharacterService>(...)`; add the `using` for the contract namespace
    - _Requirements: 3.2_

  - [x] 5.3 Update `DnD5eCharacterStrategy`
    - Edit `backends/DDD.orch3strator/Strategies/Characters/DnD5eCharacterStrategy.cs`
    - Repoint the field, constructor parameter, and `IEnumerable<CharacterContract>` character collection local; swap the `using`
    - _Requirements: 3.3_

  - [x] 5.4 Update `DnD5eEncounterStrategy`
    - Edit `backends/DDD.orch3strator/Strategies/Encounters/DnD5eEncounterStrategy.cs`
    - Repoint the field and constructor parameter; swap the `using`
    - _Requirements: 3.4_

  - [x] 5.5 Update `DnD5ePartyStrategy`
    - Edit `backends/DDD.orch3strator/Strategies/Parties/DnD5ePartyStrategy.cs`
    - Repoint the field and constructor parameter; swap the `using`
    - _Requirements: 3.5_

  - [x] 5.6 Update `DnD5eCharacterModelConverter` input type
    - Edit `backends/DDD.orch3strator/Converters/DnD5eCharacterModelConverter.cs`
    - Change the input type of `Convert`, `ConvertReverse`, and `Map` from `CharacterModel` to `CharacterContract`; swap the `using`
    - Keep the `DnD5e.CharacterViewModel` enriched output type distinct and unchanged
    - _Requirements: 3.6, 8.1, 8.2, 8.3_

  - [x] 5.7 Delete the old orchestrator character model
    - Delete `backends/DDD.orch3strator/Models/CharacterService/CharacterModel.cs`
    - _Requirements: 3.7, 9.4_

- [x] 6. Re-enable class and race mapping in the converter
  - [x] 6.1 Finalize `Classes` and `Race` projections in `DnD5eCharacterModelConverter.Convert`
    - Edit `backends/DDD.orch3strator/Converters/DnD5eCharacterModelConverter.cs`
    - Uncomment/finalize the `Classes` projection (one entry per source class, preserving name and level; empty source → empty collection)
    - Uncomment/finalize the `Race` projection using null-conditional access (`model.Race?.Id`) so a null race yields a null result without error
    - Keep the reverse-mapping and attribute/hitpoint/movement-speed projections working
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 6.2 Write converter re-enablement unit test
    - Given a `CharacterContract` with `Classes` and `Race` populated, assert `Convert` yields matching `Classes`/`Race` on the `DnD5e.CharacterViewModel`
    - Given a `CharacterContract` with empty `classes` and null `race`, assert empty `Classes` and null `Race` without error
    - Confirm attribute, hitpoint, and movement-speed projections are not regressed
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. Verify `DDD.orch3strator` builds clean
  - Run `dotnet build backends/DDD.orch3strator/DDD.orch3strator.csproj`
  - Confirm 0 errors and no reference to the deleted `Models.CharacterService.CharacterModel` remains
  - _Requirements: 9.2, 9.4_

- [x] 8. Final checkpoint - Full solution build and drift-free confirmation
  - Build both projects and confirm 0 errors in `DDD.charact3r.API` and `DDD.orch3strator`
  - Perform a workspace-wide search confirming 0 compiling references to `DDD.charact3r.API.ViewModels.CharacterViewModel` and `DDD.orch3strator.Models.CharacterService.CharacterModel`
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 5.1, 5.2, 9.1, 9.2, 9.3, 9.4_

## Notes

- Tasks marked with `*` are optional test tasks and can be skipped for a faster refactor.
- Build verification tasks (2, 4, 7, 8) are the primary correctness gate for this compiler-guided migration and must be run.
- Task ordering is intentional and safe: the shared type is added first, each consumer is repointed before its old type is deleted, and deletions are followed by a build so the compiler enumerates any missed site.
- The BSON persistence model (`CharacterModel` with `[BsonElement]`) and the enriched `DnD5e.CharacterViewModel` are deliberately left untouched (Requirements 6 and 8).
- Each task references specific requirement clauses for traceability.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "3.1", "3.2", "5.1", "5.2", "5.3", "5.4", "5.5", "5.6"] },
    { "id": 2, "tasks": ["3.3", "3.4", "5.7"] },
    { "id": 3, "tasks": ["6.1"] },
    { "id": 4, "tasks": ["6.2"] }
  ]
}
```
