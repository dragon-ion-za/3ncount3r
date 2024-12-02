namespace DDD.charact3r.API.Converters
{
  public class ModelConverterFactory : IModelConverterFactory
  {
    private IServiceProvider _serviceProvider;

    public ModelConverterFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public IConverter Create(string ruleSystem)
    {
      return _serviceProvider.GetKeyedService<IConverter>(ruleSystem);
    }
  }
}
