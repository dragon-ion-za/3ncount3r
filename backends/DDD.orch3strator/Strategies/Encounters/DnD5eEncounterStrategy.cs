using DDD.Byoapi.Integrations.Models;
using DDD.Byoapi.Integrations.Services;
using DDD.orch3strator.Converters;
using DDD.orch3strator.Models.CharacterService;
using DDD.orch3strator.Models.EncounterService;
using DDD.orch3strator.Services;
using DDD.orch3strator.ViewModels;
using DDD.orch3strator.ViewModels.DnD5e;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace DDD.orch3strator.Strategies.Encounters
{
  public class DnD5eEncounterStrategy : EncounterBaseStrategy
  {
    protected override string RuleSystem { get { return "dnd5e"; } }

    private readonly DataApiBaseService<EncounterModel> _encounterService;
    private readonly DataApiBaseService<CharacterModel> _characterService;
    private readonly IByoapiService _dataService;

    public DnD5eEncounterStrategy(DataApiBaseService<EncounterModel> encounterService, DataApiBaseService<CharacterModel> characterService, IByoapiService byoapiService)
    {
      _encounterService = encounterService;
      _characterService = characterService;
      _dataService = byoapiService;
    }

    public override async Task<IEnumerable<EncounterBaseViewModel>> GetEncounters(string userId, bool includeCreatures = false)
    {
      IEnumerable<EncounterModel> models = await _encounterService.GetList(RuleSystem, userId);

      List<CreatureModel> creatures = new List<CreatureModel>();

      if (includeCreatures)
      {
        foreach (var byoapiGroup in models.SelectMany(x => x.Creatures.Where(y => !y.IsPlayerCharacter)).GroupBy(x => x.ByoapiId).Select((x) => new { ByoapiId = x.Key, CreatureNames = x.Select(y => y.Name) }))
        {
          List<string> creatureQueries = new List<string>();

          foreach (var creatureName in byoapiGroup.CreatureNames)
          {
            creatureQueries.Add($"name eq '{creatureName}'");
          }

          creatures.AddRange(await _dataService.SearchForCreatures(RuleSystem, byoapiGroup.ByoapiId, string.Join(" or ", creatureQueries)));
        }
      }

      Dnd5eEncounterModelConverter modelConverter = new Dnd5eEncounterModelConverter();

      return modelConverter.Map(models);
    }

    public override async Task<EncounterBaseViewModel> GetEncounterById(string userId, string id)
    {
      EncounterModel model = await _encounterService.GetById(RuleSystem, userId, id);

      // Get Creatures
      List<CreatureModel> creatures = new List<CreatureModel>();
      foreach (var byoapiGroup in model.Creatures.Where(x => !x.IsPlayerCharacter).GroupBy(x => x.ByoapiId).Select((x) => new { ByoapiId = x.Key, CreatureNames = x.Select(y => y.Name) }))
      {
        List<string> creatureQueries = new List<string>();

        foreach (var creatureName in byoapiGroup.CreatureNames)
        {
          creatureQueries.Add($"name eq '{creatureName}'");
        }

        creatures.AddRange(await _dataService.SearchForCreatures(RuleSystem, byoapiGroup.ByoapiId, string.Join(" or ", creatureQueries)));
      }

      // Get Characters
      List<CharacterModel> characters = new List<CharacterModel>();
      foreach (var characterId in model.Creatures.Where(x => x.IsPlayerCharacter).Select(x => x.Id))
      {
        characters.Add(await _characterService.GetById(RuleSystem, userId, characterId));
      }

      Dnd5eEncounterModelConverter modelConverter = new Dnd5eEncounterModelConverter();
      EncounterViewModel viewModel = modelConverter.Convert(model);

      // Enrich the viemodel creatures with the creature data from the BYOAPIs
      IModelConverter<CreatureModel, CreatureViewModel> creatureConverter = new DnD5eCreatureModelConverter();
      IModelConverter<CharacterModel, CharacterViewModel> characterConverter = new DnD5eCharacterModelConverter();
      viewModel.Creatures.ToList().ForEach(x =>
      {
        if (!x.IsPlayerCharacter)
        {
          CreatureViewModel creature = creatureConverter.Convert(creatures.First(y => y.Name == x.Name && y.Source == x.SourceId && y.ByoapiId == x.ByoapiId));
          EnrichEncounterCreature(x, creature);
        }
        else
        {
          CharacterViewModel character = characterConverter.Convert(characters.First(y => y.Id == x.Id));
          EnrichEncounterCharacter(x, character);
        }
      });

      return viewModel;
    }

    public override async Task<EncounterBaseViewModel> SaveEncounter(string userId, JsonObject viewModel)
    {
      Dnd5eEncounterModelConverter modelConverter = new Dnd5eEncounterModelConverter();

      EncounterModel model = modelConverter.ConvertReverse(viewModel.Deserialize<EncounterViewModel>());
      model.UserId = userId;
      model = await _encounterService.Insert(RuleSystem, model);

      return modelConverter.Convert(model);
    }

    public override async Task<EncounterBaseViewModel> UpdateEncounter(string userId, JsonObject viewModel)
    {
      Dnd5eEncounterModelConverter modelConverter = new Dnd5eEncounterModelConverter();

      EncounterModel model = modelConverter.ConvertReverse(viewModel.Deserialize<EncounterViewModel>());
      model.UserId = userId;
      model = await _encounterService.Update(RuleSystem, model);

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

    private void EnrichEncounterCharacter(EncounterCreatureViewModel creatureViewModel, CharacterViewModel character)
    {
      // Attributes
      creatureViewModel.AttributeCha = character.AttributeCha;
      creatureViewModel.AttributeCon = character.AttributeCon;
      creatureViewModel.AttributeDex = character.AttributeDex;
      creatureViewModel.AttributeInt = character.AttributeInt;
      creatureViewModel.AttributeStr = character.AttributeStr;
      creatureViewModel.AttributeWis = character.AttributeWis;

      // Hitpoints
      creatureViewModel.HitpointAverage = character.HitpointMaximum;
      creatureViewModel.HitpointFormula = "hit dice";

      // Senses
      creatureViewModel.PassivePerception = 0;
      creatureViewModel.Senses = new List<string>();

      // Actions
      creatureViewModel.ActionGroups = new List<ActionGroupViewModel>();

      // Proficiencies
      creatureViewModel.SavingThrows = new List<SkillModifierViewModel>();
      creatureViewModel.SkillModifiers = new List<SkillModifierViewModel>();

      // Combat Stats
      creatureViewModel.ArmourClass = character.ArmourClass;
      creatureViewModel.ChallengeRating = new ChallengeRatingViewModel();
      creatureViewModel.Immunities = new List<ResistanceImmunityViewModel>();
      creatureViewModel.Resistances = new List<ResistanceImmunityViewModel>();

      // Languages
      creatureViewModel.Languages = new List<string>();

      // Movement speeds
      creatureViewModel.FlyingSpeed = character.FlyingSpeed;
      creatureViewModel.WalkingSpeed = character.WalkingSpeed;
      creatureViewModel.ClimbingSpeed = character.ClimbingSpeed;
      creatureViewModel.SwimmingSpeed = character.SwimmingSpeed;
      creatureViewModel.BurrowingSpeed = character.BurrowingSpeed;

      // Misc stuff
      creatureViewModel.Alignment = new List<string>();
      creatureViewModel.Size = 0;
      creatureViewModel.Type = $"{character.Race} {string.Join(' ', character.Classes.Select(x => $"Level {x.Level} {x.Name}"))}";
    }
  }
}
