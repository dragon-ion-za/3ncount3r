using DDD.Byoapi.Integrations.Services;
using DDD.orch3strator.Converters;
using DDD.orch3strator.Models.CharacterService;
using DDD.orch3strator.Services;
using DDD.orch3strator.ViewModels;
using DDD.orch3strator.ViewModels.DnD5e;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace DDD.orch3strator.Strategies.Characters
{
  public class DnD5eCharacterStrategy : CharacterBaseStrategy
  {
    protected override string RuleSystem { get { return "dnd5e"; } }

    private readonly DataApiBaseService<CharacterModel> _characterService;
    private readonly IByoapiService _dataService;

    public DnD5eCharacterStrategy(DataApiBaseService<CharacterModel> characterService, IByoapiService byoapiService)
    {
      _characterService = characterService;
      _dataService = byoapiService;
    }

    public override async Task<IEnumerable<CharacterBaseViewModel>> SearchCharactersByName(string userId, string characterName)
    {
      // This call and post in-memory filtering is really shit, but it will do for now.
      // In the future, this should change to OData. For now, load should be minimal (I really don't see a user having
      // millions of characters but stranger things have happened)
      IEnumerable<CharacterModel> models = await _characterService.GetList(RuleSystem, userId);
      models = models.Where(x => x.Name.IndexOf(characterName, StringComparison.OrdinalIgnoreCase) >= 0);

      DnD5eCharacterModelConverter modelConverter = new DnD5eCharacterModelConverter();

      return modelConverter.Map(models);
    }

    public override Task<CharacterBaseViewModel> GetCharacterById(string userId, string id)
    {
      throw new NotImplementedException();
    }

    public override async Task<CharacterBaseViewModel> SaveCharacter(string userId, JsonObject viewModel)
    {
      DnD5eCharacterModelConverter modelConverter = new DnD5eCharacterModelConverter();

      CharacterModel model = modelConverter.ConvertReverse(viewModel.Deserialize<CharacterViewModel>());
      model.UserId = userId;
      model = await _characterService.Insert(RuleSystem, model);

      return modelConverter.Convert(model);
    }

    public override async Task<CharacterBaseViewModel> UpdateCharacter(string userId, JsonObject viewModel)
    {
      DnD5eCharacterModelConverter modelConverter = new DnD5eCharacterModelConverter();

      CharacterModel model = modelConverter.ConvertReverse(viewModel.Deserialize<CharacterViewModel>());
      model.UserId = userId;
      model = await _characterService.Update(RuleSystem, model);

      return modelConverter.Convert(model);
    }
  }
}
