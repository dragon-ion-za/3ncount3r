using System.Text.Json.Serialization;

namespace DDD.orch3strator.ViewModels.DnD5e
{
  public class PartyViewModel : PartyBaseViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("userId")]
    public string UserId { get; set; }

    [JsonPropertyName("ruleSystem")]
    public string RuleSystem { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("characters")]
    public IEnumerable<PartyCharacterViewModel> Characters { get; set; }
  }
}
