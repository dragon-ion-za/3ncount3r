using DDD.Byoapi.Integrations.Models;
using DDD.orch3strator.ViewModels;

namespace DDD.orch3strator.Converters
{
  public class DnD5eCreatureModelConverter : IModelConverter<CreatureModel>
  {
    public IViewModel Convert(CreatureModel model)
    {
      throw new NotImplementedException();
    }

    public CreatureModel ConvertReverse(IViewModel viewModel)
    {
      throw new NotImplementedException();
    }

    public IEnumerable<IViewModel> Map(IEnumerable<CreatureModel> model)
    {
      throw new NotImplementedException();
    }
  }
}
