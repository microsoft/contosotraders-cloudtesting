namespace ContosoTraders.Api.Core.Models.Implementations.Dao;

public class StockDao : ICosmosDao<string>
{
    public int StockCount { get; set; }

    public string id { get; set; }
}