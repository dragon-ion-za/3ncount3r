using DDD.orch3strator.ViewModels;

namespace DDD.orch3strator.Converters
{
  public interface IModelConverter<TModel>
  {
    IEnumerable<IViewModel> Map(IEnumerable<TModel> model);
    IViewModel Convert(TModel model);
    TModel ConvertReverse(IViewModel viewModel);
  }
}
