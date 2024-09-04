using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.Services;
using DDD._3ncount3r.API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DDD._3ncount3r.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class EncountersController : ControllerBase
  {
    private readonly IDataService<EncounterModel> _dataService;

    public EncountersController(IDataService<EncounterModel> dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public async Task<IEnumerable<EncounterViewModel>> Get()
    {
      IEnumerable<EncounterModel> models = await _dataService.Get();
      return models.Select((model) => new EncounterViewModel() { Id = model.Id.ToString(), Name = model.Name } );
    }
  }
}
