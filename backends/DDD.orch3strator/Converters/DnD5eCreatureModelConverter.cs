using DDD.Byoapi.Integrations.Models;
using DDD.orch3strator.ViewModels.DnD5e;
using DDD.orch3strator.ViewModels.DnD5e.Enums;
using System.Text.Json;

namespace DDD.orch3strator.Converters
{
  public class DnD5eCreatureModelConverter : IModelConverter<CreatureModel, CreatureViewModel>
  {
    public CreatureViewModel Convert(CreatureModel model)
    {
      return new CreatureViewModel()
      {
        // Generic data
        ByoapiId = model.ByoapiId,
        Name = model.Name,
        ImageUrl = model.ImageUrl,
        SourceId = model.Source,

        // Attributes
        AttributeCha = model.Attributes.First(x => x.Key == "cha").Value,
        AttributeCon = model.Attributes.First(x => x.Key == "con").Value,
        AttributeDex = model.Attributes.First(x => x.Key == "dex").Value,
        AttributeInt = model.Attributes.First(x => x.Key == "int").Value,
        AttributeStr = model.Attributes.First(x => x.Key == "str").Value,
        AttributeWis = model.Attributes.First(x => x.Key == "wis").Value,

        // Hitpoints
        HitpointAverage = int.Parse(model.Hitpoints.FirstOrDefault(x => x.Type == "average")?.Value ?? "0"),
        HitpointFormula = model.Hitpoints.FirstOrDefault(x => x.Type == "formula")?.Value ?? "",

        // Senses
        PassivePerception = GetSenseFromModel("passive perception", model.Senses),
        Senses = model.Senses.Where(x => !x.StartsWith("passive perception")),

        // Actions
        ActionGroups = BuildActionGroupsFromModel(model.ActionGroups),

        // Proficiencies
        SavingThrows = BuildProficienciesFromModel("save", model.Proficiencies),
        SkillModifiers = BuildProficienciesFromModel("skill", model.Proficiencies),

        // Combat Stats
        ArmourClass = BuildArmourClassFromModel(model.Armour),
        ChallengeRating = BuildChallengeRatingFromModel(model.Difficulty),
        Immunities = BuildImmunitiesResistancesFromModel(model.Immunities),
        Resistances = BuildImmunitiesResistancesFromModel(model.Resistances),
        Vulnerabilities = BuildImmunitiesResistancesFromModel(model.Vulnerabilities),

        // Languages
        Languages = model.Languages,

        // Movement speeds
        FlyingSpeed = model.Movement.FirstOrDefault(x => x.Type == "spd-fly")?.Value ?? 0,
        WalkingSpeed = model.Movement.FirstOrDefault(x => x.Type == "spd-walk")?.Value ?? 0,
        ClimbingSpeed = model.Movement.FirstOrDefault(x => x.Type == "spd-climb")?.Value ?? 0,
        SwimmingSpeed = model.Movement.FirstOrDefault(x => x.Type == "spd-swim")?.Value ?? 0,
        BurrowingSpeed = model.Movement.FirstOrDefault(x => x.Type == "spd-burrow")?.Value ?? 0,

        // Misc stuff
        Alignment = BuildAlignmentFromModel(model.Misc.GetProperty("alignment").EnumerateArray()),
        Size = (int)BuildSizeFromModel(model.Misc.GetProperty("size").EnumerateArray()),
        Type = model.Misc.GetProperty("type").GetString()
      };
    }

    public CreatureModel ConvertReverse(CreatureViewModel viewModel)
    {
      throw new NotImplementedException();
    }

    public IEnumerable<CreatureViewModel> Map(IEnumerable<CreatureModel> model)
    {
      List<CreatureViewModel> list = new List<CreatureViewModel>();

      foreach (var creature in model)
      {
        list.Add(Convert(creature));
      }

      return list;
    }

    private IEnumerable<string> BuildAlignmentFromModel(JsonElement.ArrayEnumerator alignments)
    {
      List<string> alignmentViewModel = new List<string>();

      foreach (var alignment in alignments)
      {
        foreach (var alignmentType in alignment.GetProperty("type").EnumerateArray())
        {
          alignmentViewModel.Add(alignmentType.GetString());
        }
      }

      return alignmentViewModel;
    }

    private CreatureSizes BuildSizeFromModel(JsonElement.ArrayEnumerator size)
    {
      switch (size.FirstOrDefault().GetString().ToLowerInvariant())
      {
        case "t": return CreatureSizes.Tiny;
        case "s": return CreatureSizes.Small;
        case "m": return CreatureSizes.Medium;
        case "l": return CreatureSizes.Large;
        case "h": return CreatureSizes.Huge;
        case "g": return CreatureSizes.Gargantuan;
        default: return CreatureSizes.Unknown;
      }
    }

    private IEnumerable<SkillModifierViewModel> BuildProficienciesFromModel(string proficiencyType, IEnumerable<ProficiencyModel> proficiencies)
    {
      List<SkillModifierViewModel> proficiencyViewModel = new List<SkillModifierViewModel>();

      foreach (var proficiency in proficiencies.Where(x => x.Type == proficiencyType))
      {
        if (int.TryParse(proficiency.Value, out int modifier))
        {
          proficiencyViewModel.Add(new SkillModifierViewModel()
          {
            Modifier = modifier,
            SkillName = proficiency.Target
          });
        }
      }

      return proficiencyViewModel;
    }

    private IEnumerable<ResistanceImmunityViewModel> BuildImmunitiesResistancesFromModel(IEnumerable<ResistanceModel> immunities)
    {
      List<ResistanceImmunityViewModel> immunitiesViewModel = new List<ResistanceImmunityViewModel>();

      foreach (ResistanceModel immunity in immunities)
      {
        foreach (string immunityType in immunity.Values)
        {
          immunitiesViewModel.Add(new ResistanceImmunityViewModel() { ResistantTo = immunityType, Condition = immunity.Type });
        }
      }

      return immunitiesViewModel;
    }

    private ChallengeRatingViewModel BuildChallengeRatingFromModel(string difficulty)
    {
      decimal rating = 0;
      int experienceRewarded = 0;
      _ = decimal.TryParse(difficulty, out rating);

      switch (rating)
      {
        case .125m: experienceRewarded = 25; break;
        case .25m: experienceRewarded =  50; break;
        case .50m: experienceRewarded =  100; break;
        case 1: experienceRewarded =  200; break;
        case 2: experienceRewarded =  450; break;
        case 3: experienceRewarded =  700; break;
        case 4: experienceRewarded =  1100; break;
        case 5: experienceRewarded =  1800; break;
        case 6: experienceRewarded =  2300; break;
        case 7: experienceRewarded =  2900; break;
        case 8: experienceRewarded =  3900; break;
        case 9: experienceRewarded =  5000; break;
        case 10: experienceRewarded =  5900; break;
        case 11: experienceRewarded =  7200; break;
        case 12: experienceRewarded =  8400; break;
        case 13: experienceRewarded =  10000; break;
        case 14: experienceRewarded =  11500; break;
        case 15: experienceRewarded =  13000; break;
        case 16: experienceRewarded =  15000; break;
        case 17: experienceRewarded =  18000; break;
        case 18: experienceRewarded =  20000; break;
        case 19: experienceRewarded =  22000; break;
        case 20: experienceRewarded =  25000; break;
        case 21: experienceRewarded =  33000; break;
        case 22: experienceRewarded =  41000; break;
        case 23: experienceRewarded =  50000; break;
        case 24: experienceRewarded =  62000; break;
        case 25: experienceRewarded =  75000; break;
        case 26: experienceRewarded =  90000; break;
        case 27: experienceRewarded =  105000; break;
        case 28: experienceRewarded =  120000; break;
        case 29: experienceRewarded =  135000; break;
        case 30: experienceRewarded =  155000; break;
        default: experienceRewarded =  0; break;
      }

      return new ChallengeRatingViewModel()
      {
        Rating = rating,
        Experience = experienceRewarded,
      };
    }

    private ArmourClassViewModel BuildArmourClassFromModel(IEnumerable<ArmourModel> armour)
    {
      ArmourModel firstArmour = armour.FirstOrDefault();

      return new ArmourClassViewModel()
      {
        ArmourClass = firstArmour?.Value ?? 0,
        AppliedFrom = firstArmour?.Source,
        AlternateForms = armour.Except([firstArmour]).Select(x => new ArmourClassViewModel()
        {
          AppliedFrom = x.Source,
          ArmourClass = x.Value
        })
      };
    }

    private IEnumerable<ActionGroupViewModel> BuildActionGroupsFromModel(IEnumerable<ActionGroupModel> actionGroups)
    {
      List<ActionGroupViewModel> actionGroupsViewModel = new List<ActionGroupViewModel>();

      foreach (var actionGroup in actionGroups)
      {
        if (actionGroup.Items != null && actionGroup.Items.Any())
        {
          actionGroupsViewModel.Add(new ActionGroupViewModel()
          {
            Name = actionGroup.Type,
            Ability = actionGroup.Ability,
            Entries = actionGroup.Entries,
            Items = actionGroup.Items.ToList().Select(x => BuildActionGroupItemFromModel(x, "additional"))
          });
        }
      }

      return actionGroupsViewModel;
    }

    private ItemViewModel BuildActionGroupItemFromModel(ActionGroupItemModel actionGroupItemModel, string nestedType)
    {
      return new ItemViewModel()
      {
        Name = actionGroupItemModel.Name,
        Type = nestedType,
        Entries = actionGroupItemModel.Entries,
        Items = actionGroupItemModel.Items?.Select(x => BuildActionGroupItemFromModel(x, nestedType == "additional" ? "list" : (x.Items?.Any() ?? false) ? "list" : "entry"))
      };
    }

    private int GetSenseFromModel(string senseName, IEnumerable<string> senses)
    {
      string sense = senses.FirstOrDefault(x => x.StartsWith(senseName));

      if (!string.IsNullOrWhiteSpace(sense))
      {
        string senseValue = sense.Replace(senseName, "").Trim();
        if (int.TryParse(senseValue, out int result))
        {
          return result;
        }
      }

      return 0;
    }
  }
}
