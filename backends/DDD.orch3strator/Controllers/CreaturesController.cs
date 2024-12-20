using DDD.Byoapi.Integrations.Models;
using DDD.Byoapi.Integrations.Services;
using DDD.orch3strator.Converters;
using DDD.orch3strator.ViewModels.DnD5e;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  [AllowAnonymous]
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
    public async Task<IEnumerable<CreatureViewModel>> Get([FromRoute] string ruleSystem)
    {
      IEnumerable<CreatureModel> models = await _dataService.SearchForCreatures(ruleSystem, Request.QueryString.Value ?? "");

      IModelConverter<CreatureModel, CreatureViewModel> modelConverter = _modelConverterFactory.Create<CreatureModel, CreatureViewModel>(ruleSystem);

      return modelConverter.Map(models);
    }
  }
}
