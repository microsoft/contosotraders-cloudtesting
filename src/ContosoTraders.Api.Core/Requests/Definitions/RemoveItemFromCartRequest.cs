namespace ContosoTraders.Api.Core.Requests.Definitions;

public class RemoveItemFromCartRequest : IRequest<IActionResult>
{
    public CartDto CartItem { get; set; }
}