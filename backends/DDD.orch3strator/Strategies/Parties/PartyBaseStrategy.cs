using DDD.orch3strator.ViewModels;

namespace DDD.orch3strator.Strategies.Parties
{
  public abstract class PartyBaseStrategy : StrategyBase
  {
    public abstract Task<IEnumerable<PartyBaseViewModel>> GetParties(string userId, bool includeCreatures = false);
    public abstract Task<PartyBaseViewModel> GetPartyById(string userId, string id);
    public abstract Task<PartyBaseViewModel> SaveParty(string userId, PartyBaseViewModel viewModel);
    public abstract Task<PartyBaseViewModel> UpdateParty(string userId, PartyBaseViewModel viewModel);
  }
}
