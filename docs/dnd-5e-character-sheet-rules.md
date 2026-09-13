# D&D 5e Character Sheet — Domain Reference & Data Model Spec

> **Scope:** Core character sheet fields, spellcasting, and multiclass /
> spellcasting edge cases, grounded in the D&D 5e System Reference Document
> (SRD 5.1). This document defines every standard sheet field, its meaning,
> valid values, and the rules/formulas that derive computed values. It is
> intended to guide the `charact3r` module and the `DDD.charact3r.API` data
> models.
>
> **License:** Rules content is derived from the *Systems Reference Document
> 5.1* by Wizards of the Coast LLC, available under the
> [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).
> Content was rephrased for compliance with licensing restrictions.

---

## 1. Conventions

- **Field name** — the canonical `camelCase` key (matches the project's
  JSON/BSON conventions for view models and models).
- **Type** — the data type as it should appear in the API contract.
- **Derived** — `yes` means the value is computed from other fields and should
  not be stored as source-of-truth (or, if cached, must be recomputed on write).
- **Formula** — the rule used to derive a computed value.

All ability-derived numbers ultimately trace back to the six ability scores.

---

## 2. Character Identity

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Character name. Required, non-empty. |
| `playerName` | string | The controlling player. Optional (NPC/monster PCs may omit). |
| `race` | string (enum) | SRD races: Dwarf, Elf, Halfling, Human, Dragonborn, Gnome, Half-Elf, Half-Orc, Tiefling. |
| `subrace` | string (enum) | Optional. E.g. Hill Dwarf, High Elf, Lightfoot Halfling. Valid set depends on `race`. |
| `classes` | array<ClassLevel> | One or more class entries (multiclass = length > 1). See §14. |
| `background` | string | SRD background (e.g. Acolyte). Free-form if custom. |
| `alignment` | string (enum) | One of nine: LG, NG, CG, LN, N, CN, LE, NE, CE. |
| `experiencePoints` | integer ≥ 0 | Total XP earned. Drives `level` if using XP progression. |
| `level` | integer 1–20 | Total character level = sum of all `ClassLevel.level`. Derived when multiclassing. |

### ClassLevel (sub-object)

| Field | Type | Notes |
|-------|------|-------|
| `className` | string (enum) | SRD classes: Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard. |
| `level` | integer 1–20 | Levels in this class. |
| `subclass` | string | Chosen archetype/subclass. Available from the class's subclass level. |
| `hitDie` | string (enum) | `d6`, `d8`, `d10`, `d12` — fixed per class. |
| `isPrimaryClass` | boolean | `true` for the class taken at level 1. Determines starting proficiencies (see §14.3). |

---

## 3. Ability Scores

The six core scores. Standard valid range for a playable character is **1–30**
(1–20 typical for PCs; 21–30 reserved for magical enhancement / monsters).

| Field | Type | Notes |
|-------|------|-------|
| `abilities.strength` | integer 1–30 | STR |
| `abilities.dexterity` | integer 1–30 | DEX |
| `abilities.constitution` | integer 1–30 | CON |
| `abilities.intelligence` | integer 1–30 | INT |
| `abilities.wisdom` | integer 1–30 | WIS |
| `abilities.charisma` | integer 1–30 | CHA |

### Ability Modifier (derived)

For each ability:

```
modifier = floor((score - 10) / 2)
```

| Score | 1 | 2–3 | 4–5 | 6–7 | 8–9 | 10–11 | 12–13 | 14–15 | 16–17 | 18–19 | 20 |
|-------|---|-----|-----|-----|-----|-------|-------|-------|-------|-------|----|
| Mod   | -5| -4  | -3  | -2  | -1  | 0     | +1    | +2    | +3    | +4    | +5 |

---

## 4. Proficiency Bonus (derived)

Driven solely by total character `level`:

```
proficiencyBonus = ceil(level / 4) + 1
```

| Level | 1–4 | 5–8 | 9–12 | 13–16 | 17–20 |
|-------|-----|-----|------|-------|-------|
| Bonus | +2  | +3  | +4   | +5    | +6    |

> **Multiclass note:** Proficiency bonus is always based on **total** character
> level, never per-class level. A Fighter 3 / Wizard 2 has a +2 bonus (total
> level 5 → +3, in fact — level 5 crosses the tier). Always compute from the
> summed level.

---

## 5. Saving Throws

| Field | Type | Notes |
|-------|------|-------|
| `savingThrows.<ability>.proficient` | boolean | Proficiency granted by the **primary** class only (see §14.3). |
| `savingThrows.<ability>.modifier` | integer (derived) | See formula. |

### Saving Throw Modifier (derived)

```
saveModifier = abilityModifier + (proficient ? proficiencyBonus : 0)
```

---

## 6. Skills

18 SRD skills, each tied to a governing ability.

| Skill | Ability |
|-------|---------|
| Acrobatics | DEX |
| Animal Handling | WIS |
| Arcana | INT |
| Athletics | STR |
| Deception | CHA |
| History | INT |
| Insight | WIS |
| Intimidation | CHA |
| Investigation | INT |
| Medicine | WIS |
| Nature | INT |
| Perception | WIS |
| Performance | CHA |
| Persuasion | CHA |
| Religion | INT |
| Sleight of Hand | DEX |
| Stealth | DEX |
| Survival | WIS |

| Field | Type | Notes |
|-------|------|-------|
| `skills.<skill>.proficient` | boolean | Trained in this skill. |
| `skills.<skill>.expertise` | boolean | Doubles proficiency bonus (Rogue/Bard feature). |
| `skills.<skill>.modifier` | integer (derived) | See formula. |

### Skill Modifier (derived)

Base formula:

```
skillModifier = abilityModifier
              + (proficient ? proficiencyBonus : 0)
              + (expertise  ? proficiencyBonus : 0)
```

### Half-Proficiency: Jack of All Trades (feature)

Bards with Jack of All Trades add half their proficiency bonus (rounded down)
to any ability check that does not already include proficiency:

```
if (jackOfAllTrades && !proficient)
    skillModifier += floor(proficiencyBonus / 2)
```

- Applies only to checks the character is **not** already proficient in.
- Does **not** stack with expertise (expertise implies proficiency).
- Modeled as a character-level flag `features.jackOfAllTrades: boolean` that the
  skill-modifier calculation reads.

### Reliable Talent (feature)

Rogues with Reliable Talent treat any d20 roll of 9 or lower as a 10 for skills
they are proficient in. This is a **roll-time** rule, not a stored modifier —
model it as a flag (`features.reliableTalent: boolean`) consumed by the dice /
check-resolution layer, not the sheet's derived values.

### Passive Perception (derived)

```
passivePerception = 10 + Perception skill modifier
```

---

## 7. Combat Statistics

| Field | Type | Derived | Notes |
|-------|------|---------|-------|
| `armorClass` | integer | yes* | See §7.1 — depends on armor worn and unarmored-defense features. |
| `initiative` | integer | yes | = DEX modifier (+ bonuses). |
| `speed` | integer ≥ 0 | no | Base walking speed in feet, from race. |
| `hitPoints.max` | integer ≥ 1 | yes* | See §7.2. |
| `hitPoints.current` | integer | no | Clamped to [−max, max]; 0 = unconscious/dying. |
| `hitPoints.temporary` | integer ≥ 0 | no | Absorbed before current HP; not stacked. |
| `hitDice.total` | map<die,count> | yes | One die per class level, keyed by die type. See §14.2. |
| `hitDice.remaining` | map<die,count> | no | Available to spend on a short rest. |

### 7.1 Armor Class

AC is best modeled as a **calculation strategy** because features supply
mutually exclusive base formulas. Compute the highest applicable base, then add
situational bonuses.

**Base formulas (pick the one that applies):**

| Source | Formula | Notes |
|--------|---------|-------|
| Unarmored (default) | `10 + DEX mod` | When no armor is worn and no unarmored-defense feature applies. |
| Light armor | `armorBase + DEX mod` | Full DEX. |
| Medium armor | `armorBase + min(DEX mod, 2)` | DEX capped at +2. |
| Heavy armor | `armorBase` | DEX ignored. |
| Barbarian Unarmored Defense | `10 + DEX mod + CON mod` | Only while not wearing armor; a shield is allowed. |
| Monk Unarmored Defense | `10 + DEX mod + WIS mod` | Only while not wearing armor and not wielding a shield. |

**Situational bonuses (added to the chosen base):**

- **Shield:** `+2` while equipped (Monk Unarmored Defense excludes shields).
- Feature/spell/magic-item bonuses as applicable.

> **Modeling:** store the equipped armor and the set of active unarmored-defense
> features; the AC strategy selects the highest-yielding valid base and applies
> bonuses. Never store `armorClass` as source of truth.

### 7.2 Hit Points (max)

```
level 1 HP        = max hit die value + CON modifier      (first class only)
each level after  = (average or rolled hit die) + CON modifier
maxHP             = sum across all levels + flat HP bonuses
```

- Per-level hit die "average" is `(dieSize / 2) + 1` when not rolling.
- **First-level max HP** applies only to the very first character level (the
  primary class), not to the first level gained in each multiclass.
- **Flat HP bonuses** (e.g. the Tough feat adds `+2 × total level`, the
  Dwarven Toughness trait adds `+1 × total level`) are summed in after the
  per-level calculation. Model as `hitPoints.flatBonusPerLevel: integer`.
- Track a per-level `hpChoice` (rolled value or "average") so max HP is
  reproducible: `hitPoints.rolls: array<{ level, die, value }>`.

---

## 8. Attacks & Actions

`attacks` is an array of attack entries.

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Weapon/attack name. |
| `attackBonus` | integer (derived) | See formula. |
| `damageDice` | string | e.g. `1d8`. |
| `damageType` | string (enum) | slashing, piercing, bludgeoning, fire, cold, etc. |
| `range` | string | Melee reach or ranged distance (normal/long). |
| `properties` | array<string> | finesse, light, heavy, versatile, thrown, etc. |

### Attack Bonus (derived)

```
attackBonus = abilityModifier + (proficient ? proficiencyBonus : 0)
```

- Ability used: STR for melee, DEX for ranged; **finesse** weapons use the
  higher of STR/DEX.
- Damage bonus normally equals the same `abilityModifier` (not proficiency).

---

## 9. Equipment & Currency

| Field | Type | Notes |
|-------|------|-------|
| `equipment` | array<ItemStack> | Carried/owned items. |
| `currency.cp` | integer ≥ 0 | Copper pieces. |
| `currency.sp` | integer ≥ 0 | Silver pieces. |
| `currency.ep` | integer ≥ 0 | Electrum pieces. |
| `currency.gp` | integer ≥ 0 | Gold pieces. |
| `currency.pp` | integer ≥ 0 | Platinum pieces. |

### ItemStack (sub-object)

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Item name. |
| `quantity` | integer ≥ 1 | Count. |
| `weight` | number ≥ 0 | Per-item weight in pounds. |
| `equipped` | boolean | Whether currently worn/wielded. |

Conversion baseline: 10 cp = 1 sp, 5 sp = 1 ep, 2 ep = 1 gp, 10 gp = 1 pp.

---

## 10. Features & Traits

| Field | Type | Notes |
|-------|------|-------|
| `features` | array<Feature> | Class features, racial traits, feats, background features. |
| `proficiencies.armor` | array<string> | Armor categories. |
| `proficiencies.weapons` | array<string> | Weapon categories/specific weapons. |
| `proficiencies.tools` | array<string> | Tool proficiencies. |
| `proficiencies.languages` | array<string> | Known languages. |

### Feature (sub-object)

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Feature name. |
| `source` | string | class / race / background / feat. |
| `description` | string | Rules text. |
| `uses` | UseTracker (optional) | For limited-use features. |

---

## 11. Spellcasting

Spellcasting is modeled as an optional top-level `spellcasting` block that
holds **one entry per spellcasting class** plus shared/derived slot pools. A
single-class caster simply has one entry. Present the block only for characters
with at least one spellcasting class.

```
spellcasting: {
  classes:       array<SpellcastingClass>   // one per casting class
  spellSlots:    map<level, SlotTracker>     // shared multiclass pool (see §14.4)
  pactMagic:     PactMagic (optional)        // Warlock only (see §14.5)
}
```

### 11.1 SpellcastingClass (sub-object)

| Field | Type | Derived | Notes |
|-------|------|---------|-------|
| `className` | string (enum) | no | The casting class this entry belongs to. |
| `ability` | string (enum) | no | INT (Wizard/Eldritch Knight/Arcane Trickster), WIS (Cleric/Druid/Ranger), CHA (Bard/Sorcerer/Warlock/Paladin). |
| `casterType` | string (enum) | no | `full`, `half`, `third`, or `pact`. Drives combined caster level (§14.4). |
| `spellSaveDC` | integer | yes | Per-class; see formula. |
| `spellAttackBonus` | integer | yes | Per-class; see formula. |
| `preparationType` | string (enum) | no | `prepared` (Cleric/Druid/Paladin/Wizard) or `known` (Bard/Ranger/Sorcerer/Warlock). |
| `cantripsKnown` | integer ≥ 0 | no | Number of cantrips for this class. |
| `spells` | array<Spell> | no | Spells known/prepared for this class. |

### Spell Save DC (derived, per class)

```
spellSaveDC = 8 + proficiencyBonus + <this class's ability modifier>
```

### Spell Attack Bonus (derived, per class)

```
spellAttackBonus = proficiencyBonus + <this class's ability modifier>
```

> Each casting class computes its own DC and attack bonus from **its own**
> ability. `proficiencyBonus` is shared (total-level based).

### 11.2 SlotTracker / UseTracker (sub-object)

| Field | Type | Notes |
|-------|------|-------|
| `max` | integer ≥ 0 | Total slots/uses available at the current level. |
| `used` | integer ≥ 0 | Consumed since the last relevant rest. Must be ≤ `max`. |

### 11.3 Spell (sub-object)

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Spell name. |
| `level` | integer 0–9 | 0 = cantrip. |
| `school` | string (enum) | Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, Transmutation. |
| `castingTime` | string | e.g. "1 action". |
| `range` | string | e.g. "60 feet". |
| `components` | array<string> | V, S, M (with material notes). |
| `duration` | string | e.g. "Concentration, up to 1 minute". |
| `prepared` | boolean | For prepared casters. |

---

## 12. Derived-Value Summary

These fields must never be stored as authoritative source of truth. Recompute
on write (or on read) to keep the sheet internally consistent:

| Value | Depends on |
|-------|-----------|
| Ability modifiers | ability scores |
| Proficiency bonus | **total** level |
| Saving throw modifiers | ability mod, proficiency bonus, proficiency flags (primary class) |
| Skill modifiers | ability mod, proficiency bonus, proficiency/expertise/half-proficiency flags |
| Passive Perception | Perception skill modifier |
| Initiative | DEX modifier |
| Armor Class | DEX/CON/WIS mods, armor, shield, unarmored-defense features |
| Max HP | class hit dice, per-level HP choices, total level, CON modifier, flat bonuses |
| Attack bonuses | ability mod, proficiency bonus |
| Per-class spell save DC | proficiency bonus, that class's ability mod |
| Per-class spell attack bonus | proficiency bonus, that class's ability mod |
| Combined caster level | per-class levels weighted by caster type (§14.4) |
| Multiclass spell slots | combined caster level → multiclass slot table |
| Pact Magic slots | Warlock level (independent of the multiclass pool) |

---

## 13. Validation Notes

- Every ability score in `1..30`; typical PC creation caps at 20.
- `level` (total) in `1..20`; equals the sum of all `ClassLevel.level`.
- `hitPoints.current` ≤ `hitPoints.max`; `temporary` ≥ 0 and not additive.
- Slot/use trackers: `used` ≤ `max`.
- A `spellcasting` block should be absent for non-casting characters rather
  than present-and-empty.
- `skills.<skill>.expertise` implies `proficient == true`.
- Half-proficiency (Jack of All Trades) applies only where `proficient == false`.
- Exactly one `ClassLevel` has `isPrimaryClass == true`.
- Saving throw proficiencies derive only from the primary class (§14.3).
- Each `spellcasting.classes[]` entry maps to an existing `classes[]` entry with
  a spellcasting capability.

---

## 14. Multiclassing & Spellcasting Edge Cases

This section captures the rules that differ once a character has more than one
class. It is the authoritative reference for the derivation strategies above.

### 14.1 Multiclass Prerequisites

To take a level in a class (either the first class or a new one via
multiclassing) the character must meet the minimum ability-score prerequisites:

| Class | Minimum Ability |
|-------|-----------------|
| Barbarian | STR 13 |
| Bard | CHA 13 |
| Cleric | WIS 13 |
| Druid | WIS 13 |
| Fighter | STR 13 **or** DEX 13 |
| Monk | DEX 13 **and** WIS 13 |
| Paladin | STR 13 **and** CHA 13 |
| Ranger | DEX 13 **and** WIS 13 |
| Rogue | DEX 13 |
| Sorcerer | CHA 13 |
| Warlock | CHA 13 |
| Wizard | INT 13 |

- Model as a validation rule keyed by `className`; enforce when adding a
  `ClassLevel`. Some classes require prerequisites in **both** the class you are
  leaving and the class you are entering.

### 14.2 Hit Dice on Multiclass

- Add one hit die per class level, of that class's die type. A Fighter 5 /
  Wizard 3 has `5 × d10` and `3 × d6` in `hitDice.total`.
- Short rests can spend any available hit dice regardless of class.

### 14.3 Proficiencies on Multiclass

- **Saving throws:** you gain saving-throw proficiencies from your **primary
  class only**. Multiclassing never grants new save proficiencies.
- **Skills / armor / weapons / tools:** multiclassing grants a **reduced**
  subset of the new class's proficiencies (not the full level-1 list). Model
  which proficiencies came from the primary class vs. a multiclass entry so the
  reduced set can be validated.

### 14.4 Multiclass Spellcasting — Combined Caster Level & Shared Slots

Spell **slots** (everything except Warlock Pact Magic) come from one shared pool
sized by a **combined caster level**, not by summing each class's own slots.

Compute the combined caster level by weighting each spellcasting class:

```
combinedCasterLevel =
    sum(fullCasterLevels)                       // Bard, Cleric, Druid, Sorcerer, Wizard
  + floor(halfCasterLevels / 2)                 // Paladin, Ranger
  + floor(thirdCasterLevels / 3)                // Eldritch Knight, Arcane Trickster
```

- **Full casters** contribute their full class level.
- **Half casters** (Paladin, Ranger) contribute `floor(level / 2)`.
- **Third casters** (Fighter → Eldritch Knight, Rogue → Arcane Trickster)
  contribute `floor(level / 3)`.
- Look the combined caster level up on the **multiclass spellcaster slot table**
  (the standard full-caster slot progression) to get `spellSlots` by level.
- **Spells known/prepared remain per class** — a Wizard 3 / Cleric 3 prepares
  Wizard spells using INT and Cleric spells using WIS, but casts both from the
  shared slot pool. Slot **level** available can exceed the highest spell a
  given class knows.
- Each class's max spell level it can *prepare/know* is based on **its own**
  class level, even though the shared pool may offer higher-level slots.

**Caster-type reference:**

| Class / Subclass | Caster Type |
|------------------|-------------|
| Bard, Cleric, Druid, Sorcerer, Wizard | full |
| Paladin, Ranger | half |
| Fighter (Eldritch Knight), Rogue (Arcane Trickster) | third |
| Warlock | pact (separate — see §14.5) |

### 14.5 Warlock Pact Magic (Separate Pool)

Warlock spellcasting does **not** merge into the multiclass slot pool. It is a
distinct system:

```
pactMagic: {
  slotLevel:  integer 1–5      // all pact slots are this single level
  slots:      SlotTracker       // max/used; recharges on a SHORT rest
  spellsKnown: array<Spell>
  ability:    "CHA"
}
```

- All Pact Magic slots are the **same** level and recharge on a **short or long
  rest** (unlike normal slots, which recharge on a long rest).
- A Warlock/Sorcerer therefore tracks **two independent slot systems**: the
  shared multiclass pool (from the Sorcerer side) and the Pact Magic pool.
- Pact slots may be used to cast spells known from either system per the
  optional interaction rules, but are tracked separately for recharge purposes.

### 14.6 Feats vs. Ability Score Improvements

- At the ASI levels for each class, a character may take an Ability Score
  Improvement **or** a feat. Model the choice per ASI opportunity.
- Feats can grant derived-value inputs (e.g. Tough → HP, Resilient → a new save
  proficiency, Observant → passive-score bonus). Represent feats as `Feature`
  entries with structured effects the derivation layer can read, rather than
  free text alone.

### 14.7 Encumbrance (Variant Rule — optional)

If the encumbrance variant is enabled:

```
carryingCapacity = STR score × 15   (pounds)
encumbered           when carried weight > STR × 5
heavily encumbered   when carried weight > STR × 10
```

- Encumbrance status is derived from summed `equipment[].weight × quantity`
  against the STR-based thresholds. Model as an optional derived flag; disabled
  by default.

---

*Source: Systems Reference Document 5.1, Wizards of the Coast LLC,
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode).
Content was rephrased for compliance with licensing restrictions.*


---

## 15. Data Model Mapping (charact3r API)

This section maps the rules above onto the `DDD.charact3r.API` data models and
the React view models. It **extends** the existing `CharacterModel` /
`CharacterViewModel` rather than replacing them, preserving two established
conventions:

1. **BYOAPI-referential:** race, classes, feats, spells, and inventory are
   stored as `{ id, byoapiId }` references. The actual stat blocks live in the
   BYOAPI (cl3anslat3), not on the character document.
2. **Source-of-truth only:** the data API stores inputs. All derived values
   (ability modifiers, proficiency bonus, AC, save/skill modifiers, spell save
   DC / attack bonus, combined caster level, slot counts) are computed in the
   **orchestrator strategy layer** (`DnD5eCharacterStrategy`), never persisted.

### 15.1 Existing shape (unchanged)

`CharacterModel : BaseEntityModel` already provides: `Name`, `Size`, `Race`,
`Classes`, `Hitpoints`, `MovementSpeeds`, `Attributes` (`Dictionary<string,int>`),
`Bonuses`, `Languages`, `Feats`, `Inventory`. The generic `Bonuses` collection
(`type` / `target` / `value`) is the extension point for feature- and
item-supplied modifiers (e.g. unarmored defense, Tough HP, magic-item bonuses).

### 15.2 Additive C# extensions (MongoDB models)

```csharp
// --- New members on CharacterModel ---

[BsonElement("proficiencies"), BsonIgnoreIfNull]
public ProficiencyModel Proficiencies { get; set; }

[BsonElement("spellcasting"), BsonIgnoreIfNull]
public SpellcastingModel Spellcasting { get; set; }   // null for non-casters

// --- Extend the existing CharacterClassModel ---
public class CharacterClassModel
{
  [BsonElement("id"), BsonIgnoreIfNull]            public string Id { get; set; }
  [BsonElement("byoapiId"), BsonIgnoreIfNull]      public string ByoapiId { get; set; }
  [BsonElement("level"), BsonIgnoreIfNull]         public int Level { get; set; }
  [BsonElement("subclass"), BsonIgnoreIfNull]      public string Subclass { get; set; }
  [BsonElement("isPrimaryClass")]                  public bool IsPrimaryClass { get; set; }
  // casterType drives combined-caster-level math: full | half | third | pact | none
  [BsonElement("casterType"), BsonIgnoreIfNull]    public string CasterType { get; set; }
  [BsonElement("hitDie"), BsonIgnoreIfNull]        public string HitDie { get; set; } // d6..d12
}

// --- Proficiencies (source of truth; modifiers are derived) ---
public class ProficiencyModel
{
  // ability keys: str/dex/con/int/wis/cha — from the PRIMARY class only
  [BsonElement("savingThrows"), BsonIgnoreIfNull]  public string[] SavingThrows { get; set; }
  [BsonElement("skills"), BsonIgnoreIfNull]        public SkillProficiencyModel[] Skills { get; set; }
  [BsonElement("armor"), BsonIgnoreIfNull]         public string[] Armor { get; set; }
  [BsonElement("weapons"), BsonIgnoreIfNull]       public string[] Weapons { get; set; }
  [BsonElement("tools"), BsonIgnoreIfNull]         public string[] Tools { get; set; }
  // roll-time flags (Jack of All Trades, Reliable Talent)
  [BsonElement("halfProficiencyAll")]              public bool HalfProficiencyAll { get; set; }
  [BsonElement("reliableTalent")]                  public bool ReliableTalent { get; set; }
}

public class SkillProficiencyModel
{
  [BsonElement("skill"), BsonIgnoreIfNull]         public string Skill { get; set; }
  [BsonElement("expertise")]                       public bool Expertise { get; set; }
}

// --- Spellcasting: per-class entries + shared slot pool + separate pact magic ---
public class SpellcastingModel
{
  [BsonElement("classes"), BsonIgnoreIfNull]       public SpellcastingClassModel[] Classes { get; set; }
  // shared multiclass slot pool keyed by spell level "1".."9"
  [BsonElement("spellSlots"), BsonIgnoreIfNull]    public Dictionary<string, SlotTrackerModel> SpellSlots { get; set; }
  [BsonElement("pactMagic"), BsonIgnoreIfNull]     public PactMagicModel PactMagic { get; set; } // Warlock only
}

public class SpellcastingClassModel
{
  [BsonElement("className"), BsonIgnoreIfNull]        public string ClassName { get; set; }
  [BsonElement("ability"), BsonIgnoreIfNull]         public string Ability { get; set; }   // int/wis/cha
  [BsonElement("preparationType"), BsonIgnoreIfNull] public string PreparationType { get; set; } // prepared|known
  [BsonElement("cantripsKnown")]                     public int CantripsKnown { get; set; }
  [BsonElement("spells"), BsonIgnoreIfNull]          public SpellRefModel[] Spells { get; set; }
}

public class SpellRefModel
{
  [BsonElement("id"), BsonIgnoreIfNull]            public string Id { get; set; }
  [BsonElement("byoapiId"), BsonIgnoreIfNull]      public string ByoapiId { get; set; }
  [BsonElement("level")]                           public int Level { get; set; }        // 0 = cantrip
  [BsonElement("prepared")]                        public bool Prepared { get; set; }
}

public class SlotTrackerModel
{
  [BsonElement("max")]                             public int Max { get; set; }
  [BsonElement("used")]                            public int Used { get; set; }
}

public class PactMagicModel
{
  [BsonElement("slotLevel")]                       public int SlotLevel { get; set; }    // 1..5
  [BsonElement("slots"), BsonIgnoreIfNull]         public SlotTrackerModel Slots { get; set; }
  [BsonElement("spells"), BsonIgnoreIfNull]        public SpellRefModel[] Spells { get; set; }
}
```

### 15.3 Matching C# view models (JSON DTOs)

Mirror the models with `[JsonPropertyName("camelCase")]`, following the existing
`CharacterViewModel.cs` style. Names and shapes are identical; only the
attribute changes (`[BsonElement]` → `[JsonPropertyName]`). AutoMapper profiles
in `MapperProfiles/` map each model ↔ view model pair.

```csharp
public class ProficiencyViewModel
{
  [JsonPropertyName("savingThrows")]      public IEnumerable<string> SavingThrows { get; set; }
  [JsonPropertyName("skills")]            public IEnumerable<SkillProficiencyViewModel> Skills { get; set; }
  [JsonPropertyName("armor")]             public IEnumerable<string> Armor { get; set; }
  [JsonPropertyName("weapons")]           public IEnumerable<string> Weapons { get; set; }
  [JsonPropertyName("tools")]             public IEnumerable<string> Tools { get; set; }
  [JsonPropertyName("halfProficiencyAll")] public bool HalfProficiencyAll { get; set; }
  [JsonPropertyName("reliableTalent")]    public bool ReliableTalent { get; set; }
}

public class SpellcastingViewModel
{
  [JsonPropertyName("classes")]    public IEnumerable<SpellcastingClassViewModel> Classes { get; set; }
  [JsonPropertyName("spellSlots")] public Dictionary<string, SlotTrackerViewModel> SpellSlots { get; set; }
  [JsonPropertyName("pactMagic")]  public PactMagicViewModel PactMagic { get; set; }
}
// SpellcastingClassViewModel, SpellRefViewModel, SlotTrackerViewModel,
// PactMagicViewModel, SkillProficiencyViewModel follow the same 1:1 pattern.
```

### 15.4 Matching TypeScript view models (React remote)

Following the `spa-3ncount3r` convention — TypeScript **classes** with default
property values, `camelCase` matching the JSON shape. These extend the existing
`character.view-model.ts`:

```typescript
export class SkillProficiencyViewModel {
    skill: string = '';
    expertise: boolean = false;
}

export class ProficiencyViewModel {
    savingThrows: string[] = [];
    skills: SkillProficiencyViewModel[] = [];
    armor: string[] = [];
    weapons: string[] = [];
    tools: string[] = [];
    halfProficiencyAll: boolean = false;   // Jack of All Trades
    reliableTalent: boolean = false;
}

export class SlotTrackerViewModel {
    max: number = 0;
    used: number = 0;
}

export class SpellRefViewModel {
    id: string = '';
    byoapiId: string = '';
    level: number = 0;      // 0 = cantrip
    prepared: boolean = false;
}

export class SpellcastingClassViewModel {
    className: string = '';
    ability: string = '';           // 'int' | 'wis' | 'cha'
    preparationType: string = '';   // 'prepared' | 'known'
    cantripsKnown: number = 0;
    spells: SpellRefViewModel[] = [];
}

export class PactMagicViewModel {
    slotLevel: number = 0;          // 1..5
    slots: SlotTrackerViewModel = new SlotTrackerViewModel();
    spells: SpellRefViewModel[] = [];
}

export class SpellcastingViewModel {
    classes: SpellcastingClassViewModel[] = [];
    // shared multiclass slot pool keyed by spell level '1'..'9'
    spellSlots: { [level: string]: SlotTrackerViewModel } = {};
    pactMagic: PactMagicViewModel | null = null;   // Warlock only
}

// Extend CharacterClassViewModel with: subclass, isPrimaryClass, casterType, hitDie.
// Extend CharacterViewModel with: proficiencies: ProficiencyViewModel,
//                                  spellcasting: SpellcastingViewModel | null.
```

### 15.5 Derived-value responsibilities (orchestrator)

The data API persists only the fields above. `DnD5eCharacterStrategy` in
`DDD.orch3strator` enriches the character on read with the derived values from
§12, using the caster-type weighting (§14.4) for slots and per-class abilities
(§11.1) for spell DCs. AC is produced by a dedicated AC-calculation routine that
reads equipped armor, the `bonuses` collection, and unarmored-defense features.

### 15.6 Field-to-model traceability

| Rules-doc field | Storage location | Derived? |
|-----------------|------------------|----------|
| Ability scores | `Attributes` dict | source |
| Class / level / subclass / primary / hitDie / casterType | `Classes[]` | source |
| Save & skill proficiencies, expertise | `Proficiencies` | source |
| Jack of All Trades / Reliable Talent | `Proficiencies` flags | source |
| Hit points (max/current/temp) | `Hitpoints[]` | max is derived; current/temp are source |
| Movement speeds | `MovementSpeeds[]` | source |
| Feature/item modifiers | `Bonuses[]` | source |
| Feats | `Feats[]` (byoapi ref) | source |
| Inventory / equipment | `Inventory[]` (byoapi ref) | source |
| Per-class spell ability & known spells | `Spellcasting.Classes[]` | source |
| Multiclass spell slots | `Spellcasting.SpellSlots` | max derived; used is source |
| Pact Magic | `Spellcasting.PactMagic` | max derived; used is source |
| Ability modifiers, proficiency bonus | — | derived (orchestrator) |
| Save/skill modifiers, passive Perception | — | derived (orchestrator) |
| Armor Class, initiative | — | derived (orchestrator) |
| Spell save DC / attack bonus (per class) | — | derived (orchestrator) |
| Combined caster level | — | derived (orchestrator) |


---

## 16. Orchestrator Derivation Sketch

All derived values live in the orchestrator (`DDD.orch3strator`), not the data
API. The data API persists the source-of-truth fields from §15; the orchestrator
computes the rest when converting a persisted character into the outward-facing
view model.

### 16.1 Where it plugs in

The orchestrator already has:

- `Strategies/Characters/DnD5eCharacterStrategy.cs` — resolves calls per rule
  system and calls the converter.
- `Converters/DnD5eCharacterModelConverter.cs` — maps the persisted
  `CharacterModel` to the orchestrator's outward `CharacterViewModel`.

Derivation should be a **pure, stateless helper** invoked from the converter's
`Convert(model)` (and eventually `GetCharacterById`). Keeping it a separate
class keeps it unit-testable in isolation and free of I/O:

```
DnD5eCharacterModelConverter.Convert(model)
    -> populate source fields (as today)
    -> var calc = new CharacterDerivationCalculator(model)
    -> set derived fields on the view model from calc.*
```

The calculator takes only the persisted model — no BYOAPI or DB access — so
every method is deterministic and property-testable (good PBT target: e.g.
"proficiency bonus is monotonic non-decreasing in total level").

### 16.2 CharacterDerivationCalculator (outline)

```csharp
namespace DDD.orch3strator.Strategies.Characters
{
  /// Pure, stateless 5e derivation. No I/O. Deterministic given a CharacterModel.
  public class CharacterDerivationCalculator
  {
    private readonly CharacterModel _model;
    private static readonly string[] Abilities = { "str", "dex", "con", "int", "wis", "cha" };

    public CharacterDerivationCalculator(CharacterModel model) => _model = model;

    // --- Ability modifiers ---
    public int AbilityModifier(string ability)
    {
      int score = _model.Attributes.TryGetValue(ability, out var v) ? v : 10;
      return (int)Math.Floor((score - 10) / 2.0);
    }

    // --- Total level & proficiency bonus ---
    public int TotalLevel() => _model.Classes?.Sum(c => c.Level) ?? 0;

    public int ProficiencyBonus() => (int)Math.Ceiling(TotalLevel() / 4.0) + 1;

    // --- Saving throws (proficiency from PRIMARY class only) ---
    public int SavingThrowModifier(string ability)
    {
      bool proficient = _model.Proficiencies?.SavingThrows?.Contains(ability) == true;
      return AbilityModifier(ability) + (proficient ? ProficiencyBonus() : 0);
    }

    // --- Skills (proficiency, expertise, Jack of All Trades) ---
    public int SkillModifier(string skill, string governingAbility)
    {
      var prof = _model.Proficiencies;
      var entry = prof?.Skills?.FirstOrDefault(s => s.Skill == skill);
      bool proficient = entry != null;
      bool expertise  = entry?.Expertise == true;
      int pb = ProficiencyBonus();

      int mod = AbilityModifier(governingAbility);
      if (proficient) mod += pb;
      if (expertise)  mod += pb;                       // stacks a second time
      // Jack of All Trades: half PB on non-proficient checks only
      if (!proficient && prof?.HalfProficiencyAll == true)
        mod += (int)Math.Floor(pb / 2.0);
      return mod;
    }

    public int PassivePerception() => 10 + SkillModifier("perception", "wis");

    public int Initiative() => AbilityModifier("dex");

    // --- Armor Class (highest valid base + situational bonuses) ---
    public int ArmorClass()
    {
      int dex = AbilityModifier("dex");
      int con = AbilityModifier("con");
      int wis = AbilityModifier("wis");

      // Candidate bases; the real impl reads equipped armor from Inventory
      // (via BYOAPI item lookup, injected) and active unarmored-defense features.
      var candidates = new List<int> { 10 + dex };           // unarmored default
      if (HasFeature("barbarian-unarmored-defense")) candidates.Add(10 + dex + con);
      if (HasFeature("monk-unarmored-defense"))      candidates.Add(10 + dex + wis);
      // armored bases would be added here from equipped armor

      int ac = candidates.Max();
      ac += BonusTotal("ac");                                // shield, magic items, etc.
      return ac;
    }

    // --- Max HP (first level full, subsequent averaged, + flat bonuses) ---
    public int MaxHitPoints()
    {
      if (_model.Classes == null || _model.Classes.Length == 0) return 0;
      int con = AbilityModifier("con");
      int total = 0;
      bool firstLevelTaken = false;

      foreach (var cls in _model.Classes.OrderByDescending(c => c.IsPrimaryClass))
      {
        int dieSize = DieSize(cls.HitDie);
        for (int lvl = 0; lvl < cls.Level; lvl++)
        {
          int perLevel = (!firstLevelTaken)
            ? dieSize                       // first character level: max die
            : (dieSize / 2) + 1;            // subsequent: average
          total += perLevel + con;
          firstLevelTaken = true;
        }
      }
      total += BonusTotal("hp-per-level") * TotalLevel();    // Tough, Dwarven Toughness
      return total;
    }

    // --- Per-class spellcasting ---
    public int SpellSaveDC(SpellcastingClassModel sc)
        => 8 + ProficiencyBonus() + AbilityModifier(sc.Ability);

    public int SpellAttackBonus(SpellcastingClassModel sc)
        => ProficiencyBonus() + AbilityModifier(sc.Ability);

    // --- Multiclass combined caster level (excludes pact magic) ---
    public int CombinedCasterLevel()
    {
      if (_model.Classes == null) return 0;
      double level = 0;
      foreach (var c in _model.Classes)
      {
        switch (c.CasterType)
        {
          case "full":  level += c.Level; break;
          case "half":  level += Math.Floor(c.Level / 2.0); break;
          case "third": level += Math.Floor(c.Level / 3.0); break;
          // "pact" and "none" contribute nothing to the shared pool
        }
      }
      return (int)level;
    }

    // --- helpers ---
    private bool HasFeature(string key) => /* look up in features/bonuses */ false;
    private int  BonusTotal(string target)
        => _model.Bonuses?.Where(b => b.Target == target).Sum(b => b.Value) ?? 0;
    private static int DieSize(string die) => die switch
    {
      "d6" => 6, "d8" => 8, "d10" => 10, "d12" => 12, _ => 8
    };
  }
}
```

### 16.3 Multiclass spell-slot table lookup

`CombinedCasterLevel()` yields a level 1–20 that indexes the **standard
multiclass spellcaster slot table** (identical to the full-caster progression).
Model the table as a static readonly map and expose:

```csharp
// slotsByLevel[combinedCasterLevel] => int[9]  (slots for spell levels 1..9)
public Dictionary<string, SlotTrackerViewModel> SpellSlots()
{
    int cl = CombinedCasterLevel();
    int[] slots = MulticlassSlotTable.ForCasterLevel(cl);   // static lookup
    var result = new Dictionary<string, SlotTrackerViewModel>();
    for (int i = 0; i < slots.Length; i++)
        if (slots[i] > 0)
            result[(i + 1).ToString()] = new SlotTrackerViewModel { Max = slots[i], Used = 0 };
    return result;
}
```

- The `Max` per level is derived; `Used` is copied from the persisted model
  (source of truth) so consumed slots survive the round-trip.
- **Pact Magic is not part of this table.** Warlock slots come straight from the
  persisted `PactMagic` block; its `Max`/`slotLevel` derive from Warlock level
  alone, independent of `CombinedCasterLevel()`.

### 16.4 Correctness properties (PBT targets)

Candidate executable properties for the derivation layer:

1. `AbilityModifier` is monotonic non-decreasing in score.
2. `ProficiencyBonus(level)` is in `[2, 6]` for all `level` in `[1, 20]` and
   never decreases as level increases.
3. Expertise on a skill yields exactly `+ProficiencyBonus` over the same skill
   with plain proficiency.
4. `SpellSaveDC == SpellAttackBonus + 8` for every casting class.
5. `CombinedCasterLevel <= TotalLevel`, and equals `TotalLevel` when every class
   is a full caster.
6. `MaxHitPoints` is strictly increasing when a class level is added (CON fixed).
7. Adding a non-caster level never changes `CombinedCasterLevel` or the shared
   slot pool.

### 16.5 What still needs I/O (not in the pure calculator)

- **Armor lookup** — AC's armored bases require the equipped armor's stats,
  which live in the BYOAPI. Inject a resolved armor value or a lookup into the
  AC routine rather than the pure calculator.
- **Feature detection** — `HasFeature` and structured feat effects require
  resolving feat/feature stat blocks from the BYOAPI. Resolve these in the
  strategy and pass a simple feature-flag set into the calculator.


---

## 17. Shared Character Contract (Design)

### 17.1 The real duplication

There are three character types across the two backends, and only two of them
actually duplicate:

| Type | Attributes | Role | Owner |
|------|-----------|------|-------|
| `DDD.charact3r.API.Models.CharacterModel` | `[BsonElement]` | MongoDB persistence shape | charact3r (keep) |
| `DDD.charact3r.API.ViewModels.CharacterViewModel` | `[JsonPropertyName]` | JSON the API **emits** | → shared |
| `DDD.orch3strator.Models.CharacterService.CharacterModel` | `[JsonPropertyName]` | what the orchestrator **deserializes** that JSON into | → shared |

The persistence model is genuinely charact3r-owned and stays put. The
duplication that causes drift is the **wire contract**: charact3r emits a JSON
shape and the orchestrator hand-maintains a second class to receive it. When one
side gains a field and the other does not, the field silently deserializes to
`null` — the likely cause of the previously commented-out mapping code.

### 17.2 Decision: extract one canonical wire contract into DDD.Common

Both `DDD.charact3r.API` and `DDD.orch3strator` **already** reference
`DDD.Common` (verified in both `.csproj` files). So the shared contract can live
there with **no new project references and no new coupling** beyond what exists.

**Proposed shape:**

- New namespace `DDD.Common.Contracts.Character` in `DDD.Common`.
- Move the `[JsonPropertyName]`-annotated character contract there as the single
  canonical `CharacterContract` (plus its nested `CharacterClassContract`,
  `ProficiencyContract`, `SpellcastingContract`, etc.).
- `DDD.charact3r.API` maps `CharacterModel` (Bson) ↔ `CharacterContract` via its
  existing AutoMapper profile and returns `CharacterContract` from controllers.
- `DDD.orch3strator` deserializes downstream responses directly into
  `CharacterContract` (`ReadFromJsonAsync<CharacterContract>()`), deleting its
  `Models.CharacterService.CharacterModel`.

### 17.3 Coupling tradeoff (explicit)

- **Cost:** charact3r and the orchestrator become coupled to one contract type
  in `DDD.Common`. A breaking change to the contract is a breaking change to
  both — they must deploy in lockstep for breaking changes.
- **Benefit:** the two sides **cannot** silently drift. A field added to the
  contract appears on both ends at compile time; a removed/renamed field is a
  compile error, not a null at runtime. This is the failure mode that has bitten
  before.
- **Net:** the coupling is *already there implicitly* — it is just unenforced.
  Making it a shared type converts a silent runtime drift into a loud
  compile-time contract. For an internally-consumed API (orchestrator ↔ data
  API, same repo, same deploy) that trade is favourable.

**When this trade would be wrong:** if charact3r were a public/independently
versioned API with external consumers, a shared compile-time type would be the
wrong coupling — you would want explicit versioned DTOs per side. That is not
the case here (single repo, single team, orchestrator is the only consumer).

### 17.4 Contract vs. view model — keep them distinct

`CharacterContract` is the **data-API wire shape** (referential: `byoapiId`
pointers, source-of-truth fields only). It is **not** the orchestrator's
outward `DnD5e.CharacterViewModel`, which is the enriched, derived, client-facing
shape (flat attributes, computed HP/AC/DCs). The pipeline stays:

```
Mongo CharacterModel  --(charact3r AutoMapper)-->  CharacterContract  [shared, DDD.Common]
        (charact3r API emits JSON) ----------------------> orchestrator deserializes CharacterContract
CharacterContract  --(DnD5eCharacterModelConverter + CharacterDerivationCalculator)-->  DnD5e.CharacterViewModel  (client)
```

Only the middle hop is de-duplicated. The derivation/enrichment boundary
(§16) is unchanged.

### 17.5 Migration outline (no code yet)

1. Add `DDD.Common/Contracts/Character/CharacterContract.cs` (the merged,
   complete `[JsonPropertyName]` shape from §15, including proficiencies and
   spellcasting).
2. Point `DDD.charact3r.API` at it: change the AutoMapper profile to map
   `CharacterModel` ↔ `CharacterContract`; update the controller return type and
   the `IDataService`/service signatures. Delete
   `ViewModels/CharacterViewModel.cs`.
3. Point `DDD.orch3strator` at it: change `DataApiBaseService<CharacterModel>`
   usages and the converter's input type to `CharacterContract`; delete
   `Models/CharacterService/CharacterModel.cs`.
4. Re-enable the previously commented-out class/race mapping in
   `DnD5eCharacterModelConverter` now that the contract carries those fields.
5. Build both projects; the compiler surfaces every remaining reference to the
   two deleted types.

### 17.6 Open question for implementation

- **Naming:** `CharacterContract` vs. reusing `CharacterViewModel` as the shared
  name. Recommendation: `CharacterContract` — it signals "wire contract between
  services", distinct from the client-facing `CharacterViewModel` in the
  orchestrator, avoiding a same-name-different-type trap.
- **Namespace granularity:** a single `DDD.Common.Contracts.Character` file vs.
  one file per nested type. Recommendation: mirror the existing single-file
  convention used by `CharacterModel.cs` today.
