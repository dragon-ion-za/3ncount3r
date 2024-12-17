using System.Text.Json.Serialization;

namespace DDD.orch3strator.ViewModels.DnD5e
{
  public class CreatureViewModel : IViewModel
  {
    [JsonPropertyName("byoapiId")]
    public string ByoapiId { get; set; }

    [JsonPropertyName("sourceId")]
    public string SourceId { get; set; }

    [JsonPropertyName("size")]
    public int Size { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("alignment")]
    public IEnumerable<string> Alignment { get; set; }

    [JsonPropertyName("armourClass")]
    public ArmourClassViewModel ArmourClass { get; set; }

    [JsonPropertyName("hitpointAverage")]
    public int HitpointAverage { get; set; }

    [JsonPropertyName("hitpointFormula")]
    public string HitpointFormula { get; set; }

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

    [JsonPropertyName("skillModifiers")]
    public IEnumerable<SkillModifierViewModel> SkillModifiers { get; set; }

    [JsonPropertyName("passivePerception")]
    public int PassivePerception { get; set; }

    [JsonPropertyName("resistances")]
    public IEnumerable<ResistanceImmunityViewModel> Resistances { get; set; }

    [JsonPropertyName("immunities")]
    public IEnumerable<ResistanceImmunityViewModel> Immunities { get; set; }

    [JsonPropertyName("languages")]
    public IEnumerable<string> Languages { get; set; }

    [JsonPropertyName("challengeRating")]
    public ChallengeRatingViewModel ChallengeRating { get; set; }

    [JsonPropertyName("senses")]
    public IEnumerable<string> Senses { get; set; }

    [JsonPropertyName("savingThrows")]
    public IEnumerable<SkillModifierViewModel> SavingThrows { get; set; }

    [JsonPropertyName("actionGroups")]
    public IEnumerable<ActionGroupViewModel> ActionGroups { get; set; }

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
  }

  public class ArmourClassViewModel
  {
    [JsonPropertyName("condition")]
    public string Condition { get; set; }

    [JsonPropertyName("alternateForms")]
    public IEnumerable<ArmourClassViewModel> AlternateForms { get; set; }

    [JsonPropertyName("armourClass")]
    public int ArmourClass { get; set; }

    [JsonPropertyName("appliedFrom")]
    public string AppliedFrom { get; set; }
  }

  public class ChallengeRatingViewModel
  {
    [JsonPropertyName("rating")]
    public decimal Rating { get; set; }

    [JsonPropertyName("experience")]
    public int Experience { get; set; }
  }

  public class ActionGroupViewModel
  {
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("items")]
    public IEnumerable<ItemViewModel> Items { get; set; }
  }

  public class ItemViewModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("entries")]
    public IEnumerable<string> Entries { get; set; }

    [JsonPropertyName("items")]
    public IEnumerable<ItemViewModel> Items { get; set; }
  }

  public class SkillModifierViewModel
  {
    [JsonPropertyName("skillName")]
    public string SkillName { get; set; }

    [JsonPropertyName("modifier")]
    public int Modifier { get; set; }
  }

  public class ResistanceImmunityViewModel
  {
    [JsonPropertyName("resistantTo")]
    public string ResistantTo { get; set; }

    [JsonPropertyName("condition")]
    public string Condition { get; set; }
  }
}
