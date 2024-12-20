using DDD.Byoapi.Integrations.Models;
using DDD.Byoapi.Integrations.Services;
using DDD.Common.Extensions;
using DDD.orch3strator.Converters;
using DDD.orch3strator.Models.EncounterService;
using DDD.orch3strator.Services;
using DDD.orch3strator.ViewModels.DnD5e;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class EncountersController : ControllerBase
  {
    private readonly DataApiBaseService _encounterService;
    private readonly IByoapiService _dataService;
    private readonly IModelConverterFactory _modelConverterFactory;

    public EncountersController(DataApiBaseService encounterService, IByoapiService byoapiService, IModelConverterFactory modelConverterFactory)
    {
      _encounterService = encounterService;
      _modelConverterFactory = modelConverterFactory;
      _dataService = byoapiService;
    }

    [HttpGet]
    public async Task<IEnumerable<EncounterViewModel>> Get([FromRoute] string ruleSystem)
    {
      IEnumerable<EncounterModel> models = await _encounterService.GetList<EncounterModel>(ruleSystem, User.SubjectId());

      List<CreatureModel> creatures = new List<CreatureModel>();

      foreach (var byoapiGroup in models.SelectMany(x => x.Creatures).GroupBy(x => x.ByoapiId).Select((x) => new { ByoapiId = x.Key, CreatureNames = x.Select(y => y.Name) }))
      {
        List<string> creatureQueries = new List<string>();

        foreach (var creatureName in byoapiGroup.CreatureNames)
        {
          creatureQueries.Add($"name eq {creatureName}");
        }

        creatures.AddRange(await _dataService.SearchForCreatures(ruleSystem, byoapiGroup.ByoapiId, string.Join(" or ", creatureQueries)));
      }

      IModelConverter<EncounterModel, EncounterViewModel> modelConverter = _modelConverterFactory.Create<EncounterModel, EncounterViewModel>(ruleSystem);

      return modelConverter.Map(models);
    }

    [HttpPost]
    public async Task<EncounterViewModel> Post([FromRoute] string ruleSystem, EncounterViewModel viewModel)
    {
      IModelConverter<EncounterModel, EncounterViewModel> modelConverter = _modelConverterFactory.Create<EncounterModel, EncounterViewModel>(ruleSystem);

      EncounterModel model = modelConverter.ConvertReverse(viewModel);
      model.UserId = User.SubjectId();
      model = await _encounterService.Insert<EncounterModel>(ruleSystem, model);

      return modelConverter.Convert(model);
    }
  }
}
