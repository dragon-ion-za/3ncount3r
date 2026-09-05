using DDD.orch3strator.Models.EncounterService;

namespace DDD.orch3strator.Services
{
  public class EncounterService : DataApiBaseService<EncounterModel>
  {
    private readonly string _baseUrl;

    public EncounterService(string baseUrl)
    {
        _baseUrl = baseUrl;
    }

    public async override Task<IEnumerable<EncounterModel>> GetList(string ruleSystem, string userId)
    {
      List<EncounterModel> list = new List<EncounterModel>();

      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{_baseUrl}encounters/{ruleSystem}/{userId}");

      response.EnsureSuccessStatusCode();
      list.AddRange(await response.Content.ReadFromJsonAsync<List<EncounterModel>>());

      return list;
    }

    public async override Task<EncounterModel> GetById(string ruleSystem, string userId, string id)
    {
      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{_baseUrl}encounters/{ruleSystem}/{userId}/{id}");

      response.EnsureSuccessStatusCode();

      return await response.Content.ReadFromJsonAsync<EncounterModel>();
    }

    public async override Task<EncounterModel> Insert(string ruleSystem, EncounterModel model)
    {
      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.PostAsJsonAsync($"{_baseUrl}encounters/{ruleSystem}", model);

      response.EnsureSuccessStatusCode();
      EncounterModel insertedModel = await response.Content.ReadFromJsonAsync<EncounterModel>();

      return insertedModel;
    }

    public async override Task<EncounterModel> Update(string ruleSystem, EncounterModel model)
    {
      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.PutAsJsonAsync($"{_baseUrl}encounters/{ruleSystem}", model);

      response.EnsureSuccessStatusCode();
      EncounterModel insertedModel = await response.Content.ReadFromJsonAsync<EncounterModel>();

      return insertedModel;
    }
  }
}
