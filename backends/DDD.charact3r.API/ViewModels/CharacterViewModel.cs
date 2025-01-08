using System.Text.Json.Serialization;

namespace DDD.charact3r.API.ViewModels
{
  public class CharacterViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("userId")]
    public string UserId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("ruleSystem")]
    public string RuleSystem { get; set; }

    [JsonPropertyName("size")]
    public IEnumerable<string> Size { get; set; }

    [JsonPropertyName("race")]
    public RaceViewModel Race { get; set; }

    [JsonPropertyName("classes")]
    public IEnumerable<CharacterClassViewModel> Classes { get; set; }

    [JsonPropertyName("hitpoints")]
    public IEnumerable<HitpointViewModel> Hitpoints { get; set; }

    [JsonPropertyName("movementSpeeds")]
    public IEnumerable<MovementSpeedViewModel> MovementSpeeds { get; set; }

    public Dictionary<string, int> Attributes { get; set; }

    [JsonPropertyName("bonuses")]
    public IEnumerable<BonusViewModel> Bonuses { get; set; }

    [JsonPropertyName("languages")]
    public IEnumerable<string> Languages { get; set; }

    [JsonPropertyName("feats")]
    public IEnumerable<FeatViewModel> Feats { get; set; }

    [JsonPropertyName("inventory")]
    public IEnumerable<EquipmentViewModel> Inventory { get; set; }
  }

  public class CharacterClassViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("level")]
    public int Level { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }
  }

  public class EquipmentViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }

    [JsonPropertyName("containerId")]
    public int ContainerId { get; set; }

    [JsonPropertyName("quantity")]
    public int Quantity { get; set; }
  }

  public class MovementSpeedViewModel
  {
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("value")]
    public int Value { get; set; }
  }

  public class BonusViewModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("target")]
    public string Target { get; set; }

    [JsonPropertyName("value")]
    public int Value { get; set; }
  }

  public class HitpointViewModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("maximum")]
    public int Maximum { get; set; }

    [JsonPropertyName("current")]
    public int Current { get; set; }
  }

  public class FeatViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }
  }

  public class RaceViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }
  }
}
