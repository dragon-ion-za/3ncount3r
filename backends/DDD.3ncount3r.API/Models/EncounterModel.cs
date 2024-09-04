using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD._3ncount3r.API.Models
{
  [BsonIgnoreExtraElements]
  public class EncounterModel
  {
    [BsonElement("id")]
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("creatures")]
    public IEnumerable<EncounterCreatureModel> Creatures { get; set; }

    [BsonElement("selectedParty")]
    public string SelectedParty { get; set; }

    [BsonElement("roundCount")]
    public int RoundCount { get; set; }

    [BsonElement("currentTurn")]
    public int CurrentTurn { get; set; }
  }
}
