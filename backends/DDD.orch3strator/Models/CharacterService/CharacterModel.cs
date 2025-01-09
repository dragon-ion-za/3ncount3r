using System.Text.Json.Serialization;

namespace DDD.orch3strator.Models.CharacterService
{
  public class CharacterModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("ruleSystem")]
    public string RuleSystem { get; set; }

    [JsonPropertyName("size")]
    public IEnumerable<string> Size { get; set; }

    [JsonPropertyName("race")]
    public RaceModel Race { get; set; }

    [JsonPropertyName("classes")]
    public IEnumerable<CharacterClassModel> Classes { get; set; }

    [JsonPropertyName("hitpoints")]
    public IEnumerable<HitpointModel> Hitpoints { get; set; }

    [JsonPropertyName("movementSpeeds")]
    public IEnumerable<MovementSpeedModel> MovementSpeeds { get; set; }

    public Dictionary<string, int> Attributes { get; set; }

    [JsonPropertyName("bonuses")]
    public IEnumerable<BonusModel> Bonuses { get; set; }

    [JsonPropertyName("languages")]
    public IEnumerable<string>Languages { get; set; }

    [JsonPropertyName("feats")]
    public IEnumerable<FeatModel> Feats { get; set; }

    [JsonPropertyName("inventory")]
    public IEnumerable<EquipmentModel> Inventory { get; set; }
  }

  public class CharacterClassModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("level")]
    public int Level { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }
  }

  public class EquipmentModel
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

  public class MovementSpeedModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("value")]
    public int Value { get; set; }
  }

  public class BonusModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("target")]
    public string Target { get; set; }

    [JsonPropertyName("value")]
    public int Value { get; set; }
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

  public class FeatModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }
  }

  public class RaceModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }
  }
}
