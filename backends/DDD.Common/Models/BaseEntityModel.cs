using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD.Common.Models
{
  public abstract class BaseEntityModel
  {
    [BsonElement("id")]
    public ObjectId Id { get; set; }

    [BsonElement("userId")]
    public string UserId { get; set; }
  }
}
