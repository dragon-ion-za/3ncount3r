using System.Text.Json.Serialization;

namespace DDD.orch3strator.Models.EncounterService
{
  public class EncounterCreatureModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("sourceId")]
    public string SourceId { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }

    [JsonPropertyName("hitpoints")]
    public HitpointModel[] Hitpoints { get; set; }

    [JsonPropertyName("turnOrder")]
    public int TurnOrder { get; set; }

    [JsonPropertyName("isPlayerCharacter")]
    public bool IsPlayerCharacter { get; set; } = false;

    [JsonPropertyName("isActive")]
    public bool IsActive { get; set; } = true;
  }

  public class HitpointModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("maximum")]
    public int Maximum { get; set; }

    [JsonPropertyName("current")]
    public int Current { get; set; }
  }
}
