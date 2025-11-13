using DDD.orch3strator.Models.CharacterService;
using DDD.orch3strator.ViewModels.DnD5e;

namespace DDD.orch3strator.Converters
{
  public class DnD5eCharacterModelConverter : IModelConverter<CharacterModel, CharacterViewModel>
  {
    public CharacterViewModel Convert(CharacterModel model)
    {
      return new CharacterViewModel()
      {
        // Generic data
        Id = model.Id,
        UserId = model.UserId,
        Name = model.Name,

        // Other details
        Classes = model.Classes.Select(x => new CharacterClassViewModel() { Level = x.Level, Name = x.Id }).ToList(),
        //Race = model.Race.Id,

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

    public CharacterModel ConvertReverse(CharacterViewModel viewModel)
    {
      return new CharacterModel()
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
        Hitpoints = new List<HitpointModel>() { new HitpointModel() { Type = "current", Maximum = viewModel.HitpointMaximum } },

        // Movement speeds
        MovementSpeeds = new List<MovementSpeedModel>()
        {
          new MovementSpeedModel() { Type = "spd-fly", Value = viewModel.FlyingSpeed },
          new MovementSpeedModel() { Type = "spd-walk", Value = viewModel.WalkingSpeed },
          new MovementSpeedModel() { Type = "spd-climb", Value = viewModel.ClimbingSpeed },
          new MovementSpeedModel() { Type = "spd-swim", Value = viewModel.SwimmingSpeed },
          new MovementSpeedModel() { Type = "spd-burrow", Value = viewModel.BurrowingSpeed },
        },
      };
    }

    public IEnumerable<CharacterViewModel> Map(IEnumerable<CharacterModel> model)
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
