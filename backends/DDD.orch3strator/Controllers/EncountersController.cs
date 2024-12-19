using DDD.Common.Extensions;
using DDD.orch3strator.Converters;
using DDD.orch3strator.Models.EncounterService;
using DDD.orch3strator.Services;
using DDD.orch3strator.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class EncountersController : ControllerBase
  {
    private DataApiBaseService _encounterService;
    private readonly IModelConverterFactory _modelConverterFactory;

    public EncountersController(DataApiBaseService encounterService, IModelConverterFactory modelConverterFactory)
    {
      _encounterService = encounterService;
      _modelConverterFactory = modelConverterFactory;
    }

    [HttpGet]
    public async Task<IEnumerable<IViewModel>> Get([FromRoute] string ruleSystem)
    {
      IEnumerable<EncounterModel> models = await _encounterService.Get<EncounterModel>(ruleSystem, User.SubjectId());

      IModelConverter<EncounterModel> modelConverter = _modelConverterFactory.Create<EncounterModel>(ruleSystem);

      return modelConverter.Map(models);
    }
  }
}
