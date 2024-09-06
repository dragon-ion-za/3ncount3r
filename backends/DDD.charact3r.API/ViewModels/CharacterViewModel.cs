using System.Text.Json.Serialization;

namespace DDD.charact3r.API.ViewModels
{
  public class CharacterViewModel
  {
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("sourceId")]
    public string SourceId { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }

    [JsonPropertyName("hitpointSpecial")]
    public string HitpointSpecial { get; set; }

    [JsonPropertyName("hitpointFormula")]
    public string HitpointFormula { get; set; }

    [JsonPropertyName("armourClass")]
    public object ArmourClass { get; set; }

    [JsonPropertyName("legendaryCount")]
    public int LegendaryCount { get; set; }

    [JsonPropertyName("isPlayerCharacter")]
    public bool IsPlayerCharacter { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("size")]
    public string[] Size { get; set; }

    [JsonPropertyName("level")]
    public int Level { get; set; }

    [JsonPropertyName("race")]
    public string Race { get; set; }

    [JsonPropertyName("classes")]
    public CharacterClass[] Classes { get; set; }

    [JsonPropertyName("hitpointMax")]
    public int HitpointMax { get; set; }

    [JsonPropertyName("hitpointCurrent")]
    public int HitpointCurrent { get; set; }

    [JsonPropertyName("hitpointTemporary")]
    public int HitpointTemporary { get; set; }

    [JsonPropertyName("walkingSpeed")]
    public int WalkingSpeed { get; set; }

    [JsonPropertyName("attributeStr")]
    public int AttributeStr { get; set; }

    [JsonPropertyName("attributeDex")]
    public int AttributeDex { get; set; }

    [JsonPropertyName("attributeCon")]
    public int AttributeCon { get; set; }

    [JsonPropertyName("attributeInt")]
    public int AttributeInt { get; set; }

    [JsonPropertyName("attributeWis")]
    public int AttributeWis { get; set; }

    [JsonPropertyName("attributeCha")]
    public int AttributeCha { get; set; }

    [JsonPropertyName("skillProficiencies")]
    public string[] SkillProficiencies { get; set; }

    [JsonPropertyName("savingThrowProficiencies")]
    public string[] SavingThrowProficiencies { get; set; }

    [JsonPropertyName("passivePerception")]
    public int PassivePerception { get; set; }

    [JsonPropertyName("languages")]
    public string[] Languages { get; set; }

    [JsonPropertyName("trait")]
    public object[] Trait { get; set; }

    [JsonPropertyName("action")]
    public object[] Action { get; set; }

    [JsonPropertyName("equipment")]
    public Equipment[] Equipment { get; set; }

    [JsonPropertyName("inventory")]
    public object[] Inventory { get; set; }

    [JsonPropertyName("hitpointAverage")]
    public int HitpointAverage { get; set; }

    [JsonPropertyName("currentHitpoints")]
    public int CurrentHitpoints { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("skillModifiers")]
    public object[] SkillModifiers { get; set; }

    [JsonPropertyName("savingThrows")]
    public object[] SavingThrows { get; set; }
  }

  public class CharacterClass
  {
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("level")]
    public int Level { get; set; }
  }

  public class Equipment
  {
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }
  }
}
