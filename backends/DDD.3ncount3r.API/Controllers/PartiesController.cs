using AutoMapper;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.ViewModels;
using DDD.Common.Services;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace DDD._3ncount3r.API.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class PartiesController : ControllerBase
  {
    private readonly IDataService<PartyModel> _dataService;
    private readonly IMapper _mapper;
    private readonly IValidator<PartyViewModel> _validator;

    public PartiesController(IValidator<PartyViewModel> validator, IDataService<PartyModel> dataService, IMapper mapper)
    {
      _dataService = dataService;
      _mapper = mapper;
      _validator = validator;
    }

    [HttpGet("{userId}")]
    public async Task<IEnumerable<PartyViewModel>> Get([FromRoute] string ruleSystem, [FromRoute] string userId)
    {
      IEnumerable<PartyModel> models = await _dataService.Get(userId, ruleSystem);
      return _mapper.Map<IEnumerable<PartyViewModel>>(models);
    }

    [HttpGet("{userId}/{id}")]
    public async Task<PartyViewModel> GetById([FromRoute] string ruleSystem, [FromRoute] string userId, [FromRoute] string id)
    {
      PartyModel model = await _dataService.GetById(userId, ruleSystem, id);
      return _mapper.Map<PartyViewModel>(model);
    }

    [HttpPost()]
    public async Task<PartyViewModel> Post([FromRoute] string ruleSystem, PartyViewModel model)
    {
      ValidationResult result = _validator.Validate(model);

      if (!result.IsValid)
      {
        throw new ValidationException(result.ToString());
      }

      string id = await _dataService.Insert(model.UserId, ruleSystem, _mapper.Map<PartyModel>(model));
      PartyModel viewModel = await _dataService.GetById(model.UserId, ruleSystem, id);
      return _mapper.Map<PartyViewModel>(viewModel);
    }

    [HttpPut]
    public async Task<PartyViewModel> Put([FromRoute] string ruleSystem, PartyViewModel model)
    {
      ValidationResult result = _validator.Validate(model);

      if (!result.IsValid)
      {
        throw new ValidationException(result.ToString());
      }

      string id = await _dataService.Update(model.UserId, ruleSystem, _mapper.Map<PartyModel>(model));
      PartyModel viewModel = await _dataService.GetById(model.UserId, ruleSystem, id);
      return _mapper.Map<PartyViewModel>(viewModel);
    }
  }
}
