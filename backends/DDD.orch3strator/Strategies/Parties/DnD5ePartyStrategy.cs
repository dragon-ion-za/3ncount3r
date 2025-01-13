using DDD.Byoapi.Integrations.Services;
using DDD.orch3strator.Converters;
using DDD.orch3strator.Models.CharacterService;
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
    private readonly DataApiBaseService<CharacterModel> _characterService;
    private readonly IByoapiService _dataService;

    public DnD5ePartyStrategy(DataApiBaseService<PartyModel> partyService, DataApiBaseService<CharacterModel> characterService, IByoapiService byoapiService)
    {
      _partyService = partyService;
      _dataService = byoapiService;
      _characterService = characterService;
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

      List<CharacterModel> characters = new List<CharacterModel>();
      foreach (var characterId in model.CharacterIds)
      {
        characters.Add(await _characterService.GetById(RuleSystem, userId, characterId));
      }

      DnD5ePartyModelConverter modelConverter = new DnD5ePartyModelConverter();
      PartyViewModel viewModel = modelConverter.Convert(model);

      // Enrich the viewmodel creatures with the creature data from the BYOAPIs
      DnD5eCharacterModelConverter characterConverter = new DnD5eCharacterModelConverter();
      viewModel.Characters.ToList().ForEach(x =>
      {
        CharacterViewModel character = characterConverter.Convert(characters.First(y => y.Id == x.Id));
        EnrichPartyCharacter(x, character);
      });

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

    private void EnrichPartyCharacter(PartyCharacterViewModel characterViewModel, CharacterViewModel character)
    {
      characterViewModel.Name = character.Name;

      // Attributes
      characterViewModel.AttributeCha = character.AttributeCha;
      characterViewModel.AttributeCon = character.AttributeCon;
      characterViewModel.AttributeDex = character.AttributeDex;
      characterViewModel.AttributeInt = character.AttributeInt;
      characterViewModel.AttributeStr = character.AttributeStr;
      characterViewModel.AttributeWis = character.AttributeWis;

      // Movement speeds
      characterViewModel.FlyingSpeed = character.FlyingSpeed;
      characterViewModel.WalkingSpeed = character.WalkingSpeed;
      characterViewModel.ClimbingSpeed = character.ClimbingSpeed;
      characterViewModel.SwimmingSpeed = character.SwimmingSpeed;
      characterViewModel.BurrowingSpeed = character.BurrowingSpeed;

    }
  }
}
