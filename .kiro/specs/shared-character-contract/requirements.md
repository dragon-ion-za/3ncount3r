# Requirements Document

## Introduction

The 3ncount3r backend currently defines the character JSON *wire contract* twice: once in
`DDD.charact3r.API.ViewModels.CharacterViewModel` (the shape charact3r emits) and again in
`DDD.orch3strator.Models.CharacterService.CharacterModel` (the shape the orchestrator
deserializes that JSON into). Because these two classes are hand-maintained independently,
they drift: when one side gains a field and the other does not, the missing field silently
deserializes to `null`. This is the likely cause of the currently commented-out class/race
mapping in `DnD5eCharacterModelConverter`.

This feature extracts a single canonical wire contract, `CharacterContract`, into the shared
`DDD.Common` library and repoints both consumers at it. The change is a pure refactor of a
serialization concern: the JSON on the wire is unchanged, no MongoDB documents move, and no
API response shape changes. The only observable outcome is that the two sides can no longer
drift — a field added to the contract appears on both ends at compile time, and a rename or
removal becomes a compile error instead of a runtime `null`.

Field-level detail is defined in `docs/dnd-5e-character-sheet-rules.md` §15–§17 and the design
document (`design.md`).

## Glossary

- **Shared_Character_Contract**: The single canonical `[JsonPropertyName]`-annotated wire
  contract type `CharacterContract`, located in namespace `DDD.Common.Contracts.Character`,
  exchanged between charact3r (producer) and the orchestrator (consumer).
- **Charact3r_API**: The `DDD.charact3r.API` data API project that persists characters to
  MongoDB and emits character JSON.
- **Orchestrator**: The `DDD.orch3strator` BFF project that consumes charact3r's JSON and
  produces the enriched client-facing character shape.
- **BSON_Persistence_Model**: `DDD.charact3r.API.Models.CharacterModel`, the
  `[BsonElement]`-annotated MongoDB persistence shape. Charact3r-owned; not part of this
  refactor.
- **Character_Mapper_Profile**: The AutoMapper profile in `DDD.charact3r.API` that maps the
  BSON persistence model to and from the wire contract.
- **Character_Model_Converter**: `DnD5eCharacterModelConverter` in the orchestrator, which
  converts the deserialized contract into the enriched client view model.
- **Enriched_View_Model**: `DDD.orch3strator.ViewModels.DnD5e.CharacterViewModel`, the
  derived, client-facing character shape (flat attributes, computed HP/AC/DCs). Distinct from
  the wire contract.
- **Source_Of_Truth_Field**: A persisted input field (including `byoapiId` reference pointers)
  as opposed to a derived value that is computed at read time.
- **Derived_Value**: A value computed from source-of-truth fields (ability modifiers,
  proficiency bonus, AC, save/skill modifiers, spell save DC / attack bonus, combined caster
  level, slot maxima) — never persisted or transmitted as source of truth.

## Requirements

### Requirement 1: Canonical shared contract in DDD.Common

**User Story:** As a backend developer, I want a single canonical character wire contract in
the shared library, so that charact3r and the orchestrator cannot silently drift on the shape
they exchange.

#### Acceptance Criteria

1. THE Shared_Character_Contract SHALL be defined in namespace `DDD.Common.Contracts.Character` within the `DDD.Common` project.
2. THE Shared_Character_Contract SHALL annotate every serialized property, including all nested contract types, with a `[JsonPropertyName]` attribute whose value is the camelCase form of that property.
3. THE Shared_Character_Contract SHALL carry the complete merged field set of both previously duplicated types, consisting of exactly these top-level fields and no others: `id`, `userId`, `name`, `ruleSystem`, `size`, `race`, `classes`, `hitpoints`, `movementSpeeds`, `attributes`, `bonuses`, `proficiencies`, `spellcasting`, `languages`, `feats`, and `inventory`.
4. THE Shared_Character_Contract SHALL define on its class contract type the extended fields `subclass`, `isPrimaryClass`, `casterType`, and `hitDie`, in addition to the class fields present in the previously duplicated types.
5. THE Shared_Character_Contract SHALL define the `proficiencies` block and the `spellcasting` block as distinct nested contract types, each declaring its own nested contract types.
6. WHERE a character has no data for the `proficiencies`, `spellcasting`, or `race` block, THE Shared_Character_Contract SHALL permit that block to hold a `null` value without requiring a default or placeholder object.
7. THE Shared_Character_Contract SHALL be introduced without adding any project reference to `DDD.charact3r.API` or `DDD.orch3strator` beyond their existing references to `DDD.Common`.

### Requirement 2: charact3r emits and accepts the shared contract

**User Story:** As a backend developer, I want charact3r to map its persistence model to and
from the shared contract, so that the emitted JSON is defined by the single canonical type.

#### Acceptance Criteria

1. THE Character_Mapper_Profile SHALL map `BSON_Persistence_Model` to Shared_Character_Contract and Shared_Character_Contract to `BSON_Persistence_Model` for the character and all nested types.
2. WHEN mapping Shared_Character_Contract to `BSON_Persistence_Model` AND the source id is null or empty, THE Character_Mapper_Profile SHALL set the model `Id` to `ObjectId.Empty`.
3. WHEN mapping Shared_Character_Contract to `BSON_Persistence_Model` AND the source id is a non-empty well-formed `ObjectId` string, THE Character_Mapper_Profile SHALL set the model `Id` to `ObjectId.Parse(source.Id)`.
4. THE Charact3r_API `CharactersController` SHALL declare Shared_Character_Contract as the return type of its character actions.
5. THE Charact3r_API `CharactersController` SHALL declare Shared_Character_Contract as the POST and PUT request body parameter type for character actions.
6. WHEN the migration is complete, THE Charact3r_API SHALL NOT contain the file `ViewModels/CharacterViewModel.cs`.

### Requirement 3: Orchestrator deserializes into the shared contract at every consuming site

**User Story:** As a backend developer, I want every orchestrator site that references the old
local character model to use the shared contract, so that the consumer type matches the
producer type exactly.

#### Acceptance Criteria

1. THE Orchestrator `Services/CharacterService.cs` SHALL derive from `DataApiBaseService<CharacterContract>` and deserialize downstream responses via `ReadFromJsonAsync<CharacterContract>()`.
2. THE Orchestrator `Program.cs` SHALL register the character data service as `DataApiBaseService<CharacterContract>`.
3. THE Orchestrator `Strategies/Characters/DnD5eCharacterStrategy.cs` SHALL reference Shared_Character_Contract in its field, constructor parameter, and character collection local.
4. THE Orchestrator `Strategies/Encounters/DnD5eEncounterStrategy.cs` SHALL reference Shared_Character_Contract in its field and constructor parameter.
5. THE Orchestrator `Strategies/Parties/DnD5ePartyStrategy.cs` SHALL reference Shared_Character_Contract in its field and constructor parameter.
6. THE Orchestrator `Converters/DnD5eCharacterModelConverter.cs` SHALL declare Shared_Character_Contract as the input type of its `Convert`, `ConvertReverse`, and `Map` members.
7. WHEN the migration is complete, THE Orchestrator SHALL NOT contain the file `Models/CharacterService/CharacterModel.cs`.

### Requirement 4: Re-enable class and race mapping in the converter

**User Story:** As a DM using the client, I want a character's class and race data to appear in
the enriched response, so that the previously dropped fields are restored now that the contract
reliably carries them.

#### Acceptance Criteria

1. WHEN Character_Model_Converter converts a Shared_Character_Contract whose `classes` contains one or more entries, THE Character_Model_Converter SHALL populate the Enriched_View_Model `Classes` collection with one entry per source class, preserving each entry's name and level.
2. IF the Shared_Character_Contract `classes` is empty, THEN THE Character_Model_Converter SHALL set the Enriched_View_Model `Classes` to an empty collection.
3. WHEN Character_Model_Converter converts a Shared_Character_Contract whose `race` is present, THE Character_Model_Converter SHALL populate the Enriched_View_Model `Race` value from the source race identifier.
4. IF the Shared_Character_Contract `race` is `null`, THEN THE Character_Model_Converter SHALL set the Enriched_View_Model `Race` to `null` without raising an error.
5. WHEN Character_Model_Converter converts a Shared_Character_Contract, THE Character_Model_Converter SHALL populate the Enriched_View_Model attribute values, hitpoint maximum, and movement speed values in addition to the re-enabled `Classes` and `Race` projections.

### Requirement 5: No behavioral change to the JSON on the wire

**User Story:** As a consumer of charact3r's JSON, I want the emitted JSON shape to be
unchanged, so that the refactor is transparent to any existing consumer.

#### Acceptance Criteria

1. THE Shared_Character_Contract SHALL emit a JSON property-name set that is exactly equal (same camelCase names, no added, removed, or renamed properties) to the property-name set emitted by the pre-migration `CharacterViewModel`.
2. THE Shared_Character_Contract SHALL emit a JSON object nesting structure in which every object path (parent-to-child property containment) is exactly equal to the nesting structure emitted by the pre-migration `CharacterViewModel`, with no added or removed nesting levels.
3. WHEN a Shared_Character_Contract is serialized and then deserialized, THE serialization round-trip SHALL preserve the value of every Source_Of_Truth_Field (id, userId, name, ruleSystem, size, race, classes, hitpoints, movementSpeeds, attributes, bonuses, proficiencies, spellcasting, languages, feats, inventory), such that each field's post-round-trip value, including null and empty-collection values, is equal to its pre-round-trip value.

### Requirement 6: MongoDB persistence remains unchanged

**User Story:** As an operator, I want no database migration to be required, so that existing
stored characters remain valid without any document changes.

#### Acceptance Criteria

1. THE BSON_Persistence_Model SHALL retain every existing `[BsonElement]` field name with identical spelling and casing after the refactor.
2. THE BSON_Persistence_Model SHALL retain its existing set of persisted properties after the refactor, with no properties added, removed, renamed, or changed in BSON data type.
3. WHEN an existing MongoDB character document persisted before the refactor is deserialized into the BSON_Persistence_Model after the refactor, THE BSON_Persistence_Model SHALL deserialize every field without error and preserve all field values unchanged.
4. THE refactor SHALL NOT require any create, update, delete, or transform operation to be executed against existing MongoDB character documents.

### Requirement 7: Derivation boundary preserved

**User Story:** As a backend developer, I want the wire contract to carry only source-of-truth
data, so that derived values remain the responsibility of the enrichment layer and are never
persisted or transmitted authoritatively.

#### Acceptance Criteria

1. THE Shared_Character_Contract SHALL contain only Source_Of_Truth_Fields.
2. THE Shared_Character_Contract SHALL NOT declare any member representing a Derived_Value.
3. WHEN the Enriched_View_Model is produced at read time, THE Character_Model_Converter and derivation layer SHALL be the sole producer of every Derived_Value.
4. THE Shared_Character_Contract references (`race`, `classes`, `feats`, spell entries, inventory entries) SHALL each carry a `byoapiId` pointer rather than an embedded stat block.

### Requirement 8: Distinct enriched view model

**User Story:** As a backend developer, I want the orchestrator's enriched client-facing view
model to remain a separate type, so that the wire contract and the derived client shape do not
collapse into a same-name-different-type trap.

#### Acceptance Criteria

1. THE Enriched_View_Model SHALL remain a type distinct from the Shared_Character_Contract, with a separate name and namespace.
2. THE Enriched_View_Model SHALL NOT be merged into or replaced by the Shared_Character_Contract.
3. THE Enriched_View_Model SHALL remain the derived, client-facing shape with flat attributes and computed values that are absent from the Shared_Character_Contract.

### Requirement 9: Clean compile-time completeness after migration

**User Story:** As a backend developer, I want both projects to build with zero errors and no
lingering references to the deleted types, so that the refactor is provably complete and no
silent drift path remains.

#### Acceptance Criteria

1. WHEN the solution is built after migration, THE `DDD.charact3r.API` project SHALL complete compilation with 0 errors.
2. WHEN the solution is built after migration, THE `DDD.orch3strator` project SHALL complete compilation with 0 errors.
3. WHEN a workspace-wide search is performed after migration, THE codebase SHALL contain 0 compiling references to the type `DDD.charact3r.API.ViewModels.CharacterViewModel`, including using directives, declarations, and fully-qualified usages.
4. WHEN a workspace-wide search is performed after migration, THE codebase SHALL contain 0 compiling references to the type `DDD.orch3strator.Models.CharacterService.CharacterModel`, including using directives, declarations, and fully-qualified usages.
5. WHEN the Character_Mapper_Profile configuration is validated via AutoMapper's `AssertConfigurationIsValid`, THE AutoMapper configuration SHALL report 0 unmapped members between `BSON_Persistence_Model` and Shared_Character_Contract.
