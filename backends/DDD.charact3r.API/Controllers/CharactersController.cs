using DDD.charact3r.API.Converters;
using DDD.charact3r.API.Models;
using DDD.charact3r.API.ViewModels;
using DDD.Common.Extensions;
using DDD.Common.Services;
using Microsoft.AspNetCore.Mvc;

namespace DDD.charact3r.API.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class CharactersController : ControllerBase
  {
    private readonly IDataService<CharacterModel> _dataService;
    private readonly IModelConverterFactory _modelConverterFactory;

    public CharactersController(IDataService<CharacterModel> dataService, IModelConverterFactory modelConverterFactory)
    {
      _dataService = dataService;
      _modelConverterFactory = modelConverterFactory;
    }

    [HttpGet]
    public async Task<IEnumerable<IViewModel>> Get([FromRoute]string ruleSystem)
    {
      IEnumerable<CharacterModel> models = await _dataService.Get(User.SubjectId());

      IConverter modelConverter = _modelConverterFactory.Create(ruleSystem);

      return modelConverter.Map(models);
    }

    [HttpPost]
    public async Task<string> Post([FromRoute] string ruleSystem, IViewModel model)
    {
      IConverter modelConverter = _modelConverterFactory.Create(ruleSystem);
      return await _dataService.Insert(User.SubjectId(), modelConverter.ConvertReverse(model));
    }

    [HttpPut]
    public async Task<string> Put([FromRoute] string ruleSystem, IViewModel model)
    {
      IConverter modelConverter = _modelConverterFactory.Create(ruleSystem);
      return await _dataService.Update(User.SubjectId(), modelConverter.ConvertReverse(model));
    }
  }
}
