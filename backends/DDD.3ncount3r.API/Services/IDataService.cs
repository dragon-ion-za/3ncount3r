namespace DDD._3ncount3r.API.Services
{
  public interface IDataService<TCollectionModel>
  {
    Task<IEnumerable<TCollectionModel>> Get();
  }
}
