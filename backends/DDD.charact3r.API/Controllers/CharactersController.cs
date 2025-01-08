using AutoMapper;
using DDD.charact3r.API.Models;
using DDD.charact3r.API.ViewModels;
using DDD.Common.Services;
using Microsoft.AspNetCore.Mvc;

namespace DDD.charact3r.API.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class CharactersController : ControllerBase
  {
    private readonly IDataService<CharacterModel> _dataService;
    private readonly IMapper _mapper;

    public CharactersController(IDataService<CharacterModel> dataService, Mapper mapper)
    {
      _dataService = dataService;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<IEnumerable<CharacterViewModel>> Get([FromRoute] string ruleSystem, [FromRoute] string userId)
    {
      IEnumerable<CharacterModel> models = await _dataService.Get(userId, ruleSystem);
      return _mapper.Map<IEnumerable<CharacterViewModel>>(models);
    }

    [HttpPost]
    public async Task<CharacterViewModel> Post([FromRoute] string ruleSystem, [FromRoute] string userId, CharacterViewModel model)
    {
      string id = await _dataService.Insert(model.UserId, ruleSystem, _mapper.Map<CharacterModel>(model));
      CharacterModel viewModel = await _dataService.GetById(model.UserId, ruleSystem, id);
      return _mapper.Map<CharacterViewModel>(viewModel);
    }

    [HttpPut]
    public async Task<CharacterViewModel> Put([FromRoute] string ruleSystem, [FromRoute] string userId, CharacterViewModel model)
    {
      string id = await _dataService.Update(model.UserId, ruleSystem, _mapper.Map<CharacterModel>(model));
      CharacterModel viewModel = await _dataService.GetById(model.UserId, ruleSystem, id);
      return _mapper.Map<CharacterViewModel>(viewModel);
    }
  }
}
