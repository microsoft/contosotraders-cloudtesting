using Microsoft.Azure.Cosmos;

namespace ContosoTraders.Api.Core.Repositories.Implementations;

public class CartRepository : CosmosGenericRepositoryBase<CartDao>, ICartRepository
{
    public CartRepository(IEnumerable<Database> cosmosDatabases)
        : base(cosmosDatabases.Single(db => db.Id == CosmosConstants.DatabaseNameCarts), CosmosConstants.ContainerNameCarts)
    {
    }
}