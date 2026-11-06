# Character ConvertReverse Data Loss Bugfix Design

## Overview

The orchestrator's character write path silently loses most of the character a client submits. `DnD5eCharacterStrategy.SaveCharacter` / `UpdateCharacter` deserialize the inbound `JsonObject` into a `DnD5e.CharacterViewModel` and hand it to `DnD5eCharacterModelConverter.ConvertReverse(...)` to produce the `CharacterContract` that gets persisted through `charact3r`. `ConvertReverse` maps only `Id`, `UserId`, `Name`, `Attributes`, `Hitpoints` (max only), and `MovementSpeeds`. `Classes` and `Race` are commented out; `Size`, `Bonuses`, `Proficiencies`, `Spellcasting`, `Languages`, `Feats`, and `Inventory` are never touched. Everything else the client sends is discarded with no error raised.

The root cause is deeper than commented code. The source type of `ConvertReverse` — `DnD5e.CharacterViewModel` — does not carry most source-of-truth fields, and the fields it does carry are lossy relative to `CharacterContract`: its `CharacterClassViewModel` has only `{ Name, Level }` (no `byoapiId`, `subclass`, `isPrimaryClass`, `casterType`, `hitDie`), and `Race` is a flat `string` rather than a `RaceContract { id, byoapiId }`. So even un-commenting the class/race lines cannot fix the bug — the data literally isn't on the inbound shape.

The fix has two coordinated parts:
1. Give the write path a source shape that can actually carry every source-of-truth field a client submits.
2. Map those fields through into the `CharacterContract`, while never writing derived values (Armor Class, HP max, ability modifiers, proficiency bonus, spell save DC, combined caster level, computed slot maximums) into the contract.

This is the write-path counterpart to the read-path repair in the `shared-character-contract` spec (task 6.1 re-enabled the forward `Convert` for `Classes`/`Race`), which this fix must preserve.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug — a client submits a character carrying at least one source-of-truth field that `ConvertReverse` drops today (`Classes`, `Race`, `Size`, `Bonuses`, `Proficiencies`, `Spellcasting`, `Languages`, `Feats`, `Inventory`).
- **Property (P)**: The desired behavior — every source-of-truth field the client provides survives the `ConvertReverse` → persist → read-back round trip, and no derived value is persisted.
- **Preservation**: The already-mapped write fields (`Id`, `UserId`, `Name`, `Attributes`, `Hitpoints` max, `MovementSpeeds`) and the forward `Convert` read path must behave exactly as before.
- **ConvertReverse**: The method in `backends/DDD.orch3strator/Converters/DnD5eCharacterModelConverter.cs` that maps an inbound client view model into a `CharacterContract` for persistence. `F` = current implementation, `F'` = fixed implementation.
- **Convert**: The forward method in the same converter that projects a persisted `CharacterContract` back onto the read view model. Fixed by `shared-character-contract` task 6.1; must not regress.
- **CharacterContract**: The shared canonical wire type in `DDD.Common` (`Contracts/Character/CharacterContract.cs`). Holds source-of-truth fields and `byoapiId` references only. Its shape must not change.
- **Source-of-truth field**: A field the client authors and persists (race, classes, proficiencies chosen, spells prepared, feats, inventory, ability scores, etc.). Contrast with **derived field**: computed by the orchestrator on read (Armor Class, HP maximum, ability modifiers, proficiency bonus, spell DCs, combined caster level, slot maxima), which must never be written back per `docs/dnd-5e-character-sheet-rules.md` §15–§17.
- **byoapiId**: The external BYOAPI reference id attached to race/class/feat/spell/equipment source references in the contract.

## Bug Details

### Bug Condition

The bug manifests when a client submits a character to save or update carrying any source-of-truth field beyond the six the converter maps today. `ConvertReverse` either drops the field because the mapping is commented out (`Classes`, `Race`), or because the field is neither present on the inbound `DnD5e.CharacterViewModel` nor mapped by the converter (`Size`, `Bonuses`, `Proficiencies`, `Spellcasting`, `Languages`, `Feats`, `Inventory`). No error is surfaced, so the loss is silent.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type inbound DnD5e character save/update payload
  OUTPUT: boolean

  // The client provided at least one source-of-truth field that ConvertReverse drops today.
  RETURN hasClasses(input)
      OR hasRace(input)
      OR hasSize(input)
      OR hasBonuses(input)
      OR hasProficiencies(input)
      OR hasSpellcasting(input)
      OR hasLanguages(input)
      OR hasFeats(input)
      OR hasInventory(input)
END FUNCTION
```

### Examples

- **Multiclass with race**: Save a level-5 Fighter/Wizard with an elf race. Expected: both classes (with level/byoapiId/subclass/casterType/hitDie) and the race reference persist. Actual: `Classes` and `Race` are unset on the contract (commented out); only name, ability scores, HP max, and movement speeds persist.
- **Prepared spells**: Save a wizard with prepared spells and spell slots. Expected: `Spellcasting` (source-of-truth spell refs, preparation type, cantrips known) persists. Actual: `Spellcasting` is never mapped and is discarded; the field isn't even on the inbound view model.
- **Feats and inventory**: Save a character with two feats and a pack of equipment. Expected: `Feats` and `Inventory` (id/byoapiId/quantity/containerId) persist. Actual: both discarded silently.
- **Edge case — plain fighter, no extras**: Save a fighter with only ability scores, HP max, and movement speeds. Expected: unchanged behavior; the fix must not alter this. This input does NOT satisfy the bug condition.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- The forward `Convert` read path must continue to project `Classes` and `Race` onto the read view model as fixed by `shared-character-contract` task 6.1 (empty source `classes` → empty collection, null source `race` → null result, no error).
- `Attributes`, `Hitpoints` (maximum), and `MovementSpeeds` must continue to map into the `CharacterContract` exactly as they do today (same BSON/JSON keys: `str/dex/con/int/wis/cha`, `spd-fly/spd-walk/spd-climb/spd-swim/spd-burrow`, hitpoint entry of type `current` carrying `Maximum`).
- `SaveCharacter` continues to route through `Insert`, `UpdateCharacter` through `Update`; `UserId` continues to be set from the authenticated caller; both continue to return the character via the forward `Convert`.
- `CharacterContract` keeps its source-of-truth-only shape and stays the shared canonical type in `DDD.Common` — its structure is not altered.
- The `DDD.orch3strator` project continues to build clean with 0 errors (net8.0, `System.Text.Json`, manual converter — no AutoMapper).

**Scope:**
All inputs that do NOT carry any of the currently-dropped source-of-truth fields (i.e. `NOT isBugCondition`) should be completely unaffected by this fix. This includes:
- A character with only ability scores, HP max, and movement speeds.
- The forward read of any persisted character.
- The insert/update routing and `UserId` assignment.

**Note:** The expected correct behavior for buggy inputs is defined in Correctness Properties (Property 1). This section captures what must NOT change.

## Hypothesized Root Cause

Based on the code and the contract/view-model shapes, the data loss is a source-type gap, not merely dead code:

1. **Source-type gap (primary cause)**: The inbound `DnD5e.CharacterViewModel` does not carry `Size`, `Bonuses`, `Proficiencies`, `Spellcasting`, `Languages`, `Feats`, or `Inventory` at all, and its `Race` is a flat `string` while its `CharacterClassViewModel` is only `{ Name, Level }`. `ConvertReverse` cannot map fields that do not exist on its source. Un-commenting `Classes`/`Race` alone would still lose `byoapiId`, `subclass`, `isPrimaryClass`, `casterType`, `hitDie`, and the race `byoapiId`.

2. **Commented-out mapping**: Even for the two fields the source could partially supply (`Classes` name/level, `Race` string), the mapping lines in `ConvertReverse` are commented out, so they are unconditionally dropped.

3. **One type serving two directions**: `DnD5e.CharacterViewModel` is used for BOTH the enriched read output (carrying derived `ArmourClass`, derived-ish `HitpointMaximum`) AND the write input. Overloading a single type blurs the source-of-truth vs derived boundary and makes it easy to (a) forget write fields and (b) risk writing derived values back.

4. **No round-trip test coverage**: There is no test asserting that submitted source-of-truth fields survive `ConvertReverse` → persist → `Convert`, so the loss went unnoticed.

## Options Analysis

The core decision is: how does the write path obtain a source shape rich enough to carry every source-of-truth field?

### Option A — Extend `DnD5e.CharacterViewModel` in place

Add the missing source-of-truth blocks (`Size`, `Bonuses`, `Proficiencies`, `Spellcasting`, `Languages`, `Feats`, `Inventory`) to `DnD5e.CharacterViewModel`, enrich `CharacterClassViewModel` with `byoapiId`/`subclass`/`isPrimaryClass`/`casterType`/`hitDie`, and change `Race` to a reference shape carrying `id`/`byoapiId`. Then map every field in `ConvertReverse`.

- **Pros**: One type; no new files; the existing `viewModel.Deserialize<CharacterViewModel>()` call site is unchanged.
- **Cons**: Further overloads a single type as both input and enriched output; keeps derived fields (`ArmourClass`, `HitpointMaximum`) co-mingled with source-of-truth input; forces the read `Convert` and the write `ConvertReverse` to share a shape they increasingly disagree about; changing `Race` from `string` to an object is a breaking change to the read view model that the React remote consumes.

### Option B — Deserialize the write body directly into `CharacterContract`

Introduce a dedicated inbound write path. Since `SaveCharacter`/`UpdateCharacter` already receive a raw `JsonObject`, deserialize it directly into `CharacterContract` (the shared source-of-truth type) instead of `CharacterViewModel`, bypassing `ConvertReverse` for the 1:1 fields. `CharacterContract` already carries every source-of-truth field with the correct `byoapiId` sub-shapes.

- **Pros**: The write shape IS the source-of-truth shape — nothing to drop; no lossy intermediate; keeps the read view model (`CharacterViewModel`) clean and unchanged; naturally excludes derived values because the contract has no derived fields to write; the least code overall.
- **Cons**: Requires the client to submit the contract JSON shape on write (`attributes` as a dictionary, `movementSpeeds`/`hitpoints` as typed collections, `race`/`classes` as objects) rather than the current flat view-model shape. That is a frontend contract change (flagged below) and a larger blast radius than a purely-backend converter edit. It also splits the read shape from the write shape, which callers must understand.

### Option C (Recommended) — Dedicated inbound write model, mapped by `ConvertReverse`

Keep `ConvertReverse` as the single mapping seam, but change its source to a purpose-built write model rather than overloading the enriched read view model. Concretely: introduce `CharacterWriteViewModel` (a `DnD5e` view model) that carries exactly the source-of-truth fields a client authors — including the enriched class/race/proficiency/spellcasting/feat/inventory sub-shapes — and no derived fields. `ConvertReverse(CharacterWriteViewModel)` maps field-by-field into `CharacterContract`. `SaveCharacter`/`UpdateCharacter` deserialize into `CharacterWriteViewModel`.

- **Pros**: Restores a clean source-of-truth-only write shape without dragging derived fields (`ArmourClass`, `HitpointMaximum` computation) into the write path; keeps the read view model untouched so the forward `Convert` and the React read path are unaffected; keeps a single, testable mapping method (`ConvertReverse`) as required by the `IModelConverter` contract; avoids forcing the client onto the raw contract wire shape while still letting the write payload carry every field.
- **Cons**: Adds a new view model type and its sub-shapes; the `IModelConverter<TModel, TViewModel>` interface ties `Convert` and `ConvertReverse` to the same `TViewModel`, so a genuinely separate write type means `ConvertReverse` can no longer live on `IModelConverter<CharacterContract, CharacterViewModel>` — it needs either an added overload/method or a small dedicated write converter.

### Recommendation

**Adopt Option C, with a pragmatic minimal-correct scope.** Add `CharacterWriteViewModel` (source-of-truth only, enriched sub-shapes) and give the converter a `ConvertReverse(CharacterWriteViewModel)` mapping. Keep `HitpointMaximum` on the write model as the single authored HP value and continue writing it through a `HitpointContract` of type `current` with `Maximum` set (matching what the forward `Convert` reads), because that is authored input, not a derived value. Do NOT carry `ArmourClass` on the write model at all — it is purely derived.

Rationale: Option C is the smallest change that actually closes the source-type gap without regressing the read path or the React remote, and it keeps the derivation boundary crisp by construction (the write model has no derived fields to leak). Option A is rejected because it re-entangles derived and source-of-truth data on one type and breaks the read view model's `Race` shape. Option B is the cleanest long-term shape but shifts a contract change onto the frontend now; it remains a reasonable future direction once the React write path is reworked.

If the team prefers to avoid a new view model this iteration, the acceptable fallback is Option A restricted to: enrich `CharacterClassViewModel`, change `Race` to a reference shape, add the missing blocks, and guard `ConvertReverse` so it never emits derived values. This design proceeds on Option C.

## Correctness Properties

Property 1: Bug Condition - Source-of-truth fields survive the write round trip

_For any_ inbound character save/update payload where the bug condition holds (`isBugCondition` returns true — the client provided at least one of `Classes`, `Race`, `Size`, `Bonuses`, `Proficiencies`, `Spellcasting`, `Languages`, `Feats`, `Inventory`), the fixed write path SHALL map every provided source-of-truth field into the `CharacterContract` so that after persist and forward `Convert` read-back, each provided field is present and equal to what the client submitted, AND the produced `CharacterContract` SHALL contain no derived values (Armor Class, HP maximum computation, ability modifiers, proficiency bonus, spell save DC / attack bonus, combined caster level, computed spell-slot maximums).

**Validates: Requirements 2.1, 2.2, 2.3, 2.5, 2.6**

Property 2: Preservation - Non-buggy inputs and previously-mapped fields unchanged

_For any_ input where the bug condition does NOT hold (`isBugCondition` returns false — the client submits only the fields the converter already handled), the fixed write path SHALL produce the same `CharacterContract` as the original (`Id`, `UserId`, `Name`, `Attributes`, `Hitpoints` maximum, `MovementSpeeds` mapped identically), the forward `Convert` read path SHALL continue to project `Classes`/`Race` per `shared-character-contract` task 6.1, and `SaveCharacter`/`UpdateCharacter` SHALL continue to set `UserId` from the caller and route insert/update as before.

**Validates: Requirements 3.1, 3.2, 3.3**

Property 3: Optional-field handling - null/empty without invention

_For any_ input where an optional source-of-truth block is omitted (a non-caster with no `Spellcasting`, or an empty/absent `Feats`/`Inventory`/`Languages`/`Bonuses`), the fixed write path SHALL persist that field as null or an empty collection without raising an error and without inventing placeholder data.

**Validates: Requirements 2.4**

## Fix Implementation

### Changes Required

Assuming Option C and the root-cause analysis are correct:

**File 1**: `backends/DDD.orch3strator/ViewModels/DnD5e/CharacterWriteViewModel.cs` (new)

1. **Add `CharacterWriteViewModel`** carrying source-of-truth fields only, with `[JsonPropertyName]` camelCase keys matching the contract's field names so a client can author them:
   - `id`, `userId`, `name`, `ruleSystem` (via base or explicit)
   - `size` (`List<string>`)
   - `race` (`CharacterRaceRefWriteViewModel { id, byoapiId }`)
   - `classes` (`List<CharacterClassWriteViewModel> { id/name, level, byoapiId, subclass, isPrimaryClass, casterType, hitDie }`)
   - `hitpointMaximum` (`int` — authored input; NOT derived)
   - `movementSpeeds` OR the existing five flat speed ints (choose one shape; see mapping table — keeping the five flat ints minimizes client change)
   - `attributes` as the six flat ints (`attributeStr` … `attributeCha`) OR a dictionary; keep the flat ints to preserve the current client shape
   - `bonuses`, `proficiencies`, `spellcasting`, `languages`, `feats`, `inventory` — write sub-shapes mirroring the contract sub-contracts
   - **No `armourClass`** — derived, never authored on write.

2. **Add the nested write sub-shapes** (`CharacterClassWriteViewModel`, `CharacterRaceRefWriteViewModel`, `BonusWriteViewModel`, `ProficiencyWriteViewModel` + `SkillProficiencyWriteViewModel`, `SpellcastingWriteViewModel` + `SpellcastingClassWriteViewModel` + `SpellRefWriteViewModel` + `SlotTrackerWriteViewModel` + `PactMagicWriteViewModel`, `FeatWriteViewModel`, `EquipmentWriteViewModel`) mirroring the `CharacterContract` sub-contracts, camelCase JSON keys.

**File 2**: `backends/DDD.orch3strator/Converters/DnD5eCharacterModelConverter.cs`

3. **Add `ConvertReverse(CharacterWriteViewModel)`** (or a dedicated small write converter) mapping every source-of-truth field per the table below. Because `IModelConverter<CharacterContract, CharacterViewModel>` binds `ConvertReverse` to `CharacterViewModel`, either:
   - add a separate public method `ConvertReverse(CharacterWriteViewModel viewModel)` on the converter (simplest), or
   - introduce a dedicated write converter class.
   The existing `Convert(CharacterContract) : CharacterViewModel` and `Map` stay untouched.

4. **Keep the derivation boundary**: emit `Attributes`, `Hitpoints` (type `current`, `Maximum` from `hitpointMaximum`), and `MovementSpeeds` exactly as today. Do NOT emit any derived value. `Current` on the hitpoint entry stays at its default unless the client authored it.

5. **Handle optional blocks**: pass null/empty through unchanged — do not construct empty placeholder sub-objects when the client omitted a block (Property 3).

**File 3**: `backends/DDD.orch3strator/Strategies/Characters/DnD5eCharacterStrategy.cs`

6. **Repoint the write call sites**: in `SaveCharacter` and `UpdateCharacter`, change `viewModel.Deserialize<CharacterViewModel>()` to `viewModel.Deserialize<CharacterWriteViewModel>()` and call the new `ConvertReverse` overload. `UserId` assignment, `Insert`/`Update` routing, and the returning `Convert(model)` all stay as they are.

7. **Build clean**: `dotnet build backends/DDD.orch3strator` with 0 errors.

### ConvertReverse Mapping Table (write model → CharacterContract)

| CharacterContract field | Source on write model | Mapping | Notes |
|---|---|---|---|
| `Id` | `Id` | direct | preserved |
| `UserId` | `UserId` (overwritten by strategy) | direct | strategy sets from caller after conversion |
| `Name` | `Name` | direct | preserved |
| `RuleSystem` | `RuleSystem` | direct/strategy | keep existing behavior |
| `Size` | `Size` | direct (`IEnumerable<string>`) | null → null |
| `Race` | `Race` | `new RaceContract { Id, ByoapiId }` | null race → null contract race |
| `Classes` | `Classes` | project each → `CharacterClassContract { Id, Level, ByoapiId, Subclass, IsPrimaryClass, CasterType, HitDie }` | empty → empty, null → null |
| `Hitpoints` | `HitpointMaximum` | `[ { Type = "current", Maximum = hitpointMaximum } ]` | authored input, matches forward `Convert` read; not derived |
| `MovementSpeeds` | five speed ints | `spd-fly/spd-walk/spd-climb/spd-swim/spd-burrow` | identical to current mapping |
| `Attributes` | six attribute ints | dictionary `cha/con/dex/int/str/wis` | identical to current mapping |
| `Bonuses` | `Bonuses` | project → `BonusContract { Type, Target, Value }` | null → null |
| `Proficiencies` | `Proficiencies` | `ProficiencyContract { SavingThrows, Skills[{Skill,Expertise}], Armor, Weapons, Tools, HalfProficiencyAll, ReliableTalent }` | null → null |
| `Spellcasting` | `Spellcasting` | `SpellcastingContract { Classes[{ClassName,Ability,PreparationType,CantripsKnown,Spells[{Id,ByoapiId,Level,Prepared}]}], SpellSlots, PactMagic }` | non-caster → null; do NOT compute slot maxima |
| `Languages` | `Languages` | direct (`IEnumerable<string>`) | null/empty preserved |
| `Feats` | `Feats` | project → `FeatContract { Id, ByoapiId }` | empty → empty |
| `Inventory` | `Inventory` | project → `EquipmentContract { Id, ByoapiId, ContainerId, Quantity }` | empty → empty |
| — (Armor Class) | not on write model | NOT written | derived; excluded by construction |
| — (ability modifiers, proficiency bonus, spell DCs, combined caster level, slot maxima) | not on write model | NOT written | derived; excluded by construction |

### Null / empty optional-block handling

- **Null collection in → null out**: if the client omits `Size`/`Classes`/`Languages`/`Feats`/`Inventory`/`Bonuses`, leave the contract field null (do not fabricate an empty list) unless a downstream `charact3r` validator requires an empty collection — in which case map `null → empty` consistently and document it. Default: preserve null.
- **Empty collection in → empty out**: an explicitly empty list persists as empty; no placeholder entries added.
- **Non-caster spellcasting**: `Spellcasting == null` → contract `Spellcasting = null`. Never build an empty `SpellcastingContract`.
- **Race**: null `race` → null `RaceContract` (mirrors forward `Convert`, which maps `model.Race?.Id`).

## Testing Strategy

### Validation Approach

Two phases: first surface counterexamples on the UNFIXED converter to confirm the data loss and root cause, then verify the fixed write path preserves source-of-truth fields through the round trip and leaves non-buggy inputs unchanged.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix, and confirm the root cause is the source-type gap plus the commented mapping (not, say, a persistence-layer drop). If refuted, re-hypothesize.

**Test Plan**: Construct inbound payloads carrying each dropped field, run the current `ConvertReverse`, and assert the produced `CharacterContract` is missing those fields. Because most fields aren't even on the current `CharacterViewModel`, these tests double as evidence of the source-type gap.

**Test Cases**:
1. **Classes dropped**: submit two classes → assert `contract.Classes` is null on unfixed code (will fail once fixed / demonstrates loss now).
2. **Race dropped**: submit a race → assert `contract.Race` is null on unfixed code.
3. **Rich blocks dropped**: submit proficiencies + spellcasting + feats + inventory → assert all null on unfixed code (and note they can't even be deserialized onto the current view model).
4. **Edge — out-of-scope input**: submit only ability scores/HP/speeds → assert contract is fully populated for those (does NOT satisfy bug condition; used as the preservation baseline).

**Expected Counterexamples**:
- `contract.Classes`, `contract.Race`, `contract.Proficiencies`, `contract.Spellcasting`, `contract.Feats`, `contract.Inventory` all null after `ConvertReverse` despite being submitted.
- Causes: commented-out `Classes`/`Race` mapping; absent fields on the inbound view model for the rest.

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed write path produces a contract carrying every submitted source-of-truth field and no derived value.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  contract  := ConvertReverse_fixed(input)
  persisted := persist(contract)
  readBack  := Convert(persisted)
  ASSERT allSourceOfTruthFieldsOf(input) present and equal in readBack
  ASSERT contract has NO derived values (AC, HP-max computation, modifiers,
                                         proficiency bonus, spell DC, combined caster level, slot maxima)
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs that do NOT trigger the bug, the fixed path behaves identically to the original.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT ConvertReverse_original(input) = ConvertReverse_fixed(input)
  // Id, UserId, Name, Attributes, Hitpoints(max), MovementSpeeds unchanged
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many characters across the input domain automatically.
- It catches edge cases (zeroed speeds, extreme ability scores) manual tests miss.
- It gives strong assurance the six already-mapped fields are byte-for-byte unchanged.

**Test Plan**: Observe the UNFIXED converter's output for attributes/HP/speeds and the forward `Convert` for `Classes`/`Race`, then write property-based tests asserting the fixed converter reproduces that behavior for non-buggy inputs.

**Test Cases**:
1. **Attributes/HP/speeds preserved**: for random non-buggy characters, `ConvertReverse_fixed` equals the original on those six fields.
2. **Forward Convert preserved**: `Convert` still projects `Classes`/`Race` per task 6.1 (empty → empty, null → null).
3. **Insert/update routing preserved**: `SaveCharacter` inserts, `UpdateCharacter` updates, `UserId` set from caller, response comes from `Convert`.

### Unit Tests

- `ConvertReverse` maps each source-of-truth block into the correct contract sub-shape (class byoapiId/subclass/casterType/hitDie; race id/byoapiId; feat/equipment ids; spell refs).
- Optional-block handling: null spellcasting → null contract spellcasting; empty feats/inventory → empty/preserved; null collections not fabricated.
- Derivation boundary: assert no Armor Class or other derived field is present on the produced contract.
- Attributes/HP/movement-speed mapping unchanged from the original.

### Property-Based Tests

- Generate random characters with arbitrary combinations of the nine source-of-truth blocks; assert round-trip equality (`Convert(persist(ConvertReverse(x)))` preserves every provided field).
- Generate random non-buggy characters; assert `ConvertReverse_fixed` equals `ConvertReverse_original` on the six preserved fields (preservation).
- Generate characters with random null/empty optional blocks; assert no error and no invented placeholder data.

### Integration Tests

- Full write flow through `DnD5eCharacterStrategy.SaveCharacter` with a rich payload → persisted via `charact3r` → read back via `GetList`/`Convert`, asserting fields survive.
- `UpdateCharacter` flow with modified rich fields, asserting the update persists the changes.
- Non-caster character round trip, asserting `Spellcasting` stays null end to end.

## Downstream / Out-of-Scope Note

The React remote `spa-3ncount3r` currently sends the flat `CharacterViewModel` write shape; to actually submit the new source-of-truth blocks, its `CharacterViewModel` / character service will need matching fields (and, under Option C, the write payload shape). **That frontend work is a downstream follow-up and is explicitly NOT in scope for this C# orchestrator fix.** This design closes the backend data-loss defect so that when the client does submit the fields, they are persisted; it flags the frontend change without scoping it in.
