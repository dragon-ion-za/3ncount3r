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

    [BsonElement("hitpointMax")]
    public int HitpointMax { get; set; }

    [BsonElement("currentHitpoints")]
    public int CurrentHitpoints { get; set; }

    [BsonElement("temporaryHitpoints")]
    public int TemporaryHitpoints { get; set; }

    [BsonElement("initiative")]
    public int Initiative { get; set; }

    [BsonElement("isPlayerCharacter")]
    public bool IsPlayerCharacter { get; set; } = false;

    [BsonElement("isActive")]
    public bool IsActive { get; set; } = true;
  }
}
