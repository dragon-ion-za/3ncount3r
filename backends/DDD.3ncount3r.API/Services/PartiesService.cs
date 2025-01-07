using DDD._3ncount3r.API.Models;
using DDD.Common.Configurations;
using DDD.Common.Services;
using Microsoft.Extensions.Options;

namespace DDD._3ncount3r.API.Services
{
  public class PartiesService : DataService<PartyModel>
  {
    public override string CollectionName => "Parties";

    public PartiesService(IOptions<MongoDbConfig> config) : base(config)
    {
    }
  }
}
