namespace DDD.orch3strator.Converters
{
  public interface IModelConverterFactory
  {
    IModelConverter<TModel> Create<TModel>(string ruleSystem);
  }
}
