using AutoMapper;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.Services;
using DDD._3ncount3r.API.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DDD._3ncount3r.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CreaturesController : ControllerBase
  {
    private readonly IByoapiService _dataService;
    private readonly IMapper _mapper;

    public CreaturesController(IByoapiService dataService, IMapper mapper)
    {
      _dataService = dataService;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<IEnumerable<CreatureViewModel>> Get()
    {
      IEnumerable<CreatureModel> models = await _dataService.SearchForCreatures(Request.QueryString.Value ?? "");
      return _mapper.Map<IEnumerable<CreatureViewModel>>(models);
    }
  }
}
