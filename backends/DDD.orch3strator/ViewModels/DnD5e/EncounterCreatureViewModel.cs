using System.Text.Json.Serialization;

namespace DDD.orch3strator.ViewModels.DnD5e
{
  public class EncounterCreatureViewModel : CreatureViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

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
