using DDD.Byoapi.Integrations.Models;
using DDD.Byoapi.Integrations.Services;
using DDD.charact3r.API.Models;
using DDD.charact3r.API.ViewModels;

namespace DDD.charact3r.API.Converters
{
  public class DnD5eModelConverter : IConverter
  {
    private IByoapiService _service;

    public DnD5eModelConverter(IByoapiService service)
    {
        _service = service;
    }

    public IViewModel Convert(CharacterModel model)
    {
      DnD5eViewModel viewModel = new DnD5eViewModel();

      viewModel.Id = model.Id.ToString();
      viewModel.Name = model.Name;
      viewModel.Size = model.Size;
      viewModel.Attributes = model.Attributes;
      viewModel.Languages = model.Languages;
      viewModel.ActionGroups = new List<ActionGroupViewModel>() { new ActionGroupViewModel("Traits"), new ActionGroupViewModel("Actions"),
        new ActionGroupViewModel("BonusActions"), new ActionGroupViewModel("Reactions"), new ActionGroupViewModel("LegendaryActions") };

      // Get Class Details
      foreach (var characterClass in model.Classes)
      {
        ClassDetailsModel classDetails = _service.GetClass("", characterClass.Id, characterClass.ByoapiId);

      }

      return viewModel;
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
