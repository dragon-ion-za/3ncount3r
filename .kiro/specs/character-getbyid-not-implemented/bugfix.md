# Bugfix Requirements Document

## Introduction

The orchestrator (`DDD.orch3strator`) cannot load a single character by id. The DnD5e strategy method responsible for this read path, `DnD5eCharacterStrategy.GetCharacterById(string userId, string id)`, is an unimplemented stub that throws `NotImplementedException`. The orchestrator's `CharactersController` exposes a `GetById` action that delegates to this strategy method, so any client that requests a specific character through the orchestrator (including the frontend character sheet loading a single character) receives an HTTP 500 error.

The fix must make `GetCharacterById` fetch the character from the charact3r data API by id, run it through the existing forward `Convert` (enrichment/derivation), and return the enriched `DnD5e.CharacterViewModel` as a `CharacterBaseViewModel`, consistent with how `SearchCharactersByName` returns converted results. A related secondary finding — the `GetById` route template uses a leading slash (`/id/{id}`), making it an absolute route that drops the controller's `api/[controller]/{ruleSystem}` prefix and the `{ruleSystem}` route parameter — is captured below because it affects whether the fixed strategy can even be reached with a valid rule system. The primary defect remains the `NotImplementedException`.

This bugfix is independent of the `character-convertreverse-data-loss` bugfix: that one addresses the write path (`ConvertReverse`), while this one addresses the read-by-id path. Both touch `DnD5eCharacterStrategy` but concern different behaviors.

## Bug Analysis

### Current Behavior (Defect)

When a character is requested by id through the orchestrator, the read-by-id path is not implemented and, secondarily, the route cannot receive a rule system.

1.1 WHEN a client requests a character by id through the orchestrator (invoking `DnD5eCharacterStrategy.GetCharacterById`) THEN the system throws `NotImplementedException`, surfacing as an HTTP 500 error, and never fetches or returns the character.

1.2 WHEN the frontend character sheet loads a specific character by id THEN the system fails with a 500 error instead of returning the character stat block.

1.3 WHEN the `CharactersController.GetById` action is routed THEN the system uses the route template `[HttpGet("/id/{id}")]`, whose leading slash makes it an absolute route that drops the controller-level `api/[controller]/{ruleSystem}` prefix and the `{ruleSystem}` route parameter, so `ruleSystem` cannot be supplied to select the strategy — inconsistent with the sibling `EncountersController` and `PartiesController`, which use `[HttpGet("{id}")]`.

### Expected Behavior (Correct)

The read-by-id path should fetch and enrich the character, and the route should be reachable with a rule system.

2.1 WHEN a client requests a character by id through the orchestrator THEN the system SHALL fetch the character from the charact3r data API by id via `_characterService.GetById(RuleSystem, userId, id)`, using `userId` from the authenticated caller (`User.SubjectId()`).

2.2 WHEN the character has been fetched THEN the system SHALL run it through the existing forward `DnD5eCharacterModelConverter.Convert` for enrichment/derivation and return the enriched `DnD5e.CharacterViewModel` as a `CharacterBaseViewModel`, without duplicating mapping logic, consistent with how `SearchCharactersByName` returns converted results.

2.3 WHEN the `CharactersController.GetById` action is routed THEN the system SHALL use a route template that preserves the controller-level `api/[controller]/{ruleSystem}` prefix and exposes the `{ruleSystem}` route parameter (matching the sibling `EncountersController`/`PartiesController` pattern), so the correct rule-system strategy can be selected.

### Unchanged Behavior (Regression Prevention)

The other character operations and sibling strategies must be unaffected by this fix.

3.1 WHEN a client searches characters by name (`SearchCharactersByName`) THEN the system SHALL CONTINUE TO load the list, filter by name, and return converted results via `DnD5eCharacterModelConverter.Map`.

3.2 WHEN a client saves or updates a character (`SaveCharacter` / `UpdateCharacter`) THEN the system SHALL CONTINUE TO convert, persist, and return the result exactly as before (the write path is out of scope for this fix).

3.3 WHEN other strategies fetch a character by id (e.g. `DnD5eEncounterStrategy` and `DnD5ePartyStrategy` calling `_characterService.GetById`) THEN the system SHALL CONTINUE TO behave exactly as before.

3.4 WHEN the orchestrator is built THEN the system SHALL CONTINUE TO compile with 0 errors following the C# backend standards.

## Bug Condition and Properties

### Bug Condition

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type CharacterReadRequest  // { userId, id, ruleSystem = "dnd5e" }
  OUTPUT: boolean

  // The read-by-id path is exercised (any request that reaches GetCharacterById)
  RETURN X.operation = "GetCharacterById"
END FUNCTION
```

A concrete counterexample: invoking `DnD5eCharacterStrategy.GetCharacterById(userId, id)` for any existing character id throws `NotImplementedException`.

### Property: Fix Checking

```pascal
// Property: Fix Checking - Read character by id returns enriched view model
FOR ALL X WHERE isBugCondition(X) DO
  result ← GetCharacterById'(X.userId, X.id)
  ASSERT no_exception(result)
    AND result = DnD5eCharacterModelConverter.Convert(
                   characterService.GetById(RuleSystem, X.userId, X.id))
END FOR
```

Where `GetCharacterById'` is the fixed method: it fetches the `CharacterContract` from charact3r by id and returns the forward-converted, enriched `CharacterViewModel` as a `CharacterBaseViewModel`.

### Property: Preservation Checking

```pascal
// Property: Preservation Checking - all non read-by-id behavior is unchanged
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT F(X) = F'(X)
END FOR
```

Where `F` is the original code and `F'` is the fixed code. For all operations other than the read-by-id path (search, save, update, and character-by-id fetches performed by sibling strategies), the fixed code behaves identically to the original.

**Definitions:**
- **F** — the orchestrator code before the fix (`GetCharacterById` throws `NotImplementedException`).
- **F'** — the orchestrator code after the fix (`GetCharacterById` fetches by id and returns the enriched, forward-converted view model; route template corrected to expose `ruleSystem`).
