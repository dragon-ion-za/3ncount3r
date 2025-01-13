using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DDD.Common.Models
{
  internal class HistoryModel<TCollectionModel> : BaseEntityModel where TCollectionModel : BaseEntityModel
  {
    [BsonElement("delta")]
    public TCollectionModel Delta { get; set; }

    [BsonElement("dateChanged")]
    public DateTimeOffset DateChanged { get; set; } = DateTimeOffset.Now;

    public HistoryModel() { }

    public HistoryModel(TCollectionModel modelDelta, string userId, string ruleSystem)
    {
      Id = ObjectId.GenerateNewId();
      UserId = userId;
      RuleSystem = ruleSystem;
      Delta = modelDelta;
    }
  }
}
