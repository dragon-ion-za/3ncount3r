namespace DDD.charact3r.API.Converters
{
  public interface IModelConverterFactory
  {
    IConverter Create(string ruleSystem);
  }
}
