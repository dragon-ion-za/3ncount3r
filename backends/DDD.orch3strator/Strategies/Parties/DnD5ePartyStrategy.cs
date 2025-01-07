using DDD.Byoapi.Integrations.Services;
using DDD.orch3strator.Converters;
using DDD.orch3strator.Models.PartyService;
using DDD.orch3strator.Services;
using DDD.orch3strator.ViewModels;
using DDD.orch3strator.ViewModels.DnD5e;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace DDD.orch3strator.Strategies.Parties
{
  public class DnD5ePartyStrategy : PartyBaseStrategy
  {
    protected override string RuleSystem { get { return "dnd5e"; } }

    private readonly DataApiBaseService<PartyModel> _partyService;
    private readonly IByoapiService _dataService;

    public DnD5ePartyStrategy(DataApiBaseService<PartyModel> partyService, IByoapiService byoapiService)
    {
      _partyService = partyService;
      _dataService = byoapiService;
    }

    public override async Task<IEnumerable<PartyBaseViewModel>> GetParties(string userId, bool includeCreatures = false)
    {
      IEnumerable<PartyModel> models = await _partyService.GetList(RuleSystem, userId);

      if (includeCreatures)
      {
        // Add character enrichment later
      }

      DnD5ePartyModelConverter modelConverter = new DnD5ePartyModelConverter();

      return modelConverter.Map(models);
    }

    public async override Task<PartyBaseViewModel> GetPartyById(string userId, string id)
    {
      PartyModel model = await _partyService.GetById(RuleSystem, userId, id);

      // Add character enrichment later

      DnD5ePartyModelConverter modelConverter = new DnD5ePartyModelConverter();
      PartyViewModel viewModel = modelConverter.Convert(model);

      return viewModel;
    }

    public async override Task<PartyBaseViewModel> SaveParty(string userId, JsonObject viewModel)
    {
      DnD5ePartyModelConverter modelConverter = new DnD5ePartyModelConverter();

      PartyModel model = modelConverter.ConvertReverse(viewModel.Deserialize<PartyViewModel>());
      model.UserId = userId;
      model = await _partyService.Insert(RuleSystem, model);

      return modelConverter.Convert(model);
    }

    public async override Task<PartyBaseViewModel> UpdateParty(string userId, JsonObject viewModel)
    {
      DnD5ePartyModelConverter modelConverter = new DnD5ePartyModelConverter();

      PartyModel model = modelConverter.ConvertReverse(viewModel.Deserialize<PartyViewModel>());
      model.UserId = userId;
      model = await _partyService.Update(RuleSystem, model);

      return modelConverter.Convert(model);
    }
  }
}
