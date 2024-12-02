
using System.Text.Json.Serialization;

namespace DDD.charact3r.API.ViewModels
{
  public class DnD5eViewModel : IViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; internal set; }

    [JsonPropertyName("name")]
    public string Name { get; internal set; }

    [JsonPropertyName("size")]
    public string[] Size { get; internal set; }

    [JsonPropertyName("attributes")]
    public Dictionary<string, int> Attributes { get; internal set; }

    [JsonPropertyName("languages")]
    public string[] Languages { get; internal set; }

    [JsonPropertyName("actionGroups")]
    public List<ActionGroupViewModel> ActionGroups { get; internal set; }
  }
}
