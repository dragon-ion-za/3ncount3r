using DDD._3ncount3r.API.Models;
using DDD.Common.Services;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DDD._3ncount3r.API.Services
{
  public class EncountersService : DataService<EncounterModel>
  {
    public override string CollectionName => "Encounters";
    public override bool DoVersioning => true;

    private IMongoCollection<PartyModel> _partyCollection;

    public EncountersService(IMongoDatabase mongoDatabase) : base(mongoDatabase)
    {
    }

    protected override void InitRelatedCollections(IMongoDatabase mongoDatabase)
    {
      _partyCollection = mongoDatabase.GetCollection<PartyModel>("Parties");
    }

    protected override async Task<IEnumerable<EncounterModel>> DoGet(string userId, string ruleSystem)
    {
      return await _collection.Aggregate()
        .Match(entity => entity.UserId == userId && entity.RuleSystem == ruleSystem)
        .Lookup<EncounterModel, PartyModel, EncounterModel>(_partyCollection, x => x.PartyId, y => y.Id, x => x.Parties)
        .ToListAsync();
    }

    protected override async Task<EncounterModel> DoGetById(string userId, string ruleSystem, string id)
    {
      return await _collection.Aggregate()
        .Match(entity => entity.UserId == userId && entity.Id == ObjectId.Parse(id) && entity.RuleSystem == ruleSystem)
        .Lookup<EncounterModel, PartyModel, EncounterModel>(_partyCollection, x => x.PartyId, y => y.Id, x => x.Parties)
        .FirstAsync();
    }

    protected override EncounterModel CalculateModelDelta(EncounterModel prevModel, EncounterModel model)
    {
      EncounterModel delta = new EncounterModel();

      delta.Id = prevModel.Id;
      List<EncounterCreatureModel> deltaCreatures = new List<EncounterCreatureModel>();

      delta.Campaign = model.Campaign != prevModel.Campaign ? model.Campaign : null;
      delta.CurrentTurn = model.CurrentTurn != prevModel.CurrentTurn ? model.CurrentTurn : prevModel.CurrentTurn;
      delta.Location = model.Location != prevModel.Location ? model.Location : null;
      delta.Name = model.Name != prevModel.Name ? model.Name : null;
      delta.PartyId = model.PartyId != prevModel.PartyId ? model.PartyId : ObjectId.Empty;
      delta.RoundCount = model.RoundCount != prevModel.RoundCount ? model.RoundCount : prevModel.RoundCount;
      delta.RuleSystem = model.RuleSystem != prevModel.RuleSystem ? model.RuleSystem : null;
      delta.UserId = model.UserId != prevModel.UserId ? model.UserId : null;

      foreach (var prevCreature in prevModel.Creatures)
      {
        var currCreature = model.Creatures.FirstOrDefault(x => x.Id == prevCreature.Id);

        if (currCreature != null)
        {
          EncounterCreatureModel creatureDelta = new EncounterCreatureModel();

          creatureDelta.Id = prevCreature.Id;

          creatureDelta.ByoapiId = currCreature.ByoapiId != prevCreature.ByoapiId ? currCreature.ByoapiId : null;
          creatureDelta.IsActive = currCreature.IsActive != prevCreature.IsActive ? currCreature.IsActive : prevCreature.IsActive;
          creatureDelta.IsPlayerCharacter = currCreature.IsPlayerCharacter != prevCreature.IsPlayerCharacter ? currCreature.IsPlayerCharacter : prevCreature.IsPlayerCharacter;
          creatureDelta.Name = currCreature.Name != prevCreature.Name ? currCreature.Name : null;
          creatureDelta.SourceId = currCreature.SourceId != prevCreature.SourceId ? currCreature.SourceId : null;
          creatureDelta.TurnOrder = currCreature.TurnOrder != prevCreature.TurnOrder ? currCreature.TurnOrder : prevCreature.TurnOrder;

          // None of the values are nullable, so we simply use the new values
          creatureDelta.Hitpoints = currCreature.Hitpoints;

          deltaCreatures.Add(creatureDelta);
        }
      }

      deltaCreatures.AddRange(model.Creatures.ExceptBy(prevModel.Creatures.Select(x => x.Id), x => x.Id));

      delta.Creatures = deltaCreatures;

      return delta;
    }
  }
}
