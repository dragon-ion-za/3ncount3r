using DDD.Common.Models;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD._3ncount3r.API.Models
{
  [BsonIgnoreExtraElements]
  public class PartyModel : BaseEntityModel
  {
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("characterIds")]
    public IEnumerable<string> CharacterIds { get; set; }
  }
}
