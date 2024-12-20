using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD.Common.Models
{
  public abstract class BaseEntityModel
  {
    [BsonElement("id")]
    [BsonRequired]
    public ObjectId Id { get; set; }

    [BsonElement("userId")]
    [BsonRequired]
    public string UserId { get; set; }
  }
}
