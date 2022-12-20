namespace ContosoTraders.Api.Core.Models.Implementations.Dao;

public class CartDao : ICosmosDao<string>
{
    public string Email { get; set; } // partition key    

    public int ProductId { get; set; }

    public string Name { get; set; }

    public int Price { get; set; }

    public string ImageUrl { get; set; }

    public int Quantity { get; set; }

    public string id { get; set; }
}