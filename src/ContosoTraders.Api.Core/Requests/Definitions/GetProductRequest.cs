namespace ContosoTraders.Api.Core.Requests.Definitions;

public class GetProductRequest : IRequest<IActionResult>
{
    public int ProductId { get; set; }
}