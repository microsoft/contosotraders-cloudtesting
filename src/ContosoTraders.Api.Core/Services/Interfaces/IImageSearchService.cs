namespace ContosoTraders.Api.Core.Services.Interfaces;

internal interface IImageSearchService
{
    /// <summary>
    /// </summary>
    /// <param name="imageStream"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<IEnumerable<ProductDto>> GetSimilarProductsAsync(Stream imageStream, CancellationToken cancellationToken = default);
}