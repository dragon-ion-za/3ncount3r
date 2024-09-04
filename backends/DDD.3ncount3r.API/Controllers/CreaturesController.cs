using DDD._3ncount3r.API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DDD._3ncount3r.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class CreaturesController : ControllerBase
  {
    [HttpGet]
    public CreatureViewModel[] Get()
    {
      return [];
    }
  }
}
