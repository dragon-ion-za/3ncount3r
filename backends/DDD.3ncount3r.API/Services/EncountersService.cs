using DDD._3ncount3r.API.Models;
using DDD.Common.Configurations;
using DDD.Common.Services;
using Microsoft.Extensions.Options;

namespace DDD._3ncount3r.API.Services
{
  public class EncountersService : DataService<EncounterModel>
  {
    public override string CollectionName => "Encounters";

    public EncountersService(IOptions<MongoDbConfig> config) : base(config)
    {
    }
  }
}
