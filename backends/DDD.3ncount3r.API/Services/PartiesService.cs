using DDD._3ncount3r.API.Models;
using DDD.Common.Services;
using MongoDB.Driver;

namespace DDD._3ncount3r.API.Services
{
  public class PartiesService : DataService<PartyModel>
  {
    public override string CollectionName => "Parties";
    public override bool DoVersioning => false;

    public PartiesService(IMongoDatabase mongoDatabase) : base(mongoDatabase)
    {
    }

    protected override PartyModel CalculateModelDelta(PartyModel prevModel, PartyModel model)
    {
      PartyModel delta = new PartyModel();

      delta.Id = prevModel.Id;

      delta.CharacterIds = model.CharacterIds;
      delta.Name = model.Name != prevModel.Name ? model.Name : null;
      delta.RuleSystem = model.RuleSystem != prevModel.RuleSystem ? model.RuleSystem : null;
      delta.UserId = model.UserId != prevModel.UserId ? model.UserId : null;

      return delta;
    }
  }
}
