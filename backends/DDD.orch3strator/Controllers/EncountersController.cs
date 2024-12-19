using DDD.orch3strator.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class EncountersController : ControllerBase
  {
    [HttpGet]
    public async Task<IEnumerable<IViewModel>> Get()
    {
      return null;
    }
  }
}
