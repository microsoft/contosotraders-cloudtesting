using Microsoft.Azure.Cosmos;

namespace ContosoTraders.Api.Core.Repositories.Implementations;

public class StockRepository : CosmosGenericRepositoryBase<StockDao>, IStockRepository
{
    public StockRepository(IEnumerable<Database> cosmosDatabases)
        : base(cosmosDatabases.Single(db => db.Id == CosmosConstants.DatabaseNameStocks), CosmosConstants.ContainerNameStocks)
    {
    }
}