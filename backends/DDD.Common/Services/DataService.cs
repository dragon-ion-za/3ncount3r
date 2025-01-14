using DDD.Common.Configurations;
using DDD.Common.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DDD.Common.Services
{
  public abstract class DataService<TCollectionModel> : IDataService<TCollectionModel> where TCollectionModel : BaseEntityModel, new()
  {
    private readonly MongoDbConfig _config;
    private bool _isInitialised = false;
    private IMongoCollection<HistoryModel<TCollectionModel>> _historyCollection;

    protected IMongoCollection<TCollectionModel> _collection;

    private IMongoDatabase _mongoDatabase;

    public abstract string CollectionName { get; }
    public abstract bool DoVersioning { get; }
    protected abstract TCollectionModel CalculateModelDelta(TCollectionModel prevModel, TCollectionModel model);

    public DataService(IMongoDatabase mongoDatabase)
    {
      _mongoDatabase = mongoDatabase;
    }

    public async Task<IEnumerable<TCollectionModel>> Get(string userId, string ruleSystem)
    {
      InitDb();
      return await DoGet(userId, ruleSystem);
    }

    protected virtual async Task<IEnumerable<TCollectionModel>> DoGet(string userId, string ruleSystem)
    {
      return await _collection.Find(entity => entity.UserId == userId && entity.RuleSystem == ruleSystem).ToListAsync();
    }

    public async Task<TCollectionModel> GetById(string userId, string ruleSystem, string id)
    {
      InitDb();
      return await DoGetById(userId, ruleSystem, id);
    }

    protected virtual async Task<TCollectionModel> DoGetById(string userId, string ruleSystem, string id)
    {
      return await _collection.Find(entity => entity.UserId == userId && entity.Id == ObjectId.Parse(id) && entity.RuleSystem == ruleSystem).FirstAsync();
    }

    public async Task<string> Insert(string userId, string ruleSystem, TCollectionModel model)
    {
      InitDb();

      using (IClientSession session = _mongoDatabase.Client.StartSession())
      {
        try
        {
          session.StartTransaction();

          model.Id = ObjectId.GenerateNewId();
          model.UserId = userId;
          model.RuleSystem = ruleSystem;

          if (DoVersioning)
          {
            await _historyCollection.InsertOneAsync(new HistoryModel<TCollectionModel>(model, userId, ruleSystem));
          }

          await _collection.InsertOneAsync(model);

          session.CommitTransaction();

          return model.Id.ToString();
        }
        catch { throw; }
      }
    }

    public async Task<string> Update(string userId, string ruleSystem, TCollectionModel model)
    {
      InitDb();

      using (IClientSession session = _mongoDatabase.Client.StartSession())
      {
        try
        {
          session.StartTransaction();

          model.UserId = userId;
          model.RuleSystem = ruleSystem;

          if (DoVersioning)
          {
            TCollectionModel prevModel = await GetById(userId, ruleSystem, model.Id.ToString());
            TCollectionModel delta = CalculateModelDelta(prevModel, model);
            await _historyCollection.InsertOneAsync(new HistoryModel<TCollectionModel>(delta, userId, ruleSystem));
          }

          await _collection.ReplaceOneAsync(entity => entity.Id == model.Id && entity.UserId == userId, model);

          session.CommitTransaction();

          return model.Id.ToString();
        }
        catch { throw; }
      }
    }

    private void InitDb()
    {
      if (!_isInitialised)
      {
        _collection = _mongoDatabase.GetCollection<TCollectionModel>(CollectionName);

        InitRelatedCollections(_mongoDatabase);

        if (DoVersioning)
        {
          _historyCollection = _mongoDatabase.GetCollection<HistoryModel<TCollectionModel>>($"{CollectionName}_history");
        }

        _isInitialised = true;
      }
    }

    protected virtual void InitRelatedCollections(IMongoDatabase mongoDatabase) { /* No implementation needed at this level */ }

  }
}
