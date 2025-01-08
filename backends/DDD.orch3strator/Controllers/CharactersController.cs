using DDD.Common.Extensions;
using DDD.orch3strator.Strategies;
using DDD.orch3strator.Strategies.Characters;
using DDD.orch3strator.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class CharactersController : ControllerBase
  {
    private readonly StrategyFactory _stratFactory;

    public CharactersController(IServiceProvider serviceProvider)
    {
      _stratFactory = new StrategyFactory(serviceProvider);
    }

    [HttpGet]
    public async Task<IEnumerable<CharacterBaseViewModel>> Get([FromRoute] string ruleSystem)
    {
      CharacterBaseStrategy strat = _stratFactory.Create<CharacterBaseStrategy>(ruleSystem);
      return await strat.SearchCharacters(Request.QueryString.Value ?? "", User.SubjectId());
    }
  }
}
