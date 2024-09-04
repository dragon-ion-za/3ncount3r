using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD._3ncount3r.API.Models
{
  
  public class EncounterModel
  {
    [BsonElement("id")]
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }
  }
}
