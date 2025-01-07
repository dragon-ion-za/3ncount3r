using DDD.orch3strator.Strategies;
using DDD.orch3strator.Strategies.Creatures;
using DDD.orch3strator.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  [AllowAnonymous]
  public class CreaturesController : ControllerBase
  {
    private readonly StrategyFactory _stratFactory;

    public CreaturesController(IServiceProvider serviceProvider)
    {
      _stratFactory = new StrategyFactory(serviceProvider);
    }

    [HttpGet]
    public async Task<IEnumerable<CreatureBaseViewModel>> Get([FromRoute] string ruleSystem)
    {
      CreatureBaseStrategy strat = _stratFactory.Create<CreatureBaseStrategy>(ruleSystem);
      return await strat.SearchCreatures(Request.QueryString.Value ?? "");
    }
  }
}
