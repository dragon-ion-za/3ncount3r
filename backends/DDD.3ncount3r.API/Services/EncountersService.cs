using DDD._3ncount3r.API.Configurations;
using DDD._3ncount3r.API.Models;
using Microsoft.Extensions.Options;

namespace DDD._3ncount3r.API.Services
{
  public class EncountersService : DataService<EncounterModel>
  {
    internal override string CollectionName => "Encounters";

    public EncountersService(IOptions<MongoDbConfig> config) : base(config)
    {
    }
  }
}
