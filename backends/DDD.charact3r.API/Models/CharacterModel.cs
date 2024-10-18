using DDD.Common.Models;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD.charact3r.API.Models
{
  public class CharacterModel : BaseEntityModel
  {
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("size")]
    public string[] Size { get; set; }

    [BsonElement("level")]
    public int Level { get; set; }

    [BsonElement("race")]
    public string Race { get; set; }

    [BsonElement("armourClass")]
    public int ArmourClass { get; set; }

    [BsonElement("classes")]
    public CharacterClassModel[] Classes { get; set; }

    [BsonElement("hitpointMax")]
    public int HitpointMax { get; set; }

    [BsonElement("walkingSpeed")]
    public int WalkingSpeed { get; set; }

    public Dictionary<string, int> Attributes { get; set; }

    [BsonElement("skillProficiencies")]
    public string[] SkillProficiencies { get; set; }

    [BsonElement("savingThrowProficiencies")]
    public string[] SavingThrowProficiencies { get; set; }

    [BsonElement("passivePerception")]
    public int PassivePerception { get; set; }

    [BsonElement("languages")]
    public string[] Languages { get; set; }

    [BsonElement("feats")]
    public string[] Feats { get; set; }

    [BsonElement("equipment")]
    public EquipmentModel[] Equipment { get; set; }

    [BsonElement("inventory")]
    public EquipmentModel[] Inventory { get; set; }
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
