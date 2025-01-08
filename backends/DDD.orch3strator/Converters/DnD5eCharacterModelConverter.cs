using DDD.orch3strator.Models.CharacterService;
using DDD.orch3strator.ViewModels.DnD5e;

namespace DDD.orch3strator.Converters
{
  public class DnD5eCharacterModelConverter : IModelConverter<CharacterModel, CharacterViewModel>
  {
    public CharacterViewModel Convert(CharacterModel model)
    {
      throw new NotImplementedException();
    }

    public CharacterModel ConvertReverse(CharacterViewModel viewModel)
    {
      throw new NotImplementedException();
    }

    public IEnumerable<CharacterViewModel> Map(IEnumerable<CharacterModel> model)
    {
      throw new NotImplementedException();
    }
  }
}
