using AutoMapper;
using DDD.charact3r.API.Models;
using DDD.charact3r.API.ViewModels;
using DDD.Common.Extensions;
using DDD.Common.Services;
using Microsoft.AspNetCore.Mvc;

namespace DDD.charact3r.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CharactersController : ControllerBase
  {
    private readonly IDataService<CharacterModel> _dataService;
    private readonly IMapper _mapper;

    public CharactersController(IDataService<CharacterModel> dataService, IMapper mapper)
    {
      _dataService = dataService;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<IEnumerable<CharacterViewModel>> Get()
    {
      IEnumerable<CharacterModel> models = await _dataService.Get(User.SubjectId());
      return _mapper.Map<IEnumerable<CharacterViewModel>>(models);
    }

    [HttpPost]
    public async Task<string> Post(CharacterViewModel model)
    {
      return await _dataService.Insert(User.SubjectId(), _mapper.Map<CharacterModel>(model));
    }

    [HttpPut]
    public async Task<string> Put(CharacterViewModel model)
    {
      return await _dataService.Update(User.SubjectId(), _mapper.Map<CharacterModel>(model));
    }
  }
}
