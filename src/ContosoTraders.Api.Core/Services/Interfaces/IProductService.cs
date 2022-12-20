using Type = ContosoTraders.Api.Core.Models.Implementations.Dao.Type;

namespace ContosoTraders.Api.Core.Services.Interfaces;

public interface IProductService
{
    /// <summary>
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <exception cref="ProductNotFoundException"></exception>
    ProductDto GetProduct(int id);

    /// <summary>
    /// </summary>
    /// <param name="brands"></param>
    /// <param name="typeIds"></param>
    /// <returns></returns>
    IEnumerable<ProductDto> GetProducts(int[] brands, int[] typeIds);

    /// <summary>
    /// </summary>
    /// <param name="searchTerm"></param>
    /// <returns></returns>
    IEnumerable<ProductDto> GetProducts(string searchTerm);

    /// <summary>
    /// </summary>
    /// <returns></returns>
    IEnumerable<Brand> GetBrands();

    /// <summary>
    /// </summary>
    /// <returns></returns>
    IEnumerable<Type> GetTypes();
}