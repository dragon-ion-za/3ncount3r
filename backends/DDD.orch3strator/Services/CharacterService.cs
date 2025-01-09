using DDD.orch3strator.Models.CharacterService;

namespace DDD.orch3strator.Services
{
  public class CharacterService : DataApiBaseService<CharacterModel>
  {
    private readonly string _baseUrl;

    public CharacterService(string baseUrl)
    {
      _baseUrl = baseUrl;

    }

    public async override Task<IEnumerable<CharacterModel>> GetList(string ruleSystem, string userId)
    {
      List<CharacterModel> list = new List<CharacterModel>();

      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{_baseUrl}characters/{ruleSystem}/{userId}");

      response.EnsureSuccessStatusCode();
      list.AddRange(await response.Content.ReadFromJsonAsync<List<CharacterModel>>());

      return list;
    }

    public async override Task<CharacterModel> GetById(string ruleSystem, string userId, string id)
    {
      Dictionary<string, Task<HttpResponseMessage>> calls = new Dictionary<string, Task<HttpResponseMessage>>();

      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.GetAsync($"{_baseUrl}characters/{ruleSystem}/{userId}/{id}");

      response.EnsureSuccessStatusCode();

      return await response.Content.ReadFromJsonAsync<CharacterModel>();
    }

    public async override Task<CharacterModel> Insert(string ruleSystem, CharacterModel model)
    {
      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.PostAsJsonAsync($"{_baseUrl}characters/{ruleSystem}", model);

      response.EnsureSuccessStatusCode();
      CharacterModel insertedModel = await response.Content.ReadFromJsonAsync<CharacterModel>();

      return insertedModel;
    }

    public async override Task<CharacterModel> Update(string ruleSystem, CharacterModel model)
    {
      HttpClient client = new HttpClient();
      HttpResponseMessage response = await client.PutAsJsonAsync($"{_baseUrl}characters/{ruleSystem}", model);

      response.EnsureSuccessStatusCode();
      CharacterModel insertedModel = await response.Content.ReadFromJsonAsync<CharacterModel>();

      return insertedModel;
    }
  }
}
