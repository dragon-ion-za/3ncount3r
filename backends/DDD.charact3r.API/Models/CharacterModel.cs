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

    [BsonElement("race")]
    public RaceModel Race { get; set; }

    [BsonElement("classes")]
    public CharacterClassModel[] Classes { get; set; }

    [BsonElement("hitpoints")]
    public HitpointModel[] Hitpoints { get; set; }

    [BsonElement("movementSpeeds")]
    public MovementSpeedModel[] MovementSpeeds { get; set; }

    public Dictionary<string, int> Attributes { get; set; }

    [BsonElement("bonuses")]
    public BonusModel[] Bonuses { get; set; }

    [BsonElement("languages")]
    public string[] Languages { get; set; }

    [BsonElement("feats")]
    public FeatModel[] Feats { get; set; }

    [BsonElement("inventory")]
    public EquipmentModel[] Inventory { get; set; }
  }

  public class CharacterClassModel
  {
    [BsonElement("id")]
    public string Id { get; set; }

    [BsonElement("level")]
    public int Level { get; set; }

    [BsonElement("byoapiId")]
    public string ByoapiId { get; set; }
  }

  public class EquipmentModel
  {
    [BsonElement("id")]
    public string Id { get; set; }

    [BsonElement("byoapiId")]
    public string ByoapiId { get; set; }

    [BsonElement("containerId")]
    public int ContainerId { get; set; }

    [BsonElement("quantity")]
    public int Quantity { get; set; }
  }

  public class MovementSpeedModel
  {
    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("value")]
    public int Value { get; set; }
  }

  public class BonusModel
  {
    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("target")]
    public string Target { get; set; }

    [BsonElement("value")]
    public int Value { get; set; }
  }

  public class HitpointModel
  {
    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("maximum")]
    public int Maximum { get; set; }

    [BsonElement("current")]
    public int Current { get; set; }
  }

  public class FeatModel
  {
    [BsonElement("id")]
    public string Id { get; set; }

    [BsonElement("byoapiId")]
    public string ByoapiId { get; set; }
  }

  public class RaceModel
  {
    [BsonElement("id")]
    public string Id { get; set; }

    [BsonElement("byoapiId")]
    public string ByoapiId { get; set; }
  }

}
