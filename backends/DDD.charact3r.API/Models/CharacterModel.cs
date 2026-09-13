using DDD.Common.Models;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD.charact3r.API.Models
{
  public class CharacterModel : BaseEntityModel
  {
    [BsonElement("name"), BsonIgnoreIfNull]
    public string Name { get; set; }

    [BsonElement("size"), BsonIgnoreIfNull]
    public string[] Size { get; set; }

    [BsonElement("race"), BsonIgnoreIfNull]
    public RaceModel Race { get; set; }

    [BsonElement("classes"), BsonIgnoreIfNull]
    public CharacterClassModel[] Classes { get; set; }

    [BsonElement("hitpoints"), BsonIgnoreIfNull]
    public HitpointModel[] Hitpoints { get; set; }

    [BsonElement("movementSpeeds"), BsonIgnoreIfNull]
    public MovementSpeedModel[] MovementSpeeds { get; set; }

    public Dictionary<string, int> Attributes { get; set; }

    [BsonElement("bonuses"), BsonIgnoreIfNull]
    public BonusModel[] Bonuses { get; set; }

    [BsonElement("proficiencies"), BsonIgnoreIfNull]
    public ProficiencyModel Proficiencies { get; set; }

    [BsonElement("spellcasting"), BsonIgnoreIfNull]
    public SpellcastingModel Spellcasting { get; set; }

    [BsonElement("languages"), BsonIgnoreIfNull]
    public string[] Languages { get; set; }

    [BsonElement("feats"), BsonIgnoreIfNull]
    public FeatModel[] Feats { get; set; }

    [BsonElement("inventory"), BsonIgnoreIfNull]
    public EquipmentModel[] Inventory { get; set; }
  }

  public class CharacterClassModel
  {
    [BsonElement("id"), BsonIgnoreIfNull]
    public string Id { get; set; }

    [BsonElement("level"), BsonIgnoreIfNull]
    public int Level { get; set; }

    [BsonElement("byoapiId"), BsonIgnoreIfNull]
    public string ByoapiId { get; set; }

    [BsonElement("subclass"), BsonIgnoreIfNull]
    public string Subclass { get; set; }

    [BsonElement("isPrimaryClass")]
    public bool IsPrimaryClass { get; set; }

    // full | half | third | pact | none — drives the combined caster level calculation
    [BsonElement("casterType"), BsonIgnoreIfNull]
    public string CasterType { get; set; }

    // d6 | d8 | d10 | d12
    [BsonElement("hitDie"), BsonIgnoreIfNull]
    public string HitDie { get; set; }
  }

  public class EquipmentModel
  {
    [BsonElement("id"), BsonIgnoreIfNull]
    public string Id { get; set; }

    [BsonElement("byoapiId"), BsonIgnoreIfNull]
    public string ByoapiId { get; set; }

    [BsonElement("containerId"), BsonIgnoreIfNull]
    public int ContainerId { get; set; }

    [BsonElement("quantity"), BsonIgnoreIfNull]
    public int Quantity { get; set; }
  }

  public class MovementSpeedModel
  {
    [BsonElement("type"), BsonIgnoreIfNull]
    public string Type { get; set; }

    [BsonElement("value"), BsonIgnoreIfNull]
    public int Value { get; set; }
  }

  public class BonusModel
  {
    [BsonElement("type"), BsonIgnoreIfNull]
    public string Type { get; set; }

    [BsonElement("target"), BsonIgnoreIfNull]
    public string Target { get; set; }

    [BsonElement("value"), BsonIgnoreIfNull]
    public int Value { get; set; }
  }

  public class HitpointModel
  {
    [BsonElement("type"), BsonIgnoreIfNull]
    public string Type { get; set; }

    [BsonElement("maximum"), BsonIgnoreIfNull]
    public int Maximum { get; set; }

    [BsonElement("current"), BsonIgnoreIfNull]
    public int Current { get; set; }
  }

  public class FeatModel
  {
    [BsonElement("id"), BsonIgnoreIfNull]
    public string Id { get; set; }

    [BsonElement("byoapiId"), BsonIgnoreIfNull]
    public string ByoapiId { get; set; }
  }

  public class RaceModel
  {
    [BsonElement("id"), BsonIgnoreIfNull]
    public string Id { get; set; }

    [BsonElement("byoapiId"), BsonIgnoreIfNull]
    public string ByoapiId { get; set; }
  }

  public class ProficiencyModel
  {
    // ability keys: str/dex/con/int/wis/cha — granted by the PRIMARY class only
    [BsonElement("savingThrows"), BsonIgnoreIfNull]
    public string[] SavingThrows { get; set; }

    [BsonElement("skills"), BsonIgnoreIfNull]
    public SkillProficiencyModel[] Skills { get; set; }

    [BsonElement("armor"), BsonIgnoreIfNull]
    public string[] Armor { get; set; }

    [BsonElement("weapons"), BsonIgnoreIfNull]
    public string[] Weapons { get; set; }

    [BsonElement("tools"), BsonIgnoreIfNull]
    public string[] Tools { get; set; }

    // Jack of All Trades — half proficiency on non-proficient ability checks
    [BsonElement("halfProficiencyAll")]
    public bool HalfProficiencyAll { get; set; }

    // Reliable Talent — roll-time floor of 10 on proficient skill checks
    [BsonElement("reliableTalent")]
    public bool ReliableTalent { get; set; }
  }

  public class SkillProficiencyModel
  {
    [BsonElement("skill"), BsonIgnoreIfNull]
    public string Skill { get; set; }

    [BsonElement("expertise")]
    public bool Expertise { get; set; }
  }

  public class SpellcastingModel
  {
    [BsonElement("classes"), BsonIgnoreIfNull]
    public SpellcastingClassModel[] Classes { get; set; }

    // shared multiclass slot pool keyed by spell level "1".."9"
    [BsonElement("spellSlots"), BsonIgnoreIfNull]
    public Dictionary<string, SlotTrackerModel> SpellSlots { get; set; }

    // Warlock only — separate short-rest pool, never merged into SpellSlots
    [BsonElement("pactMagic"), BsonIgnoreIfNull]
    public PactMagicModel PactMagic { get; set; }
  }

  public class SpellcastingClassModel
  {
    [BsonElement("className"), BsonIgnoreIfNull]
    public string ClassName { get; set; }

    // int | wis | cha
    [BsonElement("ability"), BsonIgnoreIfNull]
    public string Ability { get; set; }

    // prepared | known
    [BsonElement("preparationType"), BsonIgnoreIfNull]
    public string PreparationType { get; set; }

    [BsonElement("cantripsKnown")]
    public int CantripsKnown { get; set; }

    [BsonElement("spells"), BsonIgnoreIfNull]
    public SpellRefModel[] Spells { get; set; }
  }

  public class SpellRefModel
  {
    [BsonElement("id"), BsonIgnoreIfNull]
    public string Id { get; set; }

    [BsonElement("byoapiId"), BsonIgnoreIfNull]
    public string ByoapiId { get; set; }

    // 0 = cantrip
    [BsonElement("level")]
    public int Level { get; set; }

    [BsonElement("prepared")]
    public bool Prepared { get; set; }
  }

  public class SlotTrackerModel
  {
    [BsonElement("max")]
    public int Max { get; set; }

    [BsonElement("used")]
    public int Used { get; set; }
  }

  public class PactMagicModel
  {
    // 1..5 — all pact slots share this single level
    [BsonElement("slotLevel")]
    public int SlotLevel { get; set; }

    [BsonElement("slots"), BsonIgnoreIfNull]
    public SlotTrackerModel Slots { get; set; }

    [BsonElement("spells"), BsonIgnoreIfNull]
    public SpellRefModel[] Spells { get; set; }
  }
}
