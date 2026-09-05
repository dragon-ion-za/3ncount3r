using DDD.orch3strator.Models.PartyService;

namespace DDD.orch3strator.Services
{
  public class PartyService : DataApiBaseService<PartyModel>
  {
    private readonly string _baseUrl;

    public PartyService(string baseUrl)
    {
        _baseUrl = baseUrl;
    }

    public async override Task<IEnumerable<PartyModel>> GetList(string ruleSystem, string userId)
    {
      List<PartyModel> list = new List<PartyModel>();

      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{_baseUrl}parties/{ruleSystem}/{userId}");

      response.EnsureSuccessStatusCode();
      list.AddRange(await response.Content.ReadFromJsonAsync<List<PartyModel>>());

      return list;
    }

    public async override Task<PartyModel> GetById(string ruleSystem, string userId, string id)
    {
      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{_baseUrl}parties/{ruleSystem}/{userId}/{id}");

      response.EnsureSuccessStatusCode();

      return await response.Content.ReadFromJsonAsync<PartyModel>();
    }

    public async override Task<PartyModel> Insert(string ruleSystem, PartyModel model)
    {
      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.PostAsJsonAsync($"{_baseUrl}parties/{ruleSystem}", model);

      response.EnsureSuccessStatusCode();
      PartyModel insertedModel = await response.Content.ReadFromJsonAsync<PartyModel>();

      return insertedModel;
    }

    public async override Task<PartyModel> Update(string ruleSystem, PartyModel model)
    {
      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.PutAsJsonAsync($"{_baseUrl}parties/{ruleSystem}", model);

      response.EnsureSuccessStatusCode();
      PartyModel insertedModel = await response.Content.ReadFromJsonAsync<PartyModel>();

      return insertedModel;
    }
  }
}
