using DDD.Common.Models;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD.charact3r.API.Models
{
  public class CharacterModel : BaseEntityModel
  {
    [BsonElement("sourceId")]
    public string SourceId { get; set; }

    [BsonElement("byoapiId")]
    public string ByoapiId { get; set; }

    [BsonElement("hitpointSpecial")]
    public string HitpointSpecial { get; set; }

    [BsonElement("hitpointFormula")]
    public string HitpointFormula { get; set; }

    [BsonElement("armourClass")]
    public object ArmourClass { get; set; }

    [BsonElement("legendaryCount")]
    public int LegendaryCount { get; set; }

    [BsonElement("isPlayerCharacter")]
    public bool IsPlayerCharacter { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("size")]
    public string[] Size { get; set; }

    [BsonElement("level")]
    public int Level { get; set; }

    [BsonElement("race")]
    public string Race { get; set; }

    [BsonElement("classes")]
    public CharacterClassModel[] Classes { get; set; }

    [BsonElement("hitpointMax")]
    public int HitpointMax { get; set; }

    [BsonElement("hitpointCurrent")]
    public int HitpointCurrent { get; set; }

    [BsonElement("hitpointTemporary")]
    public int HitpointTemporary { get; set; }

    [BsonElement("walkingSpeed")]
    public int WalkingSpeed { get; set; }

    [BsonElement("attributeStr")]
    public int AttributeStr { get; set; }

    [BsonElement("attributeDex")]
    public int AttributeDex { get; set; }

    [BsonElement("attributeCon")]
    public int AttributeCon { get; set; }

    [BsonElement("attributeInt")]
    public int AttributeInt { get; set; }

    [BsonElement("attributeWis")]
    public int AttributeWis { get; set; }

    [BsonElement("attributeCha")]
    public int AttributeCha { get; set; }

    [BsonElement("skillProficiencies")]
    public string[] SkillProficiencies { get; set; }

    [BsonElement("savingThrowProficiencies")]
    public string[] SavingThrowProficiencies { get; set; }

    [BsonElement("passivePerception")]
    public int PassivePerception { get; set; }

    [BsonElement("languages")]
    public string[] Languages { get; set; }

    [BsonElement("trait")]
    public object[] Trait { get; set; }

    [BsonElement("action")]
    public object[] Action { get; set; }

    [BsonElement("equipment")]
    public EquipmentModel[] Equipment { get; set; }

    [BsonElement("inventory")]
    public object[] Inventory { get; set; }

    [BsonElement("hitpointAverage")]
    public int HitpointAverage { get; set; }

    [BsonElement("currentHitpoints")]
    public int CurrentHitpoints { get; set; }

    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("skillModifiers")]
    public object[] SkillModifiers { get; set; }

    [BsonElement("savingThrows")]
    public object[] SavingThrows { get; set; }
  }

  public class CharacterClassModel
  {
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("level")]
    public int Level { get; set; }
  }

  public class EquipmentModel
  {
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("byoapiId")]
    public string ByoapiId { get; set; }
  }

}
