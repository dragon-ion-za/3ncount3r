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
        Name = model.Name,

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
      throw new NotImplementedException();
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
