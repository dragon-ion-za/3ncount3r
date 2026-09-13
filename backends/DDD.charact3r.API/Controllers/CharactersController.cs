using AutoMapper;
using DDD.charact3r.API.Models;
using DDD.Common.Contracts.Character;
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

    public CharactersController(IDataService<CharacterModel> dataService, IMapper mapper)
    {
      _dataService = dataService;
      _mapper = mapper;
    }

    [HttpGet("{userId}")]
    public async Task<IEnumerable<CharacterContract>> Get([FromRoute] string ruleSystem, [FromRoute] string userId)
    {
      IEnumerable<CharacterModel> models = await _dataService.Get(userId, ruleSystem);
      return _mapper.Map<IEnumerable<CharacterContract>>(models);
    }

    [HttpGet("{userId}/{id}")]
    public async Task<CharacterContract> GetById([FromRoute] string ruleSystem, [FromRoute] string userId, [FromRoute] string id)
    {
      CharacterModel model = await _dataService.GetById(userId, ruleSystem, id);
      return _mapper.Map<CharacterContract>(model);
    }

    [HttpPost]
    public async Task<CharacterContract> Post([FromRoute] string ruleSystem, CharacterContract model)
    {
      string id = await _dataService.Insert(model.UserId, ruleSystem, _mapper.Map<CharacterModel>(model));
      CharacterModel viewModel = await _dataService.GetById(model.UserId, ruleSystem, id);
      return _mapper.Map<CharacterContract>(viewModel);
    }

    [HttpPut]
    public async Task<CharacterContract> Put([FromRoute] string ruleSystem, CharacterContract model)
    {
      string id = await _dataService.Update(model.UserId, ruleSystem, _mapper.Map<CharacterModel>(model));
      CharacterModel viewModel = await _dataService.GetById(model.UserId, ruleSystem, id);
      return _mapper.Map<CharacterContract>(viewModel);
    }
  }
}
