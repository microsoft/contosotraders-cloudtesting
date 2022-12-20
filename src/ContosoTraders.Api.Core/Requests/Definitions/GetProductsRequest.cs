namespace ContosoTraders.Api.Core.Requests.Definitions;

public class GetProductsRequest : IRequest<IActionResult>
{
    public int[] Brands { get; set; }

    public string[] Types { get; set; }
}