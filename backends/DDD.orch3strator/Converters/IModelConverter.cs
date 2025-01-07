namespace DDD.orch3strator.Converters
{
  public interface IModelConverter<TModel, TViewModel>
  {
    IEnumerable<TViewModel> Map(IEnumerable<TModel> model);
    TViewModel Convert(TModel model);
    TModel ConvertReverse(TViewModel viewModel);
  }
}
