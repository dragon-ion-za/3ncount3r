namespace DDD.orch3strator.Converters
{
  public class ModelConverterFactory : IModelConverterFactory
  {
    private IServiceProvider _serviceProvider;

    public ModelConverterFactory(IServiceProvider serviceProvider)
    {
      _serviceProvider = serviceProvider;
    }

    public IModelConverter<TModel> Create<TModel>(string ruleSystem)
    {
      return _serviceProvider.GetKeyedService<IModelConverter<TModel>>(ruleSystem);
    }
  }
}
