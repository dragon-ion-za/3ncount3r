using DDD.orch3strator.Models.EncounterService;
using DDD.orch3strator.ViewModels.DnD5e;

namespace DDD.orch3strator.Converters
{
  public class Dnd5eEncounterModelConverter : IModelConverter<EncounterModel, EncounterViewModel>
  {
    public EncounterViewModel Convert(EncounterModel model)
    {
      return new EncounterViewModel()
      {
        Id = model.Id,
        CurrentTurn = model.CurrentTurn,
        Name = model.Name,
        RoundCount = model.RoundCount,
        SelectedParty = model.SelectedParty,
        Creatures = BuildCreaturesFromModel(model.Creatures),
        UserId = model.UserId,
        Campaign = model.Campaign,
        Location = model.Location
      };
    }

    public EncounterModel ConvertReverse(EncounterViewModel viewModel)
    {
      return new EncounterModel()
      {
        Creatures = BuildCreaturesFromViewModel(viewModel.Creatures),
        CurrentTurn = viewModel.CurrentTurn,
        Id = viewModel.Id,
        Name = viewModel.Name,
        RoundCount = viewModel.RoundCount,
        SelectedParty = viewModel.SelectedParty,
        UserId = viewModel.UserId,
        Campaign = viewModel.Campaign,
        Location = viewModel.Location
      };
    }

    public IEnumerable<EncounterViewModel> Map(IEnumerable<EncounterModel> model)
    {
      List<EncounterViewModel> list = new List<EncounterViewModel>();
      foreach (var encounter in model)
      {
        list.Add(Convert(encounter));
      }

      return list;
    }

    private IEnumerable<EncounterCreatureViewModel> BuildCreaturesFromModel(IEnumerable<EncounterCreatureModel> creatures)
    {
      List<EncounterCreatureViewModel> list = new List<EncounterCreatureViewModel>();

      foreach (var creature in creatures)
      {
        HitpointModel hitpoints = creature.Hitpoints.First(x => x.Type == "normal");
        HitpointModel tempHitpoints = creature.Hitpoints.First(x => x.Type == "temp");

        list.Add(new EncounterCreatureViewModel()
        {
          ByoapiId = creature.ByoapiId,
          CurrentHitpoints = hitpoints.Current,
          HitpointMax = hitpoints.Maximum,
          Id = creature.Id,
          Initiative = creature.TurnOrder,
          IsActive = creature.IsActive,
          IsPlayerCharacter = creature.IsPlayerCharacter,
          Name = creature.Name,
          SourceId = creature.SourceId,
          TemporaryHitpoints = tempHitpoints.Current
        });
      }

      return list;
    }

    private IEnumerable<EncounterCreatureModel> BuildCreaturesFromViewModel(IEnumerable<EncounterCreatureViewModel> creatures)
    {
      List<EncounterCreatureModel> list = new List<EncounterCreatureModel>();

      foreach (var creature in creatures)
      {
        list.Add(new EncounterCreatureModel()
        {
          ByoapiId = creature.ByoapiId,
          Hitpoints = new List<HitpointModel>() {
            new HitpointModel() { Type = "normal", Current = creature.CurrentHitpoints, Maximum = creature.HitpointMax },
            new HitpointModel() { Type = "temp", Current = creature.TemporaryHitpoints }
          },
          Id = creature.Id,
          TurnOrder = creature.Initiative,
          IsActive = creature.IsActive,
          IsPlayerCharacter = creature.IsPlayerCharacter,
          Name = creature.Name,
          SourceId = creature.SourceId
        });
      }

      return list;
    }
  }
}
