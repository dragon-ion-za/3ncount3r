using MongoDB.Bson.Serialization.Attributes;

namespace DDD._3ncount3r.API.Models
{
  [BsonIgnoreExtraElements]
  public class EncounterCreatureModel
  {
    [BsonElement("id")]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("sourceId")]
    public string SourceId { get; set; }

    [BsonElement("byoapiId")]
    public string ByoapiId { get; set; }

    [BsonElement("hitpoints")]
    public HitpointModel[] Hitpoints { get; set; }

    [BsonElement("turnOrder")]
    public int TurnOrder { get; set; }

    [BsonElement("isPlayerCharacter")]
    public bool IsPlayerCharacter { get; set; } = false;

    [BsonElement("isActive")]
    public bool IsActive { get; set; } = true;
  }

  [BsonIgnoreExtraElements]
  public class HitpointModel
  {
    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("maximum")]
    public int Maximum { get; set; }

    [BsonElement("current")]
    public int Current { get; set; }
  }
}
