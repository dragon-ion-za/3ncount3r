using System.Text.Json.Serialization;

namespace DDD.charact3r.API.ViewModels
{
  public class CharacterViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("userId")]
    public string UserId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("ruleSystem")]
    public string RuleSystem { get; set; }

    [JsonPropertyName("size")]
    public IEnumerable<string> Size { get; set; }

    [JsonPropertyName("race")]
    public RaceViewModel Race { get; set; }

    [JsonPropertyName("classes")]
    public IEnumerable<CharacterClassViewModel> Classes { get; set; }

    [JsonPropertyName("hitpoints")]
    public IEnumerable<HitpointViewModel> Hitpoints { get; set; }

    [JsonPropertyName("movementSpeeds")]
    public IEnumerable<MovementSpeedViewModel> MovementSpeeds { get; set; }

    public Dictionary<string, int> Attributes { get; set; }

    [JsonPropertyName("bonuses")]
    public IEnumerable<BonusViewModel> Bonuses { get; set; }

    [JsonPropertyName("proficiencies")]
    public ProficiencyViewModel Proficiencies { get; set; }

    [JsonPropertyName("spellcasting")]
    public SpellcastingViewModel Spellcasting { get; set; }

    [JsonPropertyName("languages")]
    public IEnumerable<string> Languages { get; set; }

    [JsonPropertyName("feats")]
    public IEnumerable<FeatViewModel> Feats { get; set; }

    [JsonPropertyName("inventory")]
    public IEnumerable<EquipmentViewModel> Inventory { get; set; }
  }

  public class CharacterClassViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("level")]
    public int Level { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }

    [JsonPropertyName("subclass")]
    public string Subclass { get; set; }

    [JsonPropertyName("isPrimaryClass")]
    public bool IsPrimaryClass { get; set; }

    [JsonPropertyName("casterType")]
    public string CasterType { get; set; }

    [JsonPropertyName("hitDie")]
    public string HitDie { get; set; }
  }

  public class EquipmentViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }

    [JsonPropertyName("containerId")]
    public int ContainerId { get; set; }

    [JsonPropertyName("quantity")]
    public int Quantity { get; set; }
  }

  public class MovementSpeedViewModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("value")]
    public int Value { get; set; }
  }

  public class BonusViewModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("target")]
    public string Target { get; set; }

    [JsonPropertyName("value")]
    public int Value { get; set; }
  }

  public class HitpointViewModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("maximum")]
    public int Maximum { get; set; }

    [JsonPropertyName("current")]
    public int Current { get; set; }
  }

  public class FeatViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }
  }

  public class RaceViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }
  }

  public class ProficiencyViewModel
  {
    [JsonPropertyName("savingThrows")]
    public IEnumerable<string> SavingThrows { get; set; }

    [JsonPropertyName("skills")]
    public IEnumerable<SkillProficiencyViewModel> Skills { get; set; }

    [JsonPropertyName("armor")]
    public IEnumerable<string> Armor { get; set; }

    [JsonPropertyName("weapons")]
    public IEnumerable<string> Weapons { get; set; }

    [JsonPropertyName("tools")]
    public IEnumerable<string> Tools { get; set; }

    [JsonPropertyName("halfProficiencyAll")]
    public bool HalfProficiencyAll { get; set; }

    [JsonPropertyName("reliableTalent")]
    public bool ReliableTalent { get; set; }
  }

  public class SkillProficiencyViewModel
  {
    [JsonPropertyName("skill")]
    public string Skill { get; set; }

    [JsonPropertyName("expertise")]
    public bool Expertise { get; set; }
  }

  public class SpellcastingViewModel
  {
    [JsonPropertyName("classes")]
    public IEnumerable<SpellcastingClassViewModel> Classes { get; set; }

    [JsonPropertyName("spellSlots")]
    public Dictionary<string, SlotTrackerViewModel> SpellSlots { get; set; }

    [JsonPropertyName("pactMagic")]
    public PactMagicViewModel PactMagic { get; set; }
  }

  public class SpellcastingClassViewModel
  {
    [JsonPropertyName("className")]
    public string ClassName { get; set; }

    [JsonPropertyName("ability")]
    public string Ability { get; set; }

    [JsonPropertyName("preparationType")]
    public string PreparationType { get; set; }

    [JsonPropertyName("cantripsKnown")]
    public int CantripsKnown { get; set; }

    [JsonPropertyName("spells")]
    public IEnumerable<SpellRefViewModel> Spells { get; set; }
  }

  public class SpellRefViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }

    [JsonPropertyName("level")]
    public int Level { get; set; }

    [JsonPropertyName("prepared")]
    public bool Prepared { get; set; }
  }

  public class SlotTrackerViewModel
  {
    [JsonPropertyName("max")]
    public int Max { get; set; }

    [JsonPropertyName("used")]
    public int Used { get; set; }
  }

  public class PactMagicViewModel
  {
    [JsonPropertyName("slotLevel")]
    public int SlotLevel { get; set; }

    [JsonPropertyName("slots")]
    public SlotTrackerViewModel Slots { get; set; }

    [JsonPropertyName("spells")]
    public IEnumerable<SpellRefViewModel> Spells { get; set; }
  }
}
