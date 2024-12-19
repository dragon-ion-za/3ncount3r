using DDD.orch3strator.Models.EncounterService;
using DDD.orch3strator.ViewModels;

namespace DDD.orch3strator.Converters
{
  public class Dnd5eEncounterModelConverter : IModelConverter<EncounterModel>
  {
    public IViewModel Convert(EncounterModel model)
    {
      throw new NotImplementedException();
    }

    public EncounterModel ConvertReverse(IViewModel viewModel)
    {
      throw new NotImplementedException();
    }

    public IEnumerable<IViewModel> Map(IEnumerable<EncounterModel> model)
    {
      throw new NotImplementedException();
    }
  }
}
