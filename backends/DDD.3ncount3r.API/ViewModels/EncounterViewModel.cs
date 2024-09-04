using System.Text.Json.Serialization;

namespace DDD._3ncount3r.API.ViewModels
{
  public class EncounterViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("creatures")]
    public IEnumerable<EncounterCreatureViewModel> Creatures { get; set; }

    [JsonPropertyName("selectedParty")]
    public string SelectedParty { get; set; }

    [JsonPropertyName("roundCount")]
    public int RoundCount { get; set; }

    [JsonPropertyName("currentTurn")]
    public int CurrentTurn { get; set; }
  }
}
