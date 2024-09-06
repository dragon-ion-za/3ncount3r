using DDD.Common.Configurations;
using DDD.Common.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DDD.Common.Services
{
  public abstract class DataService<TCollectionModel> : IDataService<TCollectionModel> where TCollectionModel : BaseEntityModel, new()
  {
    private readonly MongoDbConfig _config;
    private bool _isInitialised = false;
    private IMongoCollection<TCollectionModel> _collection;

    public abstract string CollectionName { get; }

    public DataService(IOptions<MongoDbConfig> config)
    {
      _config = config.Value;
    }

    public async Task<IEnumerable<TCollectionModel>> Get(string userId)
    {
      InitDb();
      return await _collection.Find(entity => entity.UserId == userId).ToListAsync();
    }

    public async Task<string> Insert(string userId, TCollectionModel model)
    {
      InitDb();
      model.Id = ObjectId.GenerateNewId();
      model.UserId = userId;
      await _collection.InsertOneAsync(model);

      return model.Id.ToString();
    }

    public async Task<string> Update(string userId, TCollectionModel model)
    {
      InitDb();
      model.UserId = userId;
      await _collection.ReplaceOneAsync(entity => entity.Id == model.Id && entity.UserId == userId, model);

      return model.Id.ToString();
    }

    private void InitDb()
    {
      if (!_isInitialised)
      {
        IMongoClient mongoClient = new MongoClient(
            _config.ConnectionString);

        IMongoDatabase mongoDatabase = mongoClient.GetDatabase(
            _config.DatabaseName);

        _collection = mongoDatabase.GetCollection<TCollectionModel>(CollectionName);

        _isInitialised = true;
      }
    }
  }
}
