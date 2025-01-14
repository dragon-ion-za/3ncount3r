using DDD.Common.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD._3ncount3r.API.Models
{
  [BsonIgnoreExtraElements]
  public class EncounterModel : BaseEntityModel
  {
    [BsonElement("partyId"), BsonIgnoreIfNull]
    public ObjectId PartyId { get; set; }

    [BsonElement("name"), BsonIgnoreIfNull]
    public string Name { get; set; }

    [BsonElement("creatures"), BsonIgnoreIfNull]
    public IEnumerable<EncounterCreatureModel> Creatures { get; set; }

    [BsonElement("roundCount"), BsonIgnoreIfNull]
    public int RoundCount { get; set; }

    [BsonElement("currentTurn"), BsonIgnoreIfNull]
    public int CurrentTurn { get; set; }

    [BsonElement("campaign"), BsonIgnoreIfNull]
    public string Campaign { get; set; }

    [BsonElement("location"), BsonIgnoreIfNull]
    public string Location { get; set; }

    // Nav Props
    public virtual IEnumerable<PartyModel> Parties { get; set; }
  }
}
