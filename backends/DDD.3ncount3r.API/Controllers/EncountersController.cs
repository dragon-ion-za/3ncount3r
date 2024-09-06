using AutoMapper;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.Services;
using DDD._3ncount3r.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DDD._3ncount3r.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EncountersController : ControllerBase
  {
    private readonly IDataService<EncounterModel> _dataService;
    private readonly IMapper _mapper;

    public EncountersController(IDataService<EncounterModel> dataService, IMapper mapper)
    {
      _dataService = dataService;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<IEnumerable<EncounterViewModel>> Get()
    {
      IEnumerable<EncounterModel> models = await _dataService.Get();
      return _mapper.Map<IEnumerable<EncounterViewModel>>(models);
    }
  }
}
