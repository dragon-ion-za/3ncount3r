using DDD.Byoapi.Integrations.Models;
using DDD.Byoapi.Integrations.Services;
using DDD.Common.Extensions;
using DDD.orch3strator.Converters;
using DDD.orch3strator.Models.EncounterService;
using DDD.orch3strator.Services;
using DDD.orch3strator.ViewModels.DnD5e;
using Microsoft.AspNetCore.Mvc;

namespace DDD.orch3strator.Controllers
{
  [Route("api/[controller]/{ruleSystem}")]
  [ApiController]
  public class EncountersController : ControllerBase
  {
    private readonly DataApiBaseService _encounterService;
    private readonly IByoapiService _dataService;
    private readonly IModelConverterFactory _modelConverterFactory;

    public EncountersController(DataApiBaseService encounterService, IByoapiService byoapiService, IModelConverterFactory modelConverterFactory)
    {
      _encounterService = encounterService;
      _modelConverterFactory = modelConverterFactory;
      _dataService = byoapiService;
    }

    [HttpGet]
    public async Task<IEnumerable<EncounterViewModel>> Get([FromRoute] string ruleSystem, [FromQuery] bool includeCreatures = false)
    {
      IEnumerable<EncounterModel> models = await _encounterService.GetList<EncounterModel>(ruleSystem, User.SubjectId());

      List<CreatureModel> creatures = new List<CreatureModel>();

      if (includeCreatures)
      {
        foreach (var byoapiGroup in models.SelectMany(x => x.Creatures).GroupBy(x => x.ByoapiId).Select((x) => new { ByoapiId = x.Key, CreatureNames = x.Select(y => y.Name) }))
        {
          List<string> creatureQueries = new List<string>();

          foreach (var creatureName in byoapiGroup.CreatureNames)
          {
            creatureQueries.Add($"name eq '{creatureName}'");
          }

          creatures.AddRange(await _dataService.SearchForCreatures(ruleSystem, byoapiGroup.ByoapiId, string.Join(" or ", creatureQueries)));
        }
      }

      IModelConverter<EncounterModel, EncounterViewModel> modelConverter = _modelConverterFactory.Create<EncounterModel, EncounterViewModel>(ruleSystem);

      return modelConverter.Map(models);
    }

    [HttpGet("{id}")]
    public async Task<EncounterViewModel> GetById([FromRoute] string ruleSystem, [FromRoute] string id)
    {
      EncounterModel model = await _encounterService.GetById<EncounterModel>(ruleSystem, User.SubjectId(), id);

      List<CreatureModel> creatures = new List<CreatureModel>();

      foreach (var byoapiGroup in model.Creatures.GroupBy(x => x.ByoapiId).Select((x) => new { ByoapiId = x.Key, CreatureNames = x.Select(y => y.Name) }))
      {
        List<string> creatureQueries = new List<string>();

        foreach (var creatureName in byoapiGroup.CreatureNames)
        {
          creatureQueries.Add($"name eq '{creatureName}'");
        }

        creatures.AddRange(await _dataService.SearchForCreatures(ruleSystem, byoapiGroup.ByoapiId, string.Join(" or ", creatureQueries)));
      }

      IModelConverter<EncounterModel, EncounterViewModel> modelConverter = _modelConverterFactory.Create<EncounterModel, EncounterViewModel>(ruleSystem);

      EncounterViewModel viewModel = modelConverter.Convert(model);

      // Enrich the viemodel creatures with the creature data from the BYOAPIs
      IModelConverter<CreatureModel, CreatureViewModel> creatureConverter = _modelConverterFactory.Create<CreatureModel, CreatureViewModel>(ruleSystem);
      viewModel.Creatures.ToList().ForEach(x =>
      {
        CreatureViewModel creature = creatureConverter.Convert(creatures.First(y => y.Name == x.Name && y.Source == x.SourceId && y.ByoapiId == x.ByoapiId));
        EnrichEncounterCreature(x, creature);
      });

      return viewModel;
    }

    [HttpPost]
    public async Task<EncounterViewModel> Post([FromRoute] string ruleSystem, EncounterViewModel viewModel)
    {
      IModelConverter<EncounterModel, EncounterViewModel> modelConverter = _modelConverterFactory.Create<EncounterModel, EncounterViewModel>(ruleSystem);

      EncounterModel model = modelConverter.ConvertReverse(viewModel);
      model.UserId = User.SubjectId();
      model = await _encounterService.Insert<EncounterModel>(ruleSystem, model);

      return modelConverter.Convert(model);
    }

    [HttpPut]
    public async Task<EncounterViewModel> Put([FromRoute] string ruleSystem, EncounterViewModel viewModel)
    {
      IModelConverter<EncounterModel, EncounterViewModel> modelConverter = _modelConverterFactory.Create<EncounterModel, EncounterViewModel>(ruleSystem);

      EncounterModel model = modelConverter.ConvertReverse(viewModel);
      model.UserId = User.SubjectId();
      model = await _encounterService.Update<EncounterModel>(ruleSystem, model);

      return modelConverter.Convert(model);
    }

    private void EnrichEncounterCreature(EncounterCreatureViewModel creatureViewModel, CreatureViewModel creature)
    {
      // Attributes
      creatureViewModel.AttributeCha = creature.AttributeCha;
      creatureViewModel.AttributeCon = creature.AttributeCon;
      creatureViewModel.AttributeDex = creature.AttributeDex;
      creatureViewModel.AttributeInt = creature.AttributeInt;
      creatureViewModel.AttributeStr = creature.AttributeStr;
      creatureViewModel.AttributeWis = creature.AttributeWis;

      // Hitpoints
      creatureViewModel.HitpointAverage = creature.HitpointAverage;
      creatureViewModel.HitpointFormula = creature.HitpointFormula;

      // Senses
      creatureViewModel.PassivePerception = creature.PassivePerception;
      creatureViewModel.Senses = creature.Senses;

      // Actions
      creatureViewModel.ActionGroups = creature.ActionGroups;

      // Proficiencies
      creatureViewModel.SavingThrows = creature.SavingThrows;
      creatureViewModel.SkillModifiers = creature.SkillModifiers;

      // Combat Stats
      creatureViewModel.ArmourClass = creature.ArmourClass;
      creatureViewModel.ChallengeRating = creature.ChallengeRating;
      creatureViewModel.Immunities = creature.Immunities;
      creatureViewModel.Resistances = creature.Resistances;

      // Languages
      creatureViewModel.Languages = creature.Languages;

      // Movement speeds
      creatureViewModel.FlyingSpeed = creature.FlyingSpeed;
      creatureViewModel.WalkingSpeed = creature.WalkingSpeed;
      creatureViewModel.ClimbingSpeed = creature.ClimbingSpeed;
      creatureViewModel.SwimmingSpeed = creature.SwimmingSpeed;
      creatureViewModel.BurrowingSpeed = creature.BurrowingSpeed;

      // Misc stuff
      creatureViewModel.Alignment = creature.Alignment;
      creatureViewModel.Size = creature.Size;
      creatureViewModel.Type = creature.Type;

    }
  }
}
