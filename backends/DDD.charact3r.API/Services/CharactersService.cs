using DDD.charact3r.API.Models;
using DDD.Common.Configurations;
using DDD.Common.Services;
using Microsoft.Extensions.Options;

namespace DDD.charact3r.API.Services
{
  public class CharactersService : DataService<CharacterModel>
  {
    public override string CollectionName => "Characters";

    public CharactersService(IOptions<MongoDbConfig> config) : base(config)
    {
    }
  }
}
