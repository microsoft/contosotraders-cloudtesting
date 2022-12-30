using System.Net;
using Microsoft.Azure.Cosmos;

namespace ContosoTraders.Api.Core.Repositories.Implementations;

public abstract class CosmosGenericRepositoryBase<TEntity> : ICosmosGenericRepository<TEntity> where TEntity : class
{
    protected readonly string ContainerName;

    protected readonly Database CosmosDatabase;

    protected CosmosGenericRepositoryBase(Database cosmosDatabase, string containerName)
    {
        ContainerName = containerName;
        CosmosDatabase = cosmosDatabase;
    }

    public async Task<IEnumerable<TEntity>> QueryAsync(string querySpec, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        return await ExecuteQueryAsync(querySpec, cancellationToken);
    }

    public async Task<IEnumerable<TEntity>> ListAsync(string filterClause = default, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var querySpec = "select * from c";

        if (!string.IsNullOrWhiteSpace(filterClause)) querySpec = $"{querySpec} where {filterClause}";

        return await ExecuteQueryAsync(querySpec, cancellationToken);
    }

    public async Task<TEntity> GetAsync(string partitionKey, string id, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        try
        {
            var response = await CosmosDatabase
                .GetContainer(ContainerName)
                .ReadItemAsync<TEntity>(id, new PartitionKey(partitionKey), cancellationToken: cancellationToken);

            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
        {
            return default; // i.e. null
        }
    }

    public async Task AddAsync(string partitionKey, TEntity entity, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        await CosmosDatabase
            .GetContainer(ContainerName)
            .CreateItemAsync(entity, new PartitionKey(partitionKey), cancellationToken: cancellationToken);
    }

    public async Task UpsertAsync(string partitionKey, TEntity entity, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        await CosmosDatabase
            .GetContainer(ContainerName)
            .UpsertItemAsync(entity, new PartitionKey(partitionKey), cancellationToken: cancellationToken);
    }

    public async Task DeleteAsync(string partitionKey, string id, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        await CosmosDatabase
            .GetContainer(ContainerName)
            .DeleteItemAsync<TEntity>(id, new PartitionKey(partitionKey), cancellationToken: cancellationToken);
    }

    private async Task<IEnumerable<TEntity>> ExecuteQueryAsync(string querySpec, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        using var queryIterator = CosmosDatabase
            .GetContainer(ContainerName)
            .GetItemQueryIterator<TEntity>(new QueryDefinition(querySpec));

        var results = new List<TEntity>();
        while (queryIterator.HasMoreResults)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var response = await queryIterator.ReadNextAsync(cancellationToken);
            results.AddRange(response.ToList());
        }

        return results;
    }
}