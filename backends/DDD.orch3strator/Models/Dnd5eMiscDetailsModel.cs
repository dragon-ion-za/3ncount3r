using System.Text.Json.Serialization;

namespace DDD.orch3strator.Models
{
  public class Dnd5eMiscDetailsModel
  {
    [JsonPropertyName("alignment")]
    public IEnumerable<string> Alignment { get; set; }

    [JsonPropertyName("size")]
    public IEnumerable<string> Size { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }
  }
}
