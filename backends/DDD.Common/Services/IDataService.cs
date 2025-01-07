namespace DDD.Common.Services
{
  public interface IDataService<TCollectionModel>
  {
    Task<IEnumerable<TCollectionModel>> Get(string userId, string ruleSystem);
    Task<TCollectionModel> GetById(string userId, string ruleSystem, string id);
    Task<string> Insert(string userId, string ruleSystem, TCollectionModel model);
    Task<string> Update(string userId, string ruleSystem, TCollectionModel model);
  }
}
