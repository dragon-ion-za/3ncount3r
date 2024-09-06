using DDD._3ncount3r.API.Models;

namespace DDD._3ncount3r.API.Services
{
  public interface IByoapiService
  {
    Task<IEnumerable<CreatureModel>> SearchForCreatures(string queryString);
    Task<CreatureModel> GetCreatureByName(string byoapiId, string name);
  }
}
