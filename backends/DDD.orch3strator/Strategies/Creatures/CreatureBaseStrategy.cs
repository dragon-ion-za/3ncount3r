using DDD.orch3strator.ViewModels;

namespace DDD.orch3strator.Strategies.Creatures
{
  public abstract class CreatureBaseStrategy : StrategyBase
  {
    public abstract Task<IEnumerable<CreatureBaseViewModel>> SearchCreatures(string searchQuery);
  }
}
