using System.Text.Json.Serialization;

namespace DDD.charact3r.API.ViewModels
{
  public class ActionGroupViewModel
  {
    [JsonPropertyName("name")]
    public string Name { get; set; }

    public ActionGroupViewModel(string name)
    {
        Name = name;
    }
  }
}
