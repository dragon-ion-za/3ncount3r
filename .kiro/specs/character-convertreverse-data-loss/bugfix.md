# Bugfix Requirements Document

## Introduction

The orchestrator's character SAVE/UPDATE path silently drops most character data. When a client saves or updates a character through `DDD.orch3strator`, `DnD5eCharacterStrategy.SaveCharacter` / `UpdateCharacter` deserialize the inbound `JsonObject` into a `DnD5e.CharacterViewModel` and call `DnD5eCharacterModelConverter.ConvertReverse(...)` to produce a `CharacterContract` for persistence via `charact3r`.

`ConvertReverse` only maps `Id`, `UserId`, `Name`, `Attributes`, `Hitpoints` (max only), and `MovementSpeeds`. It does not map `Classes` or `Race` (both commented out), and never maps `Size`, `Bonuses`, `Proficiencies`, `Spellcasting`, `Languages`, `Feats`, or `Inventory`. Any of that data submitted by the client is discarded before it reaches `charact3r` — with no error surfaced to the caller. This is a silent data-loss defect on the write path.

There is a root-cause nuance: the inbound `DnD5e.CharacterViewModel` (the source type of `ConvertReverse`) does not currently carry most source-of-truth fields. It exposes only a flat set of attributes, `HitpointMaximum`, five movement speeds, a simple `CharacterClassViewModel` (name + level), a `string Race`, and a read-only derived `ArmourClass`. `ConvertReverse` therefore cannot map fields that do not exist on its source type. The correct fix spans both (a) extending the inbound client view model to carry the source-of-truth fields the client must be able to submit, and (b) mapping those fields through in `ConvertReverse`.

This is the write-path counterpart to the read path repaired in the `shared-character-contract` spec (task 6.1 re-enabled the forward `Convert` for `Classes`/`Race`). That forward mapping must be preserved. Per `docs/dnd-5e-character-sheet-rules.md` §15–§17, `CharacterContract` carries source-of-truth fields and `byoapiId` references only; derived values (ability modifiers, proficiency bonus, Armor Class, HP maximum, spell save DC, combined caster level, computed slot maximums) live in the orchestrator and must never be written back to the contract during `ConvertReverse`.

## Bug Analysis

### Current Behavior (Defect)

When a character with rich data is saved or updated through the orchestrator, `ConvertReverse` produces a `CharacterContract` that omits most fields, so persistence in `charact3r` loses them silently.

1.1 WHEN a client submits a character to save/update with `Classes` populated THEN the system produces a `CharacterContract` with `Classes` unset (the mapping is commented out) and the class data is discarded before persistence
1.2 WHEN a client submits a character to save/update with a `Race` THEN the system produces a `CharacterContract` with `Race` unset (the mapping is commented out) and the race data is discarded before persistence
1.3 WHEN a client submits a character to save/update carrying `Size`, `Bonuses`, `Proficiencies`, `Spellcasting`, `Languages`, `Feats`, or `Inventory` THEN the system discards those fields entirely, because neither the inbound `DnD5e.CharacterViewModel` carries them nor `ConvertReverse` maps them
1.4 WHEN any of the above data is dropped THEN the system completes the save/update without raising any error or warning, so the loss is silent
1.5 WHEN a saved/updated character is read back THEN the fields listed in 1.1–1.3 are absent, because they were never persisted

### Expected Behavior (Correct)

Every source-of-truth field the client provides must survive the `ConvertReverse` → persist → read-back round trip. Derived values must not be persisted.

2.1 WHEN a client submits a character to save/update with `Classes` populated THEN the system SHALL map each class (including its source-of-truth fields such as id/byoapiId, level, subclass, isPrimaryClass, casterType, hitDie) into the `CharacterContract` so the class data is persisted
2.2 WHEN a client submits a character to save/update with a `Race` THEN the system SHALL map the race reference (id/byoapiId) into the `CharacterContract` so the race data is persisted
2.3 WHEN a client submits a character to save/update carrying `Size`, `Bonuses`, `Proficiencies`, `Spellcasting`, `Languages`, `Feats`, or `Inventory` THEN the system SHALL carry those source-of-truth fields on the inbound `DnD5e.CharacterViewModel` and map them through `ConvertReverse` into the `CharacterContract` so they are persisted
2.4 WHEN a client omits an optional field (for example a non-caster with no `Spellcasting`, or an empty `Feats`/`Inventory` collection) THEN the system SHALL persist that field as null or an empty collection without error and without inventing placeholder data
2.5 WHEN a character is saved/updated and read back THEN the system SHALL return every source-of-truth field the client submitted, unchanged, completing the round trip
2.6 WHEN `ConvertReverse` builds the `CharacterContract` THEN the system SHALL NOT write derived values (Armor Class, HP maximum, ability modifiers, proficiency bonus, spell save DC / attack bonus, combined caster level, computed spell-slot maximums) into the contract, consistent with the source-of-truth-only contract boundary in §15–§17

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a character is read through the orchestrator (the forward `Convert`) THEN the system SHALL CONTINUE TO project `Classes` and `Race` onto the `DnD5e.CharacterViewModel` as fixed by the `shared-character-contract` spec (task 6.1), with empty source `classes` yielding an empty collection and null source `race` yielding a null result without error
3.2 WHEN a character with the already-mapped fields (`Attributes`, `Hitpoints` maximum, `MovementSpeeds`) is saved/updated THEN the system SHALL CONTINUE TO map those fields into the `CharacterContract` exactly as before
3.3 WHEN a save or update completes THEN the system SHALL CONTINUE TO set `UserId` from the authenticated caller and return the character via the forward `Convert`, with `SaveCharacter` routing through insert and `UpdateCharacter` through update as before
3.4 WHEN the fix is applied THEN the `DDD.orch3strator` project SHALL CONTINUE TO build clean with 0 errors, following the C# backend standards (net8.0, `System.Text.Json`, manual converter — no AutoMapper in the orchestrator)
3.5 WHEN the contract shape or forward read path is considered THEN the system SHALL CONTINUE TO treat `CharacterContract` as the shared canonical wire type in `DDD.Common` and SHALL NOT alter its source-of-truth-only shape

## Bug Condition Analysis

**Key definitions**
- **F**: the original `ConvertReverse` — maps only Id, UserId, Name, Attributes, Hitpoints (max), MovementSpeeds; Classes/Race commented out; Size/Bonuses/Proficiencies/Spellcasting/Languages/Feats/Inventory never mapped (and not present on the source view model).
- **F'**: the fixed write path — the inbound `DnD5e.CharacterViewModel` extended to carry the source-of-truth fields, and `ConvertReverse` mapping every source-of-truth field the client provides into the `CharacterContract`, while omitting all derived values.

**Bug Condition** — identifies inbound characters that lose data:

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type inbound DnD5e character save/update payload
  OUTPUT: boolean

  // The client provided at least one source-of-truth field that ConvertReverse drops today.
  RETURN hasClasses(X)
      OR hasRace(X)
      OR hasSize(X)
      OR hasBonuses(X)
      OR hasProficiencies(X)
      OR hasSpellcasting(X)
      OR hasLanguages(X)
      OR hasFeats(X)
      OR hasInventory(X)
END FUNCTION
```

**Property: Fix Checking** — every provided source-of-truth field survives the round trip; no derived value is persisted:

```pascal
FOR ALL X WHERE isBugCondition(X) DO
  contract   ← ConvertReverse'(X)
  persisted  ← persist(contract)
  readBack   ← Convert(persisted)
  ASSERT allSourceOfTruthFieldsOf(X) are present and equal in readBack
  ASSERT contract contains NO derived values (AC, HP max, modifiers, proficiency bonus,
                                              spell save DC, combined caster level, slot maximums)
END FOR
```

**Property: Preservation Checking** — for inputs that never triggered the bug, the fixed path behaves identically to the original:

```pascal
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT F(X) = F'(X)   // Id, UserId, Name, Attributes, Hitpoints(max), MovementSpeeds unchanged
END FOR
```

**Counterexample (demonstrates the bug today)**: saving a level-5 Fighter/Wizard with a race, chosen proficiencies, prepared spells, two feats, and an inventory persists only the character's name, six ability scores, HP maximum, and five movement speeds — race, both classes, proficiencies, spellcasting, feats, and inventory are silently lost.
