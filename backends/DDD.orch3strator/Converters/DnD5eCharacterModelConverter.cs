using DDD.Common.Contracts.Character;
using DDD.orch3strator.ViewModels.DnD5e;

namespace DDD.orch3strator.Converters
{
  public class DnD5eCharacterModelConverter : IModelConverter<CharacterContract, CharacterViewModel>
  {
    public CharacterViewModel Convert(CharacterContract model)
    {
      return new CharacterViewModel()
      {
        // Generic data
        Id = model.Id,
        UserId = model.UserId,
        Name = model.Name,

        // Other details
        Classes = model.Classes?.Select(x => new CharacterClassViewModel() { Level = x.Level, Name = x.Id }).ToList() ?? new List<CharacterClassViewModel>(),
        Race = model.Race?.Id,

        // Attributes
        AttributeCha = model.Attributes.First(x => x.Key == "cha").Value,
        AttributeCon = model.Attributes.First(x => x.Key == "con").Value,
        AttributeDex = model.Attributes.First(x => x.Key == "dex").Value,
        AttributeInt = model.Attributes.First(x => x.Key == "int").Value,
        AttributeStr = model.Attributes.First(x => x.Key == "str").Value,
        AttributeWis = model.Attributes.First(x => x.Key == "wis").Value,

        // Hitpoints
        HitpointMaximum = model.Hitpoints.FirstOrDefault(x => x.Type == "current")?.Maximum ?? 0,

        // Movement speeds
        FlyingSpeed = model.MovementSpeeds.FirstOrDefault(x => x.Type == "spd-fly")?.Value ?? 0,
        WalkingSpeed = model.MovementSpeeds.FirstOrDefault(x => x.Type == "spd-walk")?.Value ?? 0,
        ClimbingSpeed = model.MovementSpeeds.FirstOrDefault(x => x.Type == "spd-climb")?.Value ?? 0,
        SwimmingSpeed = model.MovementSpeeds.FirstOrDefault(x => x.Type == "spd-swim")?.Value ?? 0,
        BurrowingSpeed = model.MovementSpeeds.FirstOrDefault(x => x.Type == "spd-burrow")?.Value ?? 0,
      };
    }

    public CharacterContract ConvertReverse(CharacterViewModel viewModel)
    {
      return new CharacterContract()
      {
        // Generic data
        Id = viewModel.Id,
        UserId = viewModel.UserId,
        Name = viewModel.Name,

        // Other details
        //Classes = viewModel.Classes.Select(x => new CharacterClassViewModel() { Level = x.Level, Name = x.Id }).ToList(),
        //Race = viewModel.Race.Id,

        // Attributes
        Attributes = new Dictionary<string, int>()
        {
          { "cha", viewModel.AttributeCha },
          { "con", viewModel.AttributeCon },
          { "dex", viewModel.AttributeDex },
          { "int", viewModel.AttributeInt },
          { "str", viewModel.AttributeStr },
          { "wis", viewModel.AttributeWis },
        },

        // Hitpoints
        Hitpoints = new List<HitpointContract>() { new HitpointContract() { Type = "current", Maximum = viewModel.HitpointMaximum } },

        // Movement speeds
        MovementSpeeds = new List<MovementSpeedContract>()
        {
          new MovementSpeedContract() { Type = "spd-fly", Value = viewModel.FlyingSpeed },
          new MovementSpeedContract() { Type = "spd-walk", Value = viewModel.WalkingSpeed },
          new MovementSpeedContract() { Type = "spd-climb", Value = viewModel.ClimbingSpeed },
          new MovementSpeedContract() { Type = "spd-swim", Value = viewModel.SwimmingSpeed },
          new MovementSpeedContract() { Type = "spd-burrow", Value = viewModel.BurrowingSpeed },
        },
      };
    }

    public IEnumerable<CharacterViewModel> Map(IEnumerable<CharacterContract> model)
    {
      List<CharacterViewModel> list = new List<CharacterViewModel>();

      foreach (var creature in model)
      {
        list.Add(Convert(creature));
      }

      return list;
    }
  }
}
