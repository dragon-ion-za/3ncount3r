using System.Text.Json.Serialization;

namespace DDD.Common.Contracts.Character
{
  public class CharacterContract
  {
    [JsonPropertyName("id")]             public string Id { get; set; }
    [JsonPropertyName("userId")]         public string UserId { get; set; }
    [JsonPropertyName("name")]           public string Name { get; set; }
    [JsonPropertyName("ruleSystem")]     public string RuleSystem { get; set; }
    [JsonPropertyName("size")]           public IEnumerable<string> Size { get; set; }
    [JsonPropertyName("race")]           public RaceContract Race { get; set; }
    [JsonPropertyName("classes")]        public IEnumerable<CharacterClassContract> Classes { get; set; }
    [JsonPropertyName("hitpoints")]      public IEnumerable<HitpointContract> Hitpoints { get; set; }
    [JsonPropertyName("movementSpeeds")] public IEnumerable<MovementSpeedContract> MovementSpeeds { get; set; }

    // Ability scores: str/dex/con/int/wis/cha → score. Source-of-truth only.
    [JsonPropertyName("attributes")]     public Dictionary<string, int> Attributes { get; set; }

    [JsonPropertyName("bonuses")]        public IEnumerable<BonusContract> Bonuses { get; set; }
    [JsonPropertyName("proficiencies")]  public ProficiencyContract Proficiencies { get; set; }
    [JsonPropertyName("spellcasting")]   public SpellcastingContract Spellcasting { get; set; }
    [JsonPropertyName("languages")]      public IEnumerable<string> Languages { get; set; }
    [JsonPropertyName("feats")]          public IEnumerable<FeatContract> Feats { get; set; }
    [JsonPropertyName("inventory")]      public IEnumerable<EquipmentContract> Inventory { get; set; }
  }

  public class CharacterClassContract
  {
    [JsonPropertyName("id")]             public string Id { get; set; }
    [JsonPropertyName("level")]          public int Level { get; set; }
    [JsonPropertyName("byoapiId")]       public string ByoapiId { get; set; }
    [JsonPropertyName("subclass")]       public string Subclass { get; set; }
    [JsonPropertyName("isPrimaryClass")] public bool IsPrimaryClass { get; set; }
    // full | half | third | pact | none — drives combined-caster-level math
    [JsonPropertyName("casterType")]     public string CasterType { get; set; }
    // d6 | d8 | d10 | d12
    [JsonPropertyName("hitDie")]         public string HitDie { get; set; }
  }

  public class RaceContract
  {
    [JsonPropertyName("id")]        public string Id { get; set; }
    [JsonPropertyName("byoapiId")]  public string ByoapiId { get; set; }
  }

  public class HitpointContract
  {
    [JsonPropertyName("type")]     public string Type { get; set; }
    [JsonPropertyName("maximum")]  public int Maximum { get; set; }
    [JsonPropertyName("current")]  public int Current { get; set; }
  }

  public class MovementSpeedContract
  {
    [JsonPropertyName("type")]   public string Type { get; set; }
    [JsonPropertyName("value")]  public int Value { get; set; }
  }

  public class BonusContract
  {
    [JsonPropertyName("type")]    public string Type { get; set; }
    [JsonPropertyName("target")]  public string Target { get; set; }
    [JsonPropertyName("value")]   public int Value { get; set; }
  }

  public class FeatContract
  {
    [JsonPropertyName("id")]        public string Id { get; set; }
    [JsonPropertyName("byoapiId")]  public string ByoapiId { get; set; }
  }

  public class EquipmentContract
  {
    [JsonPropertyName("id")]           public string Id { get; set; }
    [JsonPropertyName("byoapiId")]     public string ByoapiId { get; set; }
    [JsonPropertyName("containerId")]  public int ContainerId { get; set; }
    [JsonPropertyName("quantity")]     public int Quantity { get; set; }
  }

  public class ProficiencyContract
  {
    // ability keys str/dex/con/int/wis/cha — from the PRIMARY class only
    [JsonPropertyName("savingThrows")]       public IEnumerable<string> SavingThrows { get; set; }
    [JsonPropertyName("skills")]             public IEnumerable<SkillProficiencyContract> Skills { get; set; }
    [JsonPropertyName("armor")]              public IEnumerable<string> Armor { get; set; }
    [JsonPropertyName("weapons")]            public IEnumerable<string> Weapons { get; set; }
    [JsonPropertyName("tools")]              public IEnumerable<string> Tools { get; set; }
    [JsonPropertyName("halfProficiencyAll")] public bool HalfProficiencyAll { get; set; } // Jack of All Trades
    [JsonPropertyName("reliableTalent")]     public bool ReliableTalent { get; set; }
  }

  public class SkillProficiencyContract
  {
    [JsonPropertyName("skill")]      public string Skill { get; set; }
    [JsonPropertyName("expertise")]  public bool Expertise { get; set; }
  }

  public class SpellcastingContract
  {
    [JsonPropertyName("classes")]     public IEnumerable<SpellcastingClassContract> Classes { get; set; }
    // shared multiclass slot pool keyed by spell level "1".."9"
    [JsonPropertyName("spellSlots")]  public Dictionary<string, SlotTrackerContract> SpellSlots { get; set; }
    [JsonPropertyName("pactMagic")]   public PactMagicContract PactMagic { get; set; } // Warlock only
  }

  public class SpellcastingClassContract
  {
    [JsonPropertyName("className")]        public string ClassName { get; set; }
    [JsonPropertyName("ability")]          public string Ability { get; set; }         // int | wis | cha
    [JsonPropertyName("preparationType")]  public string PreparationType { get; set; } // prepared | known
    [JsonPropertyName("cantripsKnown")]    public int CantripsKnown { get; set; }
    [JsonPropertyName("spells")]           public IEnumerable<SpellRefContract> Spells { get; set; }
  }

  public class SpellRefContract
  {
    [JsonPropertyName("id")]        public string Id { get; set; }
    [JsonPropertyName("byoapiId")]  public string ByoapiId { get; set; }
    [JsonPropertyName("level")]     public int Level { get; set; }   // 0 = cantrip
    [JsonPropertyName("prepared")]  public bool Prepared { get; set; }
  }

  public class SlotTrackerContract
  {
    [JsonPropertyName("max")]   public int Max { get; set; }
    [JsonPropertyName("used")]  public int Used { get; set; }
  }

  public class PactMagicContract
  {
    [JsonPropertyName("slotLevel")]  public int SlotLevel { get; set; } // 1..5
    [JsonPropertyName("slots")]      public SlotTrackerContract Slots { get; set; }
    [JsonPropertyName("spells")]     public IEnumerable<SpellRefContract> Spells { get; set; }
  }
}
