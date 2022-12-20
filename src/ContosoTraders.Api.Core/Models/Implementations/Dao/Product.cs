namespace ContosoTraders.Api.Core.Models.Implementations.Dao;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal? Price { get; set; }
    public string ImageName { get; set; }
    public int? BrandId { get; set; }
    public int? TypeId { get; set; }
    public int? TagId { get; set; }
}