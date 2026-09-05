using System.Text.Json.Serialization;

namespace DDD.orch3strator.ViewModels.DnD5e
{
  public class EncounterViewModel : EncounterBaseViewModel
  {
    [JsonPropertyName("creatures")]
    public IEnumerable<EncounterCreatureViewModel> Creatures { get; set; }
  }
}
