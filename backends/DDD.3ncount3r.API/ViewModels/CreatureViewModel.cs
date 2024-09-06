using System.Text.Json.Serialization;

namespace DDD._3ncount3r.API.ViewModels
{
  public class CreatureViewModel
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
    public string[] Alignment { get; set; }

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

    [JsonPropertyName("speedConditions")]
    public object[] SpeedConditions { get; set; }

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
    public object[] SkillModifiers { get; set; }

    [JsonPropertyName("passivePerception")]
    public int PassivePerception { get; set; }

    [JsonPropertyName("resistances")]
    public object[] Resistances { get; set; }

    [JsonPropertyName("immunities")]
    public object[] Immunities { get; set; }

    [JsonPropertyName("languages")]
    public object[] Languages { get; set; }

    [JsonPropertyName("challengeRating")]
    public ChallengeRatingViewModel ChallengeRating { get; set; }

    [JsonPropertyName("traits")]
    public object[] Traits { get; set; }

    [JsonPropertyName("actions")]
    public object[] Actions { get; set; }

    [JsonPropertyName("reactions")]
    public object[] Reactions { get; set; }

    [JsonPropertyName("legendaryActions")]
    public object[] LegendaryActions { get; set; }

    [JsonPropertyName("legendaryCount")]
    public int LegendaryCount { get; set; }

    [JsonPropertyName("spellcasting")]
    public object[] Spellcasting { get; set; }

    [JsonPropertyName("lairActions")]
    public object[] LairActions { get; set; }

    [JsonPropertyName("regionalEffects")]
    public object[] RegionalEffects { get; set; }

    [JsonPropertyName("mythicEncounter")]
    public object[] MythicEncounter { get; set; }

    [JsonPropertyName("senses")]
    public string[] Senses { get; set; }

    [JsonPropertyName("savingThrows")]
    public object[] SavingThrows { get; set; }

    [JsonPropertyName("actionGroups")]
    public ActionGroupViewModel[] ActionGroups { get; set; }

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
    public object[] AlternateForms { get; set; }

    [JsonPropertyName("armourClass")]
    public int ArmourClass { get; set; }

    [JsonPropertyName("appliedFrom")]
    public string AppliedFrom { get; set; }
  }

  public class ChallengeRatingViewModel
  {
    [JsonPropertyName("rating")]
    public int Rating { get; set; }

    [JsonPropertyName("experience")]
    public int Experience { get; set; }
  }

  public class ActionGroupViewModel
  {
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("items")]
    public ItemViewModel[] Items { get; set; }
  }

  public class ItemViewModel
  {
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("items")]
    public string[] Items { get; set; }
  }
}
