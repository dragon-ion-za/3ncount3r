namespace DDD.orch3strator.Converters
{
  public interface IModelConverterFactory
  {
    IModelConverter<TModel, TViewModel> Create<TModel, TViewModel>(string ruleSystem);
  }
}
