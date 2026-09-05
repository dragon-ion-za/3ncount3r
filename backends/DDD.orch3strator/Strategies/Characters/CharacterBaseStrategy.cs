using DDD.orch3strator.ViewModels;
using System.Text.Json.Nodes;

namespace DDD.orch3strator.Strategies.Characters
{
  public abstract class CharacterBaseStrategy: StrategyBase
  {
    public abstract Task<IEnumerable<CharacterBaseViewModel>> SearchCharactersByName(string userId, string characterName);
    public abstract Task<CharacterBaseViewModel> GetCharacterById(string userId, string id);
    public abstract Task<CharacterBaseViewModel> SaveCharacter(string userId, JsonObject viewModel);
    public abstract Task<CharacterBaseViewModel> UpdateCharacter(string userId, JsonObject viewModel);
  }
}
