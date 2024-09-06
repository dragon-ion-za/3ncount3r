using DDD._3ncount3r.API.Configurations;
using DDD._3ncount3r.API.Models;
using Microsoft.Extensions.Options;

namespace DDD._3ncount3r.API.Services
{
  public class ByoapiService: IByoapiService
  {
    private readonly IEnumerable<ByoapiConfig> _config;

    public ByoapiService(IOptions<List<ByoapiConfig>> options)
    {
      _config = options.Value;
    }

    public async Task<IEnumerable<CreatureModel>> SearchForCreatures(string queryString)
    {
      List<CreatureModel> allCreatures = new List<CreatureModel>();

      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      foreach (var byoapi in _config)
      {        
        calls.Add(byoapi.Id, client.GetAsync($"{byoapi.BaseUrl}creatures{queryString}"));
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

    public async Task<CreatureModel> GetCreatureByName(string byoapiId, string name)
    {
      ByoapiConfig endpoint = _config.FirstOrDefault(x => x.Id == byoapiId);

      if (endpoint == null) return new CreatureModel();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{endpoint.BaseUrl}creatures/{name}");

      response.EnsureSuccessStatusCode();

      return await response.Content.ReadFromJsonAsync<CreatureModel>();
    }
  }
}
