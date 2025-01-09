using DDD.orch3strator.ViewModels;

namespace DDD.orch3strator.Strategies.Characters
{
  public abstract class CharacterBaseStrategy: StrategyBase
  {
    public abstract Task<IEnumerable<CharacterBaseViewModel>> SearchCharactersByName(string userId, string characterName);
  }
}
