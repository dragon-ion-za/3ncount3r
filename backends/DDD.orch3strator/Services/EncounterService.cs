namespace DDD.orch3strator.Services
{
  public class EncounterService : DataApiBaseService
  {
    private readonly string _baseUrl;

    public EncounterService(string baseUrl)
    {
        _baseUrl = baseUrl;
    }

    public async override Task<IEnumerable<TModel>> Get<TModel>(string ruleSystem, string userId)
    {
      List<TModel> list = new List<TModel>();

      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{_baseUrl}encounters/{ruleSystem}/{userId}");

      response.EnsureSuccessStatusCode();
      list.AddRange(await response.Content.ReadFromJsonAsync<List<TModel>>());

      return list;
    }
  }
}
