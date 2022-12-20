namespace ContosoTraders.Api.Core.Requests.Definitions;

public class DecrementStockCountRequest : IRequest<IActionResult>
{
    public int ProductId { get; set; }
}