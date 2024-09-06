using System.Security.Claims;

namespace DDD._3ncount3r.API.Extensions
{
  public static class ClaimsPrincipalExtensions
  {
    public static string SubjectId(this ClaimsPrincipal user) { return user?.Claims?.FirstOrDefault(c => c.Type.Equals(ClaimTypes.NameIdentifier, StringComparison.OrdinalIgnoreCase))?.Value; }
  }
}
