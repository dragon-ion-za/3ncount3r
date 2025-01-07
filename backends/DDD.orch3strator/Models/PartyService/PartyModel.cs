using System.Text.Json.Serialization;

namespace DDD.orch3strator.Models.PartyService
{
  public class PartyModel
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
