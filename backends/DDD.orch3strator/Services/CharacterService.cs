using DDD.Common.Contracts.Character;

namespace DDD.orch3strator.Services
{
  public class CharacterService : DataApiBaseService<CharacterContract>
  {
    private readonly string _baseUrl;

    public CharacterService(string baseUrl)
    {
      _baseUrl = baseUrl;

    }

    public async override Task<IEnumerable<CharacterContract>> GetList(string ruleSystem, string userId)
    {
      List<CharacterContract> list = new List<CharacterContract>();

      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{_baseUrl}characters/{ruleSystem}/{userId}");

      response.EnsureSuccessStatusCode();
      list.AddRange(await response.Content.ReadFromJsonAsync<List<CharacterContract>>());

      return list;
    }

    public async override Task<CharacterContract> GetById(string ruleSystem, string userId, string id)
    {
      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{_baseUrl}characters/{ruleSystem}/{userId}/{id}");

      response.EnsureSuccessStatusCode();

      return await response.Content.ReadFromJsonAsync<CharacterContract>();
    }

    public async override Task<CharacterContract> Insert(string ruleSystem, CharacterContract model)
    {
      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.PostAsJsonAsync($"{_baseUrl}characters/{ruleSystem}", model);

      response.EnsureSuccessStatusCode();
      CharacterContract insertedModel = await response.Content.ReadFromJsonAsync<CharacterContract>();

      return insertedModel;
    }

    public async override Task<CharacterContract> Update(string ruleSystem, CharacterContract model)
    {
      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.PutAsJsonAsync($"{_baseUrl}characters/{ruleSystem}", model);

      response.EnsureSuccessStatusCode();
      CharacterContract insertedModel = await response.Content.ReadFromJsonAsync<CharacterContract>();

      return insertedModel;
    }
  }
}
