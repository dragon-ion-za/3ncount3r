namespace DDD.orch3strator.Strategies
{
  public class StrategyFactory
  {
    private IServiceProvider _serviceProvider;

    public StrategyFactory(IServiceProvider serviceProvider)
    {
      _serviceProvider = serviceProvider;
    }

    public TStrategy Create<TStrategy>(string ruleSystem)
    {
      return _serviceProvider.GetKeyedService<TStrategy>(ruleSystem);
    }
  }
}
