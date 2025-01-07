using DDD.Common.Extensions;
using DDD.orch3strator.Strategies;
using DDD.orch3strator.Strategies.Encounters;
using DDD.orch3strator.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class EncountersController : ControllerBase
  {
    private readonly StrategyFactory _stratFactory;

    public EncountersController(IServiceProvider serviceProvider)
    {
      _stratFactory = new StrategyFactory(serviceProvider);
    }

    [HttpGet]
    public async Task<IEnumerable<EncounterBaseViewModel>> Get([FromRoute] string ruleSystem, [FromQuery] bool includeCreatures = false)
    {
      EncounterBaseStrategy strat = _stratFactory.Create<EncounterBaseStrategy>(ruleSystem);
      return await strat.GetEncounters(User.SubjectId(), includeCreatures);
    }

    [HttpGet("{id}")]
    public async Task<EncounterBaseViewModel> GetById([FromRoute] string ruleSystem, [FromRoute] string id)
    {
      EncounterBaseStrategy strat = _stratFactory.Create<EncounterBaseStrategy>(ruleSystem);
      return await strat.GetEncounterById(User.SubjectId(), id);
    }

    [HttpPost]
    public async Task<EncounterBaseViewModel> Post([FromRoute] string ruleSystem, JsonObject viewModel)
    {
      EncounterBaseStrategy strat = _stratFactory.Create<EncounterBaseStrategy>(ruleSystem);
      return await strat.SaveEncounter(User.SubjectId(), viewModel);
    }

    [HttpPut]
    public async Task<EncounterBaseViewModel> Put([FromRoute] string ruleSystem, JsonObject viewModel)
    {
      EncounterBaseStrategy strat = _stratFactory.Create<EncounterBaseStrategy>(ruleSystem);
      return await strat.UpdateEncounter(User.SubjectId(), viewModel);
    }
  }
}
