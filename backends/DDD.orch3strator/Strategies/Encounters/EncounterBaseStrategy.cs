using DDD.orch3strator.ViewModels;

namespace DDD.orch3strator.Strategies.Encounters
{
  public abstract class EncounterBaseStrategy: StrategyBase
  {
    public abstract Task<IEnumerable<EncounterBaseViewModel>> GetEncounters(string userId, bool includeCreatures = false);
    public abstract Task<EncounterBaseViewModel> GetEncounterById(string userId, string id);
    public abstract Task<EncounterBaseViewModel> SaveEncounter(string userId, EncounterBaseViewModel viewModel);
    public abstract Task<EncounterBaseViewModel> UpdateEncounter(string userId, EncounterBaseViewModel viewModel);
  }
}
