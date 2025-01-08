using DDD.Byoapi.Integrations.Services;
using DDD.orch3strator.Converters;
using DDD.orch3strator.Models.CharacterService;
using DDD.orch3strator.Services;
using DDD.orch3strator.ViewModels;

namespace DDD.orch3strator.Strategies.Characters
{
  public class DnD5eCharacterStrategy : CharacterBaseStrategy
  {
    protected override string RuleSystem { get { return "dnd5e"; } }

    private readonly DataApiBaseService<CharacterModel> _characterService;
    private readonly IByoapiService _dataService;

    public DnD5eCharacterStrategy(DataApiBaseService<CharacterModel> partyService, IByoapiService byoapiService)
    {
      _characterService = partyService;
      _dataService = byoapiService;
    }

    public override async Task<IEnumerable<CharacterBaseViewModel>> SearchCharacters(string userId, string searchQuery)
    {
      IEnumerable<CharacterModel> models = await _characterService.GetList(RuleSystem, userId);

      DnD5eCharacterModelConverter modelConverter = new DnD5eCharacterModelConverter();

      return modelConverter.Map(models);
    }
  }
}
