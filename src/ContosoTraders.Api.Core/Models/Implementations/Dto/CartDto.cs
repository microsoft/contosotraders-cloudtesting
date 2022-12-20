namespace ContosoTraders.Api.Core.Models.Implementations.Dto;

public class CartDto
{
    public string CartItemId { get; set; }

    public string Email { get; set; }

    public int ProductId { get; set; }

    public string Name { get; set; }

    public int Price { get; set; }

    public string ImageUrl { get; set; }

    public int Quantity { get; set; }
}