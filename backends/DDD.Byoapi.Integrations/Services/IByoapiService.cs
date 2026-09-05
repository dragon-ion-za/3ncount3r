using DDD.Byoapi.Integrations.Models;

namespace DDD.Byoapi.Integrations.Services
{
  public interface IByoapiService
  {
    Task<IEnumerable<CreatureModel>> SearchForCreatures(string ruleSystem, string queryString);
    Task<IEnumerable<CreatureModel>> SearchForCreatures(string ruleSystem, string byoapiId, string queryString);
    Task<CreatureModel> GetCreatureByName(string ruleSystem, string byoapiId, string name);
    ClassDetailsModel GetClass(string ruleSystem, string id, string byoapiId);
  }
}
