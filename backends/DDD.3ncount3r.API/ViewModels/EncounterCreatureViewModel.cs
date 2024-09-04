using System.Text.Json.Serialization;

namespace DDD._3ncount3r.API.ViewModels
{
  public class EncounterCreatureViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("sourceId")]
    public string SourceId { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }

    [JsonPropertyName("hitpointMax")]
    public int HitpointMax { get; set; }

    [JsonPropertyName("currentHitpoints")]
    public int CurrentHitpoints { get; set; }

    [JsonPropertyName("temporaryHitpoints")]
    public int TemporaryHitpoints { get; set; }

    [JsonPropertyName("initiative")]
    public int Initiative { get; set; }

    [JsonPropertyName("isPlayerCharacter")]
    public bool IsPlayerCharacter { get; set; } = false;

    [JsonPropertyName("isActive")]
    public bool IsActive { get; set; } = true;
  }
}
