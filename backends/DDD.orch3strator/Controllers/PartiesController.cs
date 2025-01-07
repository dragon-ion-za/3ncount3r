using DDD.Common.Extensions;
using DDD.orch3strator.Strategies;
using DDD.orch3strator.Strategies.Parties;
using DDD.orch3strator.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class PartiesController : ControllerBase
  {
    private readonly StrategyFactory _stratFactory;

    public PartiesController(IServiceProvider serviceProvider)
    {
      _stratFactory = new StrategyFactory(serviceProvider);
    }

    [HttpGet]
    public async Task<IEnumerable<PartyBaseViewModel>> Get([FromRoute] string ruleSystem, [FromQuery] bool includeCreatures = false)
    {
      PartyBaseStrategy strat = _stratFactory.Create<PartyBaseStrategy>(ruleSystem);
      return await strat.GetParties(User.SubjectId(), includeCreatures);
    }

    [HttpGet("{id}")]
    public async Task<PartyBaseViewModel> GetById([FromRoute] string ruleSystem, [FromRoute] string id)
    {
      PartyBaseStrategy strat = _stratFactory.Create<PartyBaseStrategy>(ruleSystem);
      return await strat.GetPartyById(User.SubjectId(), id);
    }

    [HttpPost]
    public async Task<PartyBaseViewModel> Post([FromRoute] string ruleSystem, JsonObject viewModel)
    {
      PartyBaseStrategy strat = _stratFactory.Create<PartyBaseStrategy>(ruleSystem);
      return await strat.SaveParty(User.SubjectId(), viewModel);
    }

    [HttpPut]
    public async Task<PartyBaseViewModel> Put([FromRoute] string ruleSystem, JsonObject viewModel)
    {
      PartyBaseStrategy strat = _stratFactory.Create<PartyBaseStrategy>(ruleSystem);
      return await strat.UpdateParty(User.SubjectId(), viewModel);
    }
  }
}
