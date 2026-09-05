using DDD.Byoapi.Integrations.Models;
using DDD.Byoapi.Integrations.Services;
using DDD.orch3strator.Converters;
using DDD.orch3strator.ViewModels;

namespace DDD.orch3strator.Strategies.Creatures
{
  public class DnD5eCreatureStrategy : CreatureBaseStrategy
  {
    protected override string RuleSystem { get { return "dnd5e"; } }

    private readonly IByoapiService _dataService;

    public DnD5eCreatureStrategy(IByoapiService dataService)
    {
      _dataService = dataService;
    }

    public override async Task<IEnumerable<CreatureBaseViewModel>> SearchCreatures(string searchQuery)
    {
      IEnumerable<CreatureModel> models = await _dataService.SearchForCreatures(RuleSystem, searchQuery);

      DnD5eCreatureModelConverter modelConverter = new DnD5eCreatureModelConverter();

      return modelConverter.Map(models);
    }
  }
}
