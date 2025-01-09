using System.Text.Json.Serialization;

namespace DDD.orch3strator.ViewModels.DnD5e
{
  public class CharacterViewModel : CharacterBaseViewModel
  {
    [JsonPropertyName("armourClass")]
    public ArmourClassViewModel ArmourClass { get; set; }

    [JsonPropertyName("classes")]
    public CharacterClassViewModel Classes { get; set; }

    [JsonPropertyName("hitpointMaximum")]
    public int HitpointMaximum { get; set; }

    [JsonPropertyName("walkingSpeed")]
    public int WalkingSpeed { get; set; }

    [JsonPropertyName("flyingSpeed")]
    public int FlyingSpeed { get; set; }

    [JsonPropertyName("swimmingSpeed")]
    public int SwimmingSpeed { get; set; }

    [JsonPropertyName("climbingSpeed")]
    public int ClimbingSpeed { get; set; }

    [JsonPropertyName("burrowingSpeed")]
    public int BurrowingSpeed { get; set; }

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
  }

  public class CharacterClassViewModel
  {
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("level")]
    public int Level { get; set; }
  }
}
