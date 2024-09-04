using DDD._3ncount3r.API.Configurations;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Reflection.Metadata;

namespace DDD._3ncount3r.API.Services
{
  public abstract class DataService<TCollectionModel>: IDataService<TCollectionModel> where TCollectionModel : class, new()
  {
    private readonly MongoDbConfig _config;
    private bool _isInitialised = false;
    private IMongoCollection<TCollectionModel> _collection;

    internal abstract string CollectionName { get; }

    public DataService(IOptions<MongoDbConfig> config)
    {
      _config = config.Value;
    }

    public async Task<IEnumerable<TCollectionModel>> Get()
    {
      InitDb();
      return await _collection.Find(_ => true).ToListAsync();
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
