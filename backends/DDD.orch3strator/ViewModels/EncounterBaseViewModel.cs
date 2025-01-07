using System.Text.Json.Serialization;

namespace DDD.orch3strator.ViewModels
{
  public class EncounterBaseViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("userId")]
    public string UserId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("selectedParty")]
    public string SelectedParty { get; set; }

    [JsonPropertyName("roundCount")]
    public int RoundCount { get; set; }

    [JsonPropertyName("currentTurn")]
    public int CurrentTurn { get; set; }

    [JsonPropertyName("campaign")]
    public string Campaign { get; set; }

    [JsonPropertyName("location")]
    public string Location { get; set; }
  }
}
