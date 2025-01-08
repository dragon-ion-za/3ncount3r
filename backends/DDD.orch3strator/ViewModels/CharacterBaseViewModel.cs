using System.Text.Json.Serialization;

namespace DDD.orch3strator.ViewModels
{
  public class CharacterBaseViewModel
  {
    [JsonPropertyName("ruleSystem")]
    public string RuleSystem { get; set; }

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
  }
}
