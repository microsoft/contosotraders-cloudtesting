namespace ContosoTraders.Api.Core.Requests.Definitions;

public class AddItemToCartRequest : IRequest<IActionResult>
{
    public CartDto CartItem { get; set; }
}