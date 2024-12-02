using DDD.charact3r.API.Models;
using DDD.charact3r.API.ViewModels;

namespace DDD.charact3r.API.Converters
{
  public interface IConverter
  {
    IEnumerable<IViewModel> Map(IEnumerable<CharacterModel> model);
    IViewModel Convert(CharacterModel model);
    CharacterModel ConvertReverse(IViewModel viewModel);
  }
}
