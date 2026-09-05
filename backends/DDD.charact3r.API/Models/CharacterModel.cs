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

}
