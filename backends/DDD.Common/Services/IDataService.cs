namespace DDD.Common.Services
{
  public interface IDataService<TCollectionModel>
  {
    Task<IEnumerable<TCollectionModel>> Get(string userId);
    Task<string> Insert(string userId, TCollectionModel model);
    Task<string> Update(string userId, TCollectionModel model);
  }
}
