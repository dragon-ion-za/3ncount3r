using DDD.Byoapi.Integrations.Models;

namespace DDD.Byoapi.Integrations.Services
{
  public interface IByoapiService
  {
    Task<IEnumerable<CreatureModel>> SearchForCreatures(string queryString);
    Task<CreatureModel> GetCreatureByName(string byoapiId, string name);
    ClassDetailsModel GetClass(string id, string byoapiId);
  }
}
