using System.Text.Json;
using System.Text.Json.Serialization;

namespace DDD.Byoapi.Integrations.Models
{
  public class CreatureModel
  {
    [JsonIgnore]
    public string ByoapiId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("source")]
    public string Source { get; set; }

    [JsonPropertyName("difficulty")]
    public string Difficulty { get; set; }

    [JsonPropertyName("copyFrom")]
    public object CopyFrom { get; set; }

    [JsonPropertyName("misc")]
    public JsonElement Misc { get; set; }

    [JsonPropertyName("armour")]
    public IEnumerable<ArmourModel> Armour { get; set; }

    [JsonPropertyName("actionGroups")]
    public IEnumerable<ActionGroupModel> ActionGroups { get; set; }

    [JsonPropertyName("attributes")]
    public IEnumerable<KeyValuePair<string, int>> Attributes { get; set; }

    [JsonPropertyName("hitpoints")]
    public IEnumerable<HitpointModel> Hitpoints { get; set; }

    [JsonPropertyName("movement")]
    public IEnumerable<MovementModel> Movement { get; set; }

    [JsonPropertyName("immunities")]
    public IEnumerable<ResistanceModel> Immunities { get; set; }

    [JsonPropertyName("resistances")]
    public IEnumerable<ResistanceModel> Resistances { get; set; }

    [JsonPropertyName("vulnerabilities")]
    public IEnumerable<ResistanceModel> Vulnerabilities { get; set; }

    [JsonPropertyName("languages")]
    public IEnumerable<string> Languages { get; set; }

    [JsonPropertyName("senses")]
    public IEnumerable<string> Senses { get; set; }

    [JsonPropertyName("proficiencies")]
    public IEnumerable<ProficiencyModel> Proficiencies { get; set; }

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; }
  }

  public class MiscModel
  {
    [JsonPropertyName("size")]
    public string[] Size { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("alignment")]
    public string[] Alignment { get; set; }
  }

  public class ArmourModel
  {
    [JsonPropertyName("value")]
    public int Value { get; set; }

    [JsonPropertyName("source")]
    public string Source { get; set; }
  }

  public class ActionGroupModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("ability")]
    public string Ability { get; set; }

    [JsonPropertyName("entries")]
    public IEnumerable<string> Entries { get; set; }

    [JsonPropertyName("items")]
    public IEnumerable<ActionGroupItemModel> Items { get; set; }
  }

  public class ActionGroupItemModel
  {
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("entries")]
    public IEnumerable<string> Entries { get; set; }

    [JsonPropertyName("items")]
    public IEnumerable<ActionGroupItemModel> Items { get; set; }
  }

  public class HitpointModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("value")]
    public string Value { get; set; }
  }

  public class MovementModel
  {
    [JsonPropertyName("Type")]
    public string Type { get; set; }

    [JsonPropertyName("Value")]
    public int? Value { get; set; }
  }

  public class ProficiencyModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("target")]
    public string Target { get; set; }

    [JsonPropertyName("value")]
    public string Value { get; set; }
  }

  public class ResistanceModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("values")]
    public IEnumerable<string> Values { get; set; }
  }
}
