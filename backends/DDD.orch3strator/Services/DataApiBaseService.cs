namespace DDD.orch3strator.Services
{
  public abstract class DataApiBaseService
  {
    public abstract Task<IEnumerable<TModel>> GetList<TModel>(string ruleSystem, string userId);

    public abstract Task<TModel> GetById<TModel>(string ruleSystem, string userId, string id);

    public abstract Task<TModel> Insert<TModel>(string ruleSystem, TModel model);
  }
}
