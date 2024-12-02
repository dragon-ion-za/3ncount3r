using DDD.charact3r.API.Models;
using DDD.charact3r.API.ViewModels;

namespace DDD.charact3r.API.Converters
{
  public class DnD5eModelConverter : IConverter
  {
    public IViewModel Convert(CharacterModel model)
    {
      throw new NotImplementedException();
    }

    public CharacterModel ConvertReverse(IViewModel viewModel)
    {
      throw new NotImplementedException();
    }

    public IEnumerable<IViewModel> Map(IEnumerable<CharacterModel> model)
    {
      throw new NotImplementedException();
    }
  }
}
