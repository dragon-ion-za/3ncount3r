using DDD.charact3r.API.Models;
using DDD.Common.Services;
using MongoDB.Driver;

namespace DDD.charact3r.API.Services
{
  public class CharactersService : DataService<CharacterModel>
  {
    public override string CollectionName => "Characters";
    public override bool DoVersioning => true;

    public CharactersService(IMongoDatabase mongoDatabase) : base(mongoDatabase)
    {
    }

    protected override CharacterModel CalculateModelDelta(CharacterModel prevModel, CharacterModel model)
    {
      // Because there are so few nullables in the nested properties, and very few nullable top level properties
      // we just return the entire new object.
      return model;
    }
  }
}
