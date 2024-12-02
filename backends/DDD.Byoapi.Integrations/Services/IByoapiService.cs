using DDD.Byoapi.Integrations.Models;

namespace DDD.Byoapi.Integrations.Services
{
  public interface IByoapiService
  {
    ClassDetailsModel GetClass(string id, string byoapiId);
  }
}
