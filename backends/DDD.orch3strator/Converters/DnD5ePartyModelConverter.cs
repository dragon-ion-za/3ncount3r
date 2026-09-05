using DDD.orch3strator.Models.PartyService;
using DDD.orch3strator.ViewModels.DnD5e;

namespace DDD.orch3strator.Converters
{
  public class DnD5ePartyModelConverter : IModelConverter<PartyModel, PartyViewModel>
  {
    public PartyViewModel Convert(PartyModel model)
    {
      return new PartyViewModel()
      {
        Id = model.Id,
        Name = model.Name,
        RuleSystem = model.RuleSystem,
        UserId = model.UserId,
        Characters = BuildCharactersFromModel(model.CharacterIds)
      };
    }

    public PartyModel ConvertReverse(PartyViewModel viewModel)
    {
      return new PartyModel() {
        Id = viewModel.Id,
        Name = viewModel.Name,
        RuleSystem = viewModel.RuleSystem,
        UserId = viewModel.UserId,
        CharacterIds = viewModel.Characters.Select(x => x.Id)
      };
    }

    public IEnumerable<PartyViewModel> Map(IEnumerable<PartyModel> model)
    {
      List<PartyViewModel> list = new List<PartyViewModel>();
      foreach (var party in model)
      {
        list.Add(Convert(party));
      }

      return list;
    }

    private IEnumerable<PartyCharacterViewModel> BuildCharactersFromModel(IEnumerable<string> characterIds)
    {
      List<PartyCharacterViewModel> characters = new List<PartyCharacterViewModel>();

      foreach (string characterId in characterIds)
      {
        characters.Add(new PartyCharacterViewModel() { Id = characterId });
      }

      return characters;
    }
  }
}
