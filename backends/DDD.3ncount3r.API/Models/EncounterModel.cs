using DDD.Common.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD._3ncount3r.API.Models
{
  [BsonIgnoreExtraElements]
  public class EncounterModel : BaseEntityModel
  {
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
