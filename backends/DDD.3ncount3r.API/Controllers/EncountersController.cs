using AutoMapper;
using DDD._3ncount3r.API.Extensions;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.ViewModels;
using DDD.Common.Services;
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
      IEnumerable<EncounterModel> models = await _dataService.Get(User.SubjectId());
      return _mapper.Map<IEnumerable<EncounterViewModel>>(models);
    }

    [HttpPost]
    public async Task<string> Post(EncounterViewModel model)
    {
      return await _dataService.Insert(User.SubjectId(), _mapper.Map<EncounterModel>(model));
    }

    [HttpPut]
    public async Task<string> Put(EncounterViewModel model)
    {
      return await _dataService.Update(User.SubjectId(), _mapper.Map<EncounterModel>(model));
    }
  }
}
