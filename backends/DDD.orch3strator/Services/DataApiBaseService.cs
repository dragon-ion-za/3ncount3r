namespace DDD.orch3strator.Services
{
  public abstract class DataApiBaseService
  {
    public abstract Task<IEnumerable<TModel>> Get<TModel>(string ruleSystem, string userId);
  }
}
