using System.Text.Json.Serialization;

namespace DDD.orch3strator.ViewModels.DnD5e
{
  public class PartyCharacterViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }
  }
}
