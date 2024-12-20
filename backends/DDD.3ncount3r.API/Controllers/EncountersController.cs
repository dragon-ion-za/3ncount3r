using AutoMapper;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.ViewModels;
using DDD.Common.Services;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace DDD._3ncount3r.API.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class EncountersController : ControllerBase
  {
    private readonly IDataService<EncounterModel> _dataService;
    private readonly IMapper _mapper;
    private readonly IValidator<EncounterViewModel> _validator;

    public EncountersController(IValidator<EncounterViewModel> validator, IDataService<EncounterModel> dataService, IMapper mapper)
    {
      _dataService = dataService;
      _mapper = mapper;
      _validator = validator;
    }

    [HttpGet("{userId}")]
    public async Task<IEnumerable<EncounterViewModel>> Get([FromRoute]string ruleSystem, [FromRoute]string userId)
    {
      IEnumerable<EncounterModel> models = await _dataService.Get(userId);
      return _mapper.Map<IEnumerable<EncounterViewModel>>(models);
    }

    [HttpPost()]
    public async Task<EncounterViewModel> Post([FromRoute] string ruleSystem, EncounterViewModel model)
    {
      ValidationResult result = _validator.Validate(model);

      if (!result.IsValid)
      {
        throw new ValidationException(result.ToString());
      }

      string id = await _dataService.Insert(model.UserId, _mapper.Map<EncounterModel>(model));
      EncounterModel viewModel = await _dataService.GetById(model.UserId, id);
      return _mapper.Map<EncounterViewModel>(viewModel);
    }

    [HttpPut("{userId}")]
    public async Task<string> Put([FromRoute] string ruleSystem, [FromRoute] string userId, EncounterViewModel model)
    {
      return await _dataService.Update(userId, _mapper.Map<EncounterModel>(model));
    }
  }
}
