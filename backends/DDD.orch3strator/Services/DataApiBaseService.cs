namespace DDD.orch3strator.Services
{
  public abstract class DataApiBaseService<TModel>
  {
    public abstract Task<IEnumerable<TModel>> GetList(string ruleSystem, string userId);

    public abstract Task<TModel> GetById(string ruleSystem, string userId, string id);

    public abstract Task<TModel> Insert(string ruleSystem, TModel model);

    public abstract Task<TModel> Update(string ruleSystem, TModel model);
  }
}
