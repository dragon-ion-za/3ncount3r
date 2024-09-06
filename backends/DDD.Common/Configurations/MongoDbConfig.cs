namespace DDD.Common.Configurations
{
  public sealed class MongoDbConfig
  {
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
  }
}
