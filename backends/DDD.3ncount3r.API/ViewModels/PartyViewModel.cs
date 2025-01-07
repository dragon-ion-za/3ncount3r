using System.Text.Json.Serialization;

namespace DDD._3ncount3r.API.ViewModels
{
  public class PartyViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("userId")]
    public string UserId { get; set; }

    [JsonPropertyName("ruleSystem")]
    public string RuleSystem { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("characterIds")]
    public IEnumerable<string> CharacterIds { get; set; }
  }
}
