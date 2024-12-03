using DDD.Byoapi.Integrations.Models;
using DDD.Byoapi.Integrations.Services;
using DDD.orch3strator.Converters;
using DDD.orch3strator.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class CreaturesController : ControllerBase
  {
    private readonly IByoapiService _dataService;
    private readonly IModelConverterFactory _modelConverterFactory;

    public CreaturesController(IByoapiService dataService, IModelConverterFactory modelConverterFactory)
    {
      _dataService = dataService;
      _modelConverterFactory = modelConverterFactory;
    }

    [HttpGet]
    public async Task<IEnumerable<IViewModel>> Get([FromRoute] string ruleSystem)
    {
      IEnumerable<CreatureModel> models = await _dataService.SearchForCreatures(Request.QueryString.Value ?? "");

      IModelConverter<CreatureModel> modelConverter = _modelConverterFactory.Create<CreatureModel>(ruleSystem);

      return modelConverter.Map(models);
    }
  }
}
