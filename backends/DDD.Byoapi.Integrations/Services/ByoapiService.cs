using DDD.Byoapi.Integrations.Configurations;
using DDD.Byoapi.Integrations.Models;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;

namespace DDD.Byoapi.Integrations.Services
{
  public class ByoapiService : IByoapiService
  {
    private readonly IEnumerable<ByoapiConfig> _config;

    public ByoapiService(IOptions<List<ByoapiConfig>> options)
    {
      _config = options.Value;
    }

    public async Task<IEnumerable<CreatureModel>> SearchForCreatures(string ruleSystem, string queryString)
    {
      List<CreatureModel> allCreatures = new List<CreatureModel>();

      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      foreach (var byoapi in _config)
      {
        calls.Add(byoapi.Id, client.GetAsync($"{byoapi.BaseUrl}{ruleSystem}/creatures{queryString}"));
      }

      await Task.WhenAll(calls.Values);

      foreach (var call in calls)
      {
        if (call.Value.IsCompletedSuccessfully)
        {
          HttpResponseMessage response = call.Value.Result;

          if (response.IsSuccessStatusCode)
          {
            allCreatures.AddRange(await response.Content.ReadFromJsonAsync<List<CreatureModel>>());
            allCreatures.ForEach(creature => { creature.ByoapiId = call.Key; });
          }
        }
      }

      return allCreatures;
    }

    public async Task<CreatureModel> GetCreatureByName(string ruleSystem, string byoapiId, string name)
    {
      ByoapiConfig endpoint = _config.FirstOrDefault(x => x.Id == byoapiId);

      if (endpoint == null) return new CreatureModel();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{endpoint.BaseUrl}{ruleSystem}/creatures/{name}");

      response.EnsureSuccessStatusCode();

      return await response.Content.ReadFromJsonAsync<CreatureModel>();
    }

    public ClassDetailsModel GetClass(string ruleSystem, string id, string byoapiId)
    {
      throw new NotImplementedException();
    }
  }
}
