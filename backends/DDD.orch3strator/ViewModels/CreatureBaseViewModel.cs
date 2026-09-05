using System.Text.Json.Serialization;

namespace DDD.orch3strator.ViewModels
{
  public class CreatureBaseViewModel
  {
    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }

    [JsonPropertyName("sourceId")]
    public string SourceId { get; set; }

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
  }
}
